import {
	ToastError,
	ToastSuccess,
} from '@/components/shared/elements/custom-toast';
import { submitContactForm } from '@/server/actions/form.action';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as z from 'zod';
import { ContactFormSchema } from '../form-validation';

export const useSubmitForm = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof ContactFormSchema>) => {
			return await submitContactForm(data);
		},
		onSuccess: (result) => {
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		},
		onError: (error) => {
			toast.custom((t) => (
				<ToastError toastNumber={t} content={error.message} />
			));
		},
	});
};
