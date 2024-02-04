import {
	ToastError,
	ToastSuccess,
} from '@/components/shared/elements/custom-toast';
import { importUsersFromCSV } from '@/server/actions/auth.action';
import { importProjectFromCSV } from '@/server/actions/project.action';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUploadUser = () => {
	return useMutation({
		mutationFn: async (data: CSVUser[]) => {
			return await importUsersFromCSV(data);
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
export const useUploadProject = () => {
	return useMutation({
		mutationFn: async (data: CSVProject[]) => {
			return await importProjectFromCSV(data);
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
