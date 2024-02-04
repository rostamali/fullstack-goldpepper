'use server';
import { CompanyInfoSchema, ProjectFormSchema } from '@/lib/form-validation';
import { isAuthenticated } from './auth.action';
import * as z from 'zod';
import { createSlug } from '@/lib/utils';
import prisma from '../prisma';
import { DocumentStatus, ProjectStatus } from '@prisma/client';
import { dateFormat, handleResponse } from '@/lib/formater';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

export const createProjectByAdmin = async (
	params: z.infer<typeof ProjectFormSchema>,
) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN')
			return {
				success: true,
				id: null,
				message: `You don't have permission`,
			};

		const {
			name,
			status,
			thumbnail,
			gallery,
			capex,
			totalCost,
			totalRevenue,
			roi,
			closeDate,
			documents,
			description,
		} = params;

		const slug = await createSlug(name);
		const projectExist = await prisma.project.findFirst({
			where: {
				slug,
			},
			select: {
				id: true,
				slug: true,
			},
		});
		if (projectExist)
			return {
				success: false,
				id: null,
				message: 'Project already exists',
			};
		const content = Buffer.from(JSON.stringify(description || ''));
		const newProject = await prisma.project.create({
			data: {
				name,
				slug,
				description: content,
				capex: capex as number,
				totalCost: totalCost as number,
				totalRevenue: totalRevenue as number,
				roi: roi as number,
				status: status as ProjectStatus,
				closeDate: closeDate as Date,
				author: {
					connect: { id: isAdmin.id },
				},
				...(thumbnail &&
					thumbnail.length > 0 && {
						thumbnail: {
							connect: { id: thumbnail[0].id },
						},
					}),
				...(documents &&
					documents.length > 0 && {
						documents: {
							create: documents.map((doc) => ({
								name: doc.name,
								description: doc.description,
								status: doc.status as DocumentStatus,
								file: {
									connect: { id: doc.file[0].id },
								},
							})),
						},
					}),
				...(gallery &&
					gallery.length > 0 && {
						gallery: {
							create: {
								files: {
									connect: gallery.map((file) => ({
										id: file.id,
									})),
								},
							},
						},
					}),
			},
			select: {
				id: true,
			},
		});
		return {
			success: true,
			id: newProject.id,
			message: 'Project created successfully',
		};
	} catch (error) {
		return {
			success: false,
			id: null,
			message: 'Project creation failed',
		};
	}
};
export const fetchProjectById = async (params: { id: string }) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN') return;

		const project = await prisma.project.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
				name: true,
				slug: true,
				capex: true,
				totalRevenue: true,
				totalCost: true,
				roi: true,
				status: true,
				description: true,
				closeDate: true,

				thumbnail: {
					select: {
						id: true,
						title: true,
						url: true,
						fileType: true,
					},
				},
				documents: {
					select: {
						id: true,
						name: true,
						description: true,
						status: true,
						file: {
							select: {
								id: true,
								fileName: true,
								title: true,
								url: true,
								fileType: true,
								description: true,
							},
						},
					},
				},
				gallery: {
					select: {
						files: {
							select: {
								id: true,
								title: true,
								url: true,
								fileType: true,
							},
						},
					},
				},
			},
		});
		if (!project) return;

		const content = project.description
			? project.description.toString('utf-8')
			: null;

		return {
			id: project.id,
			name: project.name,
			description: content ? JSON.parse(content) : null,
			status: project.status,
			closeDate: project.closeDate,
			capex: project.capex,
			totalCost: project.totalCost,
			totalRevenue: project.totalRevenue,
			roi: project.roi,
			thumbnail: project.thumbnail
				? [
						{
							id: project.thumbnail.id,
							url: project.thumbnail.url,
							title: project.thumbnail.title,
							fileType: project.thumbnail.fileType,
						},
				  ]
				: null,
			gallery: project.gallery
				? project.gallery.files.map((item) => {
						return {
							id: item.id,
							title: item.title,
							url: item.url,
							fileType: item.fileType,
						};
				  })
				: null,
			documents:
				project?.documents.map((item) => ({
					name: item.name,
					description: item.description || '',
					status: item.status,
					file: [
						{
							id: item.file.id,
							title: item.file.title,
							url: item.file.url,
							fileType: item.file.fileType,
						},
					],
				})) || null,
		};
	} catch (error) {
		return;
	}
};
export const fetchProjectsByAdmin = async (params: {
	pageSize: number;
	page: number;
	status: ProjectStatus | null;
	query: string | null;
}) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN') return;

		const { page = 1, pageSize = 10, status, query } = params;
		const projects = await prisma.project.findMany({
			where: {
				...(query && {
					OR: [{ name: { contains: query } }],
				}),
				...(status && {
					status: { equals: status },
				}),
			},
			select: {
				id: true,
				name: true,
				slug: true,
				thumbnail: {
					select: {
						url: true,
					},
				},
				createdAt: true,
				status: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countFiles = await prisma.project.count({
			where: {
				...(query && {
					OR: [{ name: { contains: query } }],
				}),
				...(status && {
					status: { equals: status },
				}),
			},
		});
		return {
			projects,
			pages: Math.ceil(countFiles / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const updateProjectByAdmin = async (params: {
	id: string;
	data: z.infer<typeof ProjectFormSchema>;
}) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN')
			return handleResponse(false, `You don't have permission`);

		const {
			id,
			data: {
				name,
				status,
				thumbnail,
				gallery,
				capex,
				totalCost,
				totalRevenue,
				roi,
				closeDate,
				documents,
				description,
			},
		} = params;

		const slug = await createSlug(name);
		const slugExist = await prisma.project.findFirst({
			where: {
				slug,
				NOT: {
					id,
				},
			},
			select: {
				id: true,
				slug: true,
			},
		});
		if (slugExist) return handleResponse(false, 'Use different name');

		const content = Buffer.from(JSON.stringify(description));
		await prisma.project.update({
			where: { id },
			data: {
				name,
				status: status as ProjectStatus,
				capex,
				totalCost,
				totalRevenue,
				description: content,
				roi,
				closeDate,
				...(thumbnail &&
					thumbnail.length > 0 && {
						thumbnail: {
							connect: { id: thumbnail[0].id },
						},
					}),
				...(!thumbnail && {
					thumbnail: {
						disconnect: true,
					},
				}),
				...(documents &&
					documents.length > 0 && {
						documents: {
							deleteMany: {},
							create: documents.map((doc) => ({
								name: doc.name,
								description: doc.description,
								status: doc.status as DocumentStatus,
								file: {
									connect: { id: doc.file[0].id },
								},
							})),
						},
					}),
				...(documents &&
					documents.length === 0 && {
						documents: {
							deleteMany: {},
						},
					}),
				...(gallery &&
					gallery.length > 0 && {
						gallery: {
							upsert: {
								create: {
									files: {
										connect: gallery.map((file) => ({
											id: file.id,
										})),
									},
								},
								update: {
									files: {
										set: gallery.map((file) => ({
											id: file.id,
										})),
									},
								},
							},
						},
					}),
				...(gallery &&
					gallery.length === 0 && {
						gallery: {
							upsert: {
								update: {
									files: {
										set: gallery.map((file) => ({
											id: file.id,
										})),
									},
								},
								create: {},
							},
						},
					}),
			},
		});
		revalidatePath(`/admin/project/edit?project_id=${id}`, 'page');

		return handleResponse(true, 'Project updated successfully');
	} catch (error) {
		return handleResponse(false, 'Project update failed');
	}
};
export const importProjectFromCSV = async (params: CSVProject[]) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN')
			return {
				success: true,
				id: null,
				message: `You don't have permission`,
			};

		for (const single of params) {
			const slug = await createSlug(single.name);
			let modifiedSlug = slug;
			let counter = 1;

			let projectExist = await prisma.project.findFirst({
				where: {
					slug,
				},
				select: {
					id: true,
					slug: true,
				},
			});
			while (projectExist) {
				modifiedSlug = `${slug}-${counter}`;
				counter++;
				projectExist = await prisma.project.findFirst({
					where: {
						slug: modifiedSlug,
					},
					select: {
						id: true,
						slug: true,
					},
				});
			}
			await prisma.project.create({
				data: {
					name: single.name,
					slug: modifiedSlug,
					capex: Number(single.capex),
					totalRevenue: Number(single.totalRevenue),
					totalCost: Number(single.totalCost),
					roi: Number(single.roi),
					status: single.status,
					closeDate: new Date(),
					author: {
						connect: { id: isAdmin.id },
					},
				},
			});
		}

		revalidatePath('/admin/project', 'page');

		return handleResponse(true, 'Project uploaded successfully');
	} catch (error) {
		return handleResponse(false, 'CSV upload failed');
	}
};
export const deleteProjectByAdmin = async (params: { projectId: string }) => {
	try {
		const { projectId } = params;
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN')
			return handleResponse(false, `You don't have a permission`);

		const projectToDelete = await prisma.project.findUnique({
			where: {
				id: projectId,
			},
			select: {
				id: true,
			},
		});
		if (!projectToDelete)
			return handleResponse(false, `Project does not exist`);

		await prisma.project.delete({
			where: {
				id: projectToDelete.id,
			},
		});

		revalidatePath('/admin/project', 'page');

		return handleResponse(true, 'Project deleted successfully');
	} catch (error) {
		return handleResponse(false, 'Project deletetion failed');
	}
};
export const fetchProjectsByUser = async (params: {
	pageSize: number;
	page: number;
	query: string | null;
}) => {
	try {
		const { page = 1, pageSize = 10, query } = params;
		const projects = await prisma.project.findMany({
			where: {
				status: 'ACTIVE',
				...(query && {
					OR: [{ name: { contains: query } }],
				}),
			},
			select: {
				name: true,
				slug: true,
				capex: true,
				totalRevenue: true,
				totalCost: true,
				closeDate: true,
				thumbnail: {
					select: {
						url: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countFiles = await prisma.project.count({
			where: {
				status: 'ACTIVE',
				...(query && {
					OR: [{ name: { contains: query } }],
				}),
			},
		});

		return {
			projects,
			pages: Math.ceil(countFiles / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const fetchProjectBySlug = async (params: { slug: string | null }) => {
	try {
		const { slug } = params;
		if (!slug) return;

		const isAuth = await isAuthenticated();
		if (!isAuth) return;

		const project = await prisma.project.findFirst({
			where: {
				slug,
			},
			select: {
				id: true,
				name: true,
				description: true,
				totalCost: true,
				totalRevenue: true,
				capex: true,
				roi: true,
				closeDate: true,
				thumbnail: {
					select: {
						id: true,
						url: true,
						fileType: true,
					},
				},
				gallery: {
					select: {
						files: {
							select: {
								id: true,
								url: true,
								fileType: true,
							},
						},
					},
				},
				documents: {
					where: {
						status: 'PUBLIC',
					},
					select: {
						id: true,
						name: true,
						description: true,
						status: true,
						file: {
							select: {
								id: true,
								url: true,
							},
						},
					},
				},
			},
		});
		if (!project) return;

		const thumbnailImages = project?.thumbnail
			? [
					{
						id: project.thumbnail.id,
						url: project.thumbnail.url,
						fileType: project.thumbnail.fileType,
					},
			  ]
			: [];
		const galleryImages = project?.gallery?.files
			? project.gallery.files.map((file) => ({
					id: file.id,
					url: file.url,
					fileType: file.fileType,
			  }))
			: [];
		const gallery = [...thumbnailImages, ...galleryImages].reduce(
			(
				uniqueImages: { id: string; url: string; fileType: string }[],
				image,
			) => {
				const isDuplicate = uniqueImages.some(
					(uniqueImage) =>
						uniqueImage.id === image.id &&
						uniqueImage.fileType === image.fileType,
				);
				if (!isDuplicate) {
					uniqueImages.push(image);
				}
				return uniqueImages;
			},
			[],
		);

		const description = project.description
			? project.description.toString('utf-8')
			: null;

		const isInvestedUser = await prisma.investment.findFirst({
			where: {
				projectId: project.id,
				userId: isAuth.id,
			},
			select: {
				id: true,
			},
		});

		return {
			id: project.id,
			name: project.name,
			gallery,
			description:
				description && description.length > 0
					? JSON.parse(description)
					: { blocks: [] },
			terms: [
				{
					label: 'Total Cost',
					value: project.totalCost,
				},
				{
					label: 'Total Revenue',
					value: project.totalRevenue,
				},
				{
					label: 'Capex',
					value: project.capex,
				},
				{
					label: 'ROI',
					value: project.roi,
				},
				{
					label: 'Closed date',
					value: dateFormat(project.closeDate),
				},
			],
			documents: project.documents,
			isInvested: isInvestedUser,
		};
	} catch (error) {
		return;
	}
};
/* ======================= */
// Project Company Infos
/* ======================= */
export const createProjectCompanyInfo = async (params: {
	id: string;
	data: z.infer<typeof CompanyInfoSchema>;
}) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN')
			return handleResponse(false, `You don't have permission`);

		const {
			id,
			data: {
				assets,
				breakEven,
				dcfMethod,
				distribution,
				ebitda,
				performance,
				profitEquity,
			},
		} = params;

		await prisma.assetsValue.deleteMany({
			where: {
				projectId: {
					equals: id,
				},
			},
		});
		await prisma.breakEven.deleteMany({
			where: {
				projectId: {
					equals: id,
				},
			},
		});
		await prisma.dcfMethod.deleteMany({
			where: {
				projectId: {
					equals: id,
				},
			},
		});
		await prisma.distributionMethod.deleteMany({
			where: {
				projectId: {
					equals: id,
				},
			},
		});
		await prisma.ebitdaMethod.deleteMany({
			where: {
				id,
			},
		});
		await prisma.performance.deleteMany({
			where: {
				projectId: {
					equals: id,
				},
			},
		});
		await prisma.profitEquity.deleteMany({
			where: {
				projectId: {
					equals: id,
				},
			},
		});

		if (assets) {
			for (const item of assets) {
				await prisma.assetsValue.create({
					data: {
						date: item.date,
						value: item.value as number,
						project: {
							connect: { id },
						},
					},
				});
			}
		}
		if (breakEven) {
			for (const item of breakEven) {
				await prisma.breakEven.create({
					data: {
						date: item.date,
						revenue: item.revenue as number,
						expences: item.expences as number,
						project: {
							connect: { id },
						},
					},
				});
			}
		}
		if (dcfMethod) {
			for (const item of dcfMethod) {
				await prisma.dcfMethod.create({
					data: {
						date: item.date,
						value: item.value as number,
						project: {
							connect: { id },
						},
					},
				});
			}
		}
		if (distribution) {
			for (const item of distribution) {
				await prisma.distributionMethod.create({
					data: {
						label: item.label,
						value: item.value as number,
						project: {
							connect: { id },
						},
					},
				});
			}
		}
		if (ebitda) {
			for (const item of ebitda) {
				await prisma.ebitdaMethod.create({
					data: {
						date: item.date,
						value: item.value as number,
						project: {
							connect: { id },
						},
					},
				});
			}
		}
		if (performance) {
			for (const item of performance) {
				await prisma.performance.create({
					data: {
						date: item.date,
						value: item.value as number,
						project: {
							connect: { id },
						},
					},
				});
			}
		}
		if (profitEquity) {
			for (const item of profitEquity) {
				await prisma.profitEquity.create({
					data: {
						date: item.date,
						profit: item.profit as number,
						equity: item.equity as number,
						project: {
							connect: { id },
						},
					},
				});
			}
		}

		revalidatePath('/admin/project/details');
		return handleResponse(true, `Project information saved`);
	} catch (error) {
		return handleResponse(false, `Information action failed`);
	}
};
export const fetchProjectCompanyInfoById = async (params: { id: string }) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN') return;

		const projectExist = await prisma.project.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
			},
		});
		if (!projectExist) return;

		const assetsValue = await prisma.assetsValue.findMany({
			where: {
				projectId: params.id,
			},
			select: {
				date: true,
				value: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const breakEven = await prisma.breakEven.findMany({
			where: {
				projectId: params.id,
			},
			select: {
				date: true,
				revenue: true,
				expences: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const dcfValue = await prisma.dcfMethod.findMany({
			where: {
				projectId: params.id,
			},
			select: {
				date: true,
				value: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const distribution = await prisma.distributionMethod.findMany({
			where: {
				projectId: params.id,
			},
			select: {
				label: true,
				value: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const ebitda = await prisma.ebitdaMethod.findMany({
			where: {
				projectId: params.id,
			},
			select: {
				date: true,
				value: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const perforamnce = await prisma.performance.findMany({
			where: {
				projectId: params.id,
			},
			select: {
				date: true,
				value: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const profitEquity = await prisma.profitEquity.findMany({
			where: {
				projectId: params.id,
			},
			select: {
				date: true,
				profit: true,
				equity: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});

		return {
			assetsValue: assetsValue,
			breakEven: breakEven,
			dcfValue: dcfValue,
			distribution: distribution,
			ebitda: ebitda,
			perforamnce: perforamnce,
			profitEquity: profitEquity,
		};
	} catch (error) {
		return;
	}
};
export const fetchProjectCompanyDetails = async (params: { id: string }) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN') return;

		const pExist = await prisma.project.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
				name: true,
			},
		});
		if (!pExist) return;

		const values = await getGraphValues(pExist.id, pExist.name);

		return {
			...values,
		};
	} catch (error) {
		return;
	}
};

export const getGraphValues = async (
	projectId: string,
	projectName: string,
) => {
	try {
		// Assets Value
		const assetsValue = await prisma.assetsValue.findMany({
			where: {
				projectId: projectId,
			},
			select: {
				date: true,
				value: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const customizeAssetsData = [
			{
				id: projectName,
				data: assetsValue.map((asset) => ({
					x: asset.date.toISOString().split('T')[0],
					y: asset.value,
				})),
			},
		];

		// Distribution values
		const distribution = await prisma.distributionMethod.findMany({
			where: {
				projectId: projectId,
			},
			select: {
				label: true,
				value: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const distributionData = distribution.map((item) => {
			return {
				id: slugify(item.label, { lower: true }),
				label: item.label,
				value: item.value,
			};
		});

		// Profit vs Equity
		const profitValue = await prisma.profitEquity.findMany({
			where: {
				projectId: projectId,
			},
			select: {
				date: true,
				profit: true,
				equity: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const profitEquityData = profitValue.map((item) => {
			return {
				date: item.date.toISOString().split('T')[0],
				profit: item.profit,
				equity: item.equity,
			};
		});

		// Ebitda
		const ebitdaValue = await prisma.ebitdaMethod.findMany({
			where: {
				projectId: projectId,
			},
			select: {
				date: true,
				value: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const ebitdaData = [
			{
				id: projectName,
				data: ebitdaValue.map((asset) => ({
					x: asset.date.toISOString().split('T')[0],
					y: asset.value,
				})),
			},
		];

		// Break Even
		const breakValue = await prisma.breakEven.findMany({
			where: {
				projectId: projectId,
			},
			select: {
				date: true,
				revenue: true,
				expences: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const breakData = [
			{
				id: 'REVENUE',
				data: breakValue
					.filter((item) => item.revenue !== null)
					.map((val) => ({
						x: val.date.toISOString().split('T')[0],
						y: val.revenue,
					})),
			},
			{
				id: 'EXPENCES',
				data: breakValue
					.filter((item) => item.expences !== null)
					.map((val) => ({
						x: val.date.toISOString().split('T')[0],
						y: val.expences,
					})),
			},
		];

		// DCF Method
		const dcfValue = await prisma.dcfMethod.findMany({
			where: {
				projectId: projectId,
			},
			select: {
				date: true,
				value: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const dcfData = [
			{
				id: projectName,
				data: dcfValue.map((asset) => ({
					x: asset.date.toISOString().split('T')[0],
					y: asset.value,
				})),
			},
		];

		// Performance
		const performanceValue = await prisma.performance.findMany({
			where: {
				projectId: projectId,
			},
			select: {
				date: true,
				value: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		const performanceData = [
			{
				id: projectName,
				data: performanceValue.map((asset) => ({
					x: asset.date.toISOString().split('T')[0],
					y: asset.value,
				})),
			},
		];

		return {
			assetsData:
				customizeAssetsData[0].data.length > 0
					? customizeAssetsData
					: null,
			dcfData: dcfData[0].data.length > 0 ? dcfData : null,
			distributionData:
				distributionData.length > 0 ? distributionData : null,
			profitEquityData:
				profitEquityData.length > 0 ? profitEquityData : null,
			ebitdaData: ebitdaData[0].data.length > 0 ? ebitdaData : null,
			performanceData:
				performanceData[0].data.length > 0 ? performanceData : null,
			breakData: breakData[0].data.length > 0 ? breakData : null,
		};
	} catch (error) {
		return;
	}
};
