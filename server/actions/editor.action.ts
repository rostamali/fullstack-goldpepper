'use server';

import { join } from 'path';
import { isAuthenticated } from './auth.action';
import { writeFile } from 'fs/promises';
import { fileSizeFormat } from '@/lib/formater';
import prisma from '../prisma';

export const uploadEditorImage = async (formData: FormData) => {
	try {
		const file: File | null = formData.get('files') as unknown as File;
		if (!file)
			return {
				message: `No file found`,
				url: null,
			};

		const isAdmin = await isAuthenticated();
		if (!isAdmin)
			return {
				message: `You don't have permission`,
				url: null,
			};

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

		return {
			message: `No file found`,
			url: `/uploads/files/${fileName}`,
		};
	} catch (error) {
		return {
			message: `Image upload failed`,
			url: null,
		};
	}
};
