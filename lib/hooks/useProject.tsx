import {
	createProjectByAdmin,
	createProjectCompanyInfo,
	deleteProjectByAdmin,
	updateProjectByAdmin,
} from '@/server/actions/project.action';
import { CompanyInfoSchema, ProjectFormSchema } from '../form-validation';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	ToastError,
	ToastSuccess,
} from '@/components/shared/elements/custom-toast';
import { useRouter } from 'next/navigation';

export const useCreateProject = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: z.infer<typeof ProjectFormSchema>) => {
			return await createProjectByAdmin(data);
		},
		onSuccess: (result) => {
			if (result.success) {
				router.push(`/admin/project/edit?project_id=${result.id}`);
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
export const useDeleteProject = () => {
	return useMutation({
		mutationFn: async (data: { projectId: string }) => {
			return await deleteProjectByAdmin({
				projectId: data.projectId,
			});
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
export const useUpdateProject = () => {
	return useMutation({
		mutationFn: async (data: {
			values: z.infer<typeof ProjectFormSchema>;
			id: string;
		}) => {
			return await updateProjectByAdmin({
				id: data.id,
				data: data.values,
			});
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
export const useProjectInfoUpdate = () => {
	return useMutation({
		mutationFn: async (data: {
			values: z.infer<typeof CompanyInfoSchema>;
			id: string;
		}) => {
			return await createProjectCompanyInfo({
				id: data.id,
				data: data.values,
			});
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
