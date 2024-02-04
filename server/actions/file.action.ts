'use server';
import Jimp from 'jimp';
import { fileSizeFormat, handleResponse } from '@/lib/formater';
import { isAuthenticated } from './auth.action';
import prisma from '../prisma';
import { join } from 'path';
import { readFile, unlink, writeFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';

export const uploadFilesByAdmin = async (formData: FormData) => {
	try {
		const files: File[] | null = formData.getAll(
			'files',
		) as unknown as File[];
		if (!files || files.length === 0) {
			return handleResponse(false, 'No files uploaded');
		}

		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN')
			return handleResponse(false, `You don't have a permission`);

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const buffer = Buffer.from(await file.arrayBuffer());
			const fileName = `upload-${Date.now()}-${
				Math.random() * (999 - 1) + 1
			}.${file.type.split('/')[1]}`;

			const uploadPath = join('./public/uploads', 'files/', fileName);
			await writeFile(uploadPath, buffer);
			const filesize = fileSizeFormat(file.size);

			await prisma.file.create({
				data: {
					fileType: file.type.split('/')[0],
					fileName: fileName,
					title: file.name,
					url: fileName,
					size: filesize,
					author: {
						connect: {
							id: isAdmin.id,
						},
					},
				},
			});
		}
		revalidatePath('/admin/files', 'page');

		return handleResponse(true, 'File uploaded successfully');
	} catch (error) {
		return handleResponse(false, 'File uploaded failed');
	}
};
export const fetchFilesForLibrary = async (params: {
	pageSize: number;
	page: number;
	type: string | null;
	query: string | null;
}) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN') return;

		const { page = 1, pageSize = 10, type, query } = params;
		const files = await prisma.file.findMany({
			where: {
				...(query && {
					OR: [
						{ title: { contains: query } },
						{ description: { contains: query } },
					],
				}),
				...(type && { fileType: { contains: type } }),
			},
			select: {
				id: true,
				fileName: true,
				title: true,
				url: true,
				fileType: true,
				description: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countFiles = await prisma.file.count({
			where: {
				...(query && {
					OR: [
						{ title: { contains: query } },
						{ description: { contains: query } },
					],
				}),
				...(type && { fileType: { contains: type } }),
			},
		});

		return {
			files,
			pages: Math.ceil(countFiles / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const fetchFilesByAdmin = async (params: {
	pageParam: number;
	type: string | null;
	query: string | null;
}) => {
	try {
		const { pageParam = 0, type, query } = params;
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN') return [];

		const files = await prisma.file.findMany({
			where: {
				...(query && {
					OR: [
						{ title: { contains: query } },
						{ description: { contains: query } },
					],
				}),
				...(type && { fileType: { contains: type } }),
			},
			select: {
				id: true,
				title: true,
				url: true,
				fileType: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: Number(pageParam) - 1,
			take: 9,
		});
		return files;
	} catch (error) {
		return [];
	}
};
export const fetchFileDetailsbyId = async (params: { id: string }) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN') return null;

		const file = await prisma.file.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
				title: true,
				fileType: true,
				description: true,
				url: true,
				fileName: true,
				createdAt: true,
				size: true,
				isCompress: true,
				compressPercent: true,
				author: {
					select: {
						firstName: true,
						lastName: true,
						role: true,
					},
				},
			},
		});
		return file;
	} catch (error) {
		return null;
	}
};
export const compressFileByAdmin = async (params: {
	fileId: string;
	percent: number;
}) => {
	try {
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN')
			return handleResponse(false, `You don't have a permission`);

		const fileCheck = await prisma.file.findUnique({
			where: {
				id: params.fileId,
			},
			select: {
				id: true,
				fileName: true,
				fileType: true,
			},
		});
		if (!fileCheck) return handleResponse(false, `File doesn't exist`);
		if (fileCheck.fileType !== 'image')
			return handleResponse(false, `Choose only "image" type`);

		const filePath = join('./public/uploads', 'files/', fileCheck.fileName);
		const fileBuffer = await readFile(filePath);

		const getFile = await Jimp.read(fileBuffer);
		getFile.resize(400, Jimp.AUTO);

		const newName = `min-upload-${Date.now()}-${
			Math.random() * (999 - 1) + 1
		}.${getFile._originalMime.split('/')[1]}`;
		const uploadPath = join('./public/uploads', 'files/', newName);
		await unlink(filePath);

		await getFile.writeAsync(uploadPath);
		const compressSize = fileSizeFormat(getFile.bitmap.data.length);

		await prisma.file.update({
			where: {
				id: fileCheck.id,
			},
			data: {
				fileName: newName,
				url: newName,
				size: compressSize,
				isCompress: true,
				compressPercent: params.percent,
			},
		});

		revalidatePath('/admin/files');
		return handleResponse(true, `File compressed successfully`);
	} catch (error) {
		return handleResponse(false, `File compression failed`);
	}
};
export const deleteFilesByAdmin = async (params: { fileId: string[] }) => {
	try {
		const { fileId } = params;
		const isAdmin = await isAuthenticated();
		if (!isAdmin || isAdmin.role !== 'ADMIN')
			return handleResponse(false, `You don't have a permission`);

		const filesToDelete = await prisma.file.findMany({
			where: {
				id: { in: fileId },
			},
			select: {
				id: true,
				fileName: true,
			},
		});
		if (!filesToDelete.length)
			return handleResponse(false, `File does not exist`);

		for (const file of filesToDelete) {
			const filePath = join('./public/uploads', 'files/', file.fileName);
			try {
				await unlink(filePath);
				await prisma.file.delete({
					where: {
						id: file.id,
					},
				});
			} catch (error) {
				return handleResponse(
					false,
					`Error deleting file: ${file.fileName}`,
				);
			}
		}

		revalidatePath('/admin/files', 'page');
		return handleResponse(true, 'File deleted successfully');
	} catch (error) {
		return handleResponse(false, 'File deletion failed');
	}
};

/* =========================== */
// Profile avatar actions
/* =========================== */
export const uploadProfilePicture = async (formData: FormData) => {
	try {
		const file: File | null = formData.get('files') as unknown as File;

		if (!file) {
			return handleResponse(false, 'No files uploaded');
		}

		const isAuth = await isAuthenticated();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		const avatarCheck = await prisma.avatar.findUnique({
			where: {
				userId: isAuth.id,
			},
			select: {
				id: true,
				fileName: true,
			},
		});
		if (avatarCheck) {
			const filePath = join(
				'./public/uploads',
				'avatar/',
				avatarCheck.fileName,
			);
			await unlink(filePath);
			await prisma.avatar.delete({
				where: {
					id: avatarCheck.id,
				},
			});
		}
		const fileName = `upload-${Date.now()}-${
			Math.random() * (999 - 1) + 1
		}.${file.type.split('/')[1]}`;

		const uploadedFile = await file.arrayBuffer();
		const getFile = await Jimp.read(Buffer.from(uploadedFile));
		getFile.resize(400, Jimp.AUTO);
		const uploadPath = join('./public/uploads', 'avatar/', fileName);

		await getFile.writeAsync(uploadPath);
		const compressSize = fileSizeFormat(getFile.bitmap.data.length);
		await prisma.avatar.create({
			data: {
				fileName: fileName,
				url: fileName,
				size: compressSize,
				user: {
					connect: {
						id: isAuth.id,
					},
				},
			},
		});
		revalidatePath('/admin/profile', 'page');
		revalidatePath('/user/profile', 'page');
		return handleResponse(true, 'Profile picture uploaded');
	} catch (error) {
		return handleResponse(false, 'Profile picture upload failed');
	}
};
export const deleteProfilePicture = async (params: { refreshLink: string }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		const avatarCheck = await prisma.avatar.findUnique({
			where: {
				userId: isAuth.id,
			},
			select: {
				id: true,
				fileName: true,
			},
		});
		if (!avatarCheck)
			return handleResponse(false, `Profile picture not found`);

		const filePath = join(
			'./public/uploads',
			'avatar/',
			avatarCheck.fileName,
		);
		await unlink(filePath);
		await prisma.avatar.delete({
			where: {
				id: avatarCheck.id,
			},
		});
		revalidatePath(params.refreshLink, 'page');

		return handleResponse(true, 'Profile picture deleted');
	} catch (error) {
		return handleResponse(false, 'Profile picture deletion failed');
	}
};
