'use server';
import { handleResponse } from '@/lib/formater';
import prisma from '../prisma';
import * as z from 'zod';
import sendMail from '../send-mail';
import { ContactFormSchema } from '@/lib/form-validation';

export const submitContactForm = async (
	params: z.infer<typeof ContactFormSchema>,
) => {
	try {
		const { name, email, message, acceptTerms } = params;
		await prisma.form.create({
			data: {
				name,
				email,
				message,
				acceptTerms,
			},
		});
		await sendMail({
			email,
			subject: 'New Contact Form Submission',
			template: `contact-form.ejs`,
			data: { name, email, message },
		});
		return handleResponse(true, 'Message sent successfully!');
	} catch (error) {
		return handleResponse(false, 'Oops! Something went wrong');
	}
};
