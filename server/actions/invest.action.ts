'use server';
import * as z from 'zod';
import { isAuthenticated } from './auth.action';
import prisma from '../prisma';
import {
	InvestmentStatusFormat,
	dateFormat,
	handleResponse,
} from '@/lib/formater';
import sendMail from '../send-mail';
import { revalidatePath } from 'next/cache';
import { InvestorDetailsSchema } from '@/lib/form-validation';
import { getGraphValues } from './project.action';

export const fetchInvestmentsByAdmin = async (params: {
	pageSize: number;
	page: number;
	status: InvestmentStatus | null;
	query: string | null;
}) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN') return;

		const { page = 1, pageSize = 10, status, query } = params;
		const investments = await prisma.investment.findMany({
			where: {
				...(query && {
					project: {
						name: { contains: query },
					},
				}),
				...(status && {
					status: { equals: status },
				}),
			},
			select: {
				id: true,
				name: true,
				email: true,
				phoneNumber: true,
				status: true,
				createdAt: true,
				project: {
					select: {
						name: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countList = await prisma.investment.count({
			where: {
				...(query && {
					project: {
						name: { contains: query },
					},
				}),
			},
		});

		return {
			investments,
			pages: Math.ceil(countList / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const submitProjectInterested = async (params: {
	agreeTerm: boolean;
	projectId: string;
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return handleResponse(false, `You don't have permission`);

		const { agreeTerm, projectId } = params;
		const investor = await prisma.user.findUnique({
			where: {
				id: isAuth.id,
				status: 'ACTIVE',
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				phoneNumber: true,
			},
		});
		if (!investor)
			return handleResponse(false, `You don't have permission`);

		const projectExist = await prisma.project.findUnique({
			where: {
				id: projectId,
				status: 'ACTIVE',
			},
			select: {
				id: true,
				name: true,
			},
		});
		if (!projectExist)
			return handleResponse(false, `Project does not exist`);

		const investmentExistOnUser = await prisma.investment.findFirst({
			where: {
				userId: isAuth.id,
				projectId: projectExist.id,
			},
			select: {
				id: true,
			},
		});
		if (investmentExistOnUser)
			return handleResponse(false, `We already received your intertest`);

		const newInvestment = await prisma.investment.create({
			data: {
				name: `${investor?.firstName} ${investor?.lastName}`,
				email: investor.email,
				agreeTerm,
				isActive: true,
				status: 'PENDING',
				project: {
					connect: {
						id: projectExist.id,
					},
				},
				user: {
					connect: {
						id: investor.id,
					},
				},
			},
		});

		revalidatePath('/project/:slug');

		try {
			await sendMail({
				email: investor.email,
				subject: `Investment Proposal Submission`,
				template: `create-proposal.ejs`,
				data: {
					project: projectExist.name,
					name: `${investor.firstName} ${investor.lastName}`,
					email: investor.email,
					phone: investor.phoneNumber,
				},
			});
			return handleResponse(true, `Form submitted successfully`);
		} catch (error) {
			await prisma.investment.delete({
				where: {
					id: newInvestment.id,
				},
			});
			return handleResponse(false, `Form submission failed`);
		}
	} catch (error) {
		return handleResponse(false, `Form submission failed`);
	}
};
export const deleteInterestedByAdmin = async (params: { id: string }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
			return handleResponse(false, `You don't have permission`);

		await prisma.investment.delete({
			where: {
				id: params.id,
			},
		});
		revalidatePath('/admin/investor');
		return handleResponse(true, `Investor deleted successfully`);
	} catch (error) {
		return handleResponse(false, `Investment action failed`);
	}
};
export const updateInvestorByAdmin = async (params: {
	data: z.infer<typeof InvestorDetailsSchema>;
	id: string;
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
			return handleResponse(false, `You don't have permission`);

		const {
			id,
			data: { email, name, phone, status, sendMessage },
		} = params;
		const iExist = await prisma.investment.findUnique({
			where: {
				id,
			},
			select: {
				status: true,
				project: {
					select: {
						name: true,
					},
				},
			},
		});
		if (!iExist) return handleResponse(false, `Investor not found`);

		await prisma.investment.update({
			where: {
				id,
			},
			data: {
				email,
				name,
				phoneNumber: phone,
				status: status as InvestmentStatus,
			},
		});
		if (sendMessage) {
			await sendMail({
				email,
				subject: 'Update Your Investment Proposal',
				template: `create-proposal.ejs`,
				data: {
					project: iExist.project.name,
					name,
					status: InvestmentStatusFormat[iExist.status],
					date: new Date(),
				},
			});
		}

		revalidatePath('/admin/investor');
		return handleResponse(true, `Info updated successfully`);
	} catch (error) {
		return handleResponse(false, `Investor action failed`);
	}
};
export const fetchSingleInvestorById = async (params: { id: string }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN') return;

		const investor = await prisma.investment.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				phoneNumber: true,
				status: true,
			},
		});
		if (!investor) return;

		return {
			...investor,
		};
	} catch (error) {
		return;
	}
};
export const fetchInvestedProjectByUser = async (params: {
	pageSize: number;
	page: number;
	status: InvestmentStatus | null;
	query: string | null;
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return;

		const { page = 1, pageSize = 10, status, query } = params;
		const projectData = await prisma.investment.findMany({
			where: {
				userId: isAuth.id,
				...(status && {
					status: { equals: status },
				}),
				...(query && {
					project: {
						name: { contains: query },
					},
				}),
			},
			select: {
				status: true,
				project: {
					select: {
						id: true,
						name: true,
						capex: true,
						roi: true,
						totalCost: true,
						totalRevenue: true,
						thumbnail: {
							select: {
								url: true,
							},
						},
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countData = await prisma.investment.count({
			where: {
				userId: isAuth.id,
				...(status && {
					status: { equals: status },
				}),
				...(query && {
					project: {
						name: { contains: query },
					},
				}),
			},
		});

		const projects = projectData.map((item) => {
			return {
				status: item.status,
				projectId: item.project.id,
				name: item.project.name,
				thumbnail: item.project.thumbnail
					? item.project.thumbnail.url
					: null,
				capex: item.project.capex,
				roi: item.project.roi,
				totalCost: item.project.totalCost,
				totalRevenue: item.project.totalRevenue,
			};
		});

		return {
			projects,
			pages: Math.ceil(Number(countData) / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const investorDetailsByUser = async (params: { projectId: string }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return;

		const userExistProject = await prisma.investment.findFirst({
			where: {
				projectId: params.projectId,
				userId: isAuth.id,
				status: 'ACCEPT',
			},
			select: {
				id: true,
				status: true,
			},
		});
		if (!userExistProject) return;

		const pExist = await prisma.project.findUnique({
			where: {
				id: params.projectId,
			},
			select: {
				id: true,
				name: true,
				capex: true,
				roi: true,
				totalCost: true,
				totalRevenue: true,
				closeDate: true,
				documents: {
					select: {
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

		if (!pExist) return;

		const graphValues = await getGraphValues(pExist.id, pExist.name);
		const documents = pExist.documents.map((item) => {
			return {
				name: item.name,
				description: item.description,
				status: item.status,
				file: item.file ? item.file.url : null,
				fileId: item.file ? item.file.id : null,
			};
		});

		return {
			...graphValues,
			name: pExist.name,
			documents,
			terms: [
				{
					label: 'Total Cost',
					value: pExist.totalCost,
				},
				{
					label: 'Total Revenue',
					value: pExist.totalRevenue,
				},
				{
					label: 'Capex',
					value: pExist.capex,
				},
				{
					label: 'ROI',
					value: pExist.roi,
				},
				{
					label: 'Closed date',
					value: dateFormat(pExist.closeDate),
				},
				{
					label: 'Investment status',
					value: InvestmentStatusFormat[userExistProject.status],
				},
			],
		};
	} catch (error) {
		return;
	}
};
