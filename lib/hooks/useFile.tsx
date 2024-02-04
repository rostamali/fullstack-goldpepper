import {
	ToastError,
	ToastSuccess,
} from '@/components/shared/elements/custom-toast';
import {
	compressFileByAdmin,
	deleteFilesByAdmin,
	deleteProfilePicture,
	fetchFileDetailsbyId,
	fetchFilesByAdmin,
	uploadFilesByAdmin,
	uploadProfilePicture,
} from '@/server/actions/file.action';
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

export const useFileDetails = (id: string) => {
	return useQuery({
		queryKey: ['fileDetails', id],
		queryFn: async () => await fetchFileDetailsbyId({ id }),
	});
};
export const useDownloadFile = () => {
	return useMutation({
		mutationFn: async (data: { fileName: string }) => {
			const response = await fetch(`/api/file?fileName=${data.fileName}`);

			if (!response.ok) {
				throw new Error('Download failed');
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = data.fileName;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);

			return true;
		},
	});
};
export const useDeleteFiles = () => {
	return useMutation({
		mutationFn: async (data: string[]) => {
			return await deleteFilesByAdmin({
				fileId: data,
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
export const useCompressFile = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { percent: number }) => {
			return await compressFileByAdmin({
				fileId: id,
				percent: data.percent,
			});
		},
		onSuccess: (result) => {
			if (result.success) {
				queryClient.invalidateQueries({
					queryKey: ['fileDetails', id],
				});
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
export const useUploadFiles = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: FormData) => {
			return await uploadFilesByAdmin(data);
		},
		onSuccess: (result) => {
			if (result.success) {
				queryClient.invalidateQueries({ queryKey: ['filesList'] });
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
export const useLoadFiles = (type: string | null, query: string | null) => {
	return useInfiniteQuery({
		queryKey: ['filesList', type, query],
		queryFn: async ({ pageParam }) =>
			await fetchFilesByAdmin({ pageParam, type, query }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage =
				lastPage.length === 9 ? allPages.length * 9 : undefined;
			return nextPage;
		},
	});
};
export const useUploadAvatar = () => {
	return useMutation({
		mutationFn: async (data: FormData) => {
			return await uploadProfilePicture(data);
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
export const useDeleteAvatar = () => {
	return useMutation({
		mutationFn: async (data: string) => {
			return await deleteProfilePicture({
				refreshLink: data,
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
