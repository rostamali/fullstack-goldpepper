import {
	ToastError,
	ToastSuccess,
} from '@/components/shared/elements/custom-toast';
import {
	createAccountByAdmin,
	deleteUserByAdmin,
	fetchUserById,
	forgotPassword,
	loginUser,
	logoutUser,
	registerUser,
	resetPassword,
	updateProfileDetails,
	updateUserPassword,
	updateUserProfileByAdmin,
	verifyUserEmail,
} from '@/server/actions/auth.action';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	ChangePasswordSchema,
	ForgotPasswordSchema,
	LoginFormSchema,
	ProfileFormSchema,
	RegisterFormSchema,
	UserFormSchema,
} from '../form-validation';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

export const useRegisterAccount = (
	showVerification: (value: boolean) => void,
) => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof RegisterFormSchema>) => {
			return await registerUser(data);
		},
		onSuccess: (result) => {
			if (result.success) {
				showVerification(true);
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
			} else {
				showVerification(false);
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
export const useVerifyAccount = () => {
	const router = useRouter();
	return useMutation({
		mutationFn: async (data: string) => {
			return await verifyUserEmail({ code: data });
		},
		onSuccess: (result) => {
			if (result.success) {
				router.push('/auth/login');
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
export const useLoginAccount = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof LoginFormSchema>) => {
			return await loginUser(data);
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
export const useUpdatePassword = () => {
	const router = useRouter();
	return useMutation({
		mutationFn: async (data: z.infer<typeof ChangePasswordSchema>) => {
			return await updateUserPassword(data);
		},
		onSuccess: (result) => {
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
				router.push('/auth/login');
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
export const useUpdateProfile = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof ProfileFormSchema>) => {
			return await updateProfileDetails(data);
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
export const useLoggedOut = () => {
	const router = useRouter();
	return useMutation({
		mutationFn: async () => {
			return await logoutUser();
		},
		onSuccess: (result) => {
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
				router.push('/');
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
export const useForgotPassword = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof ForgotPasswordSchema>) => {
			return await forgotPassword(data);
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
export const useResetPassword = () => {
	const router = useRouter();
	return useMutation({
		mutationFn: async (data: {
			token: string;
			newPassword: string;
			confirmPassword: string;
		}) => {
			return await resetPassword(data);
		},
		onSuccess: (result) => {
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
				router.push('/auth/login');
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

/* ========================== */
// Admin actions for user
/* ========================== */
export const useCreateUser = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof UserFormSchema>) => {
			return await createAccountByAdmin({
				...data,
				password: data.password as string,
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
export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			id: string;
			values: z.infer<typeof UserFormSchema>;
		}) => {
			return await updateUserProfileByAdmin({
				id: data.id,
				data: {
					...data.values,
					role: data.values.role as UserRole,
					status: data.values.status as UserStatus,
				},
			});
		},
		onSuccess: (result) => {
			if (result.success) {
				queryClient.invalidateQueries({ queryKey: ['userDetails'] });
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
export const useUserDetails = (id: string) => {
	return useQuery({
		queryKey: ['userDetails', id],
		queryFn: async () => await fetchUserById({ id }),
	});
};
export const useDeleteAccount = () => {
	return useMutation({
		mutationFn: async (data: {
			ids: string[];
			actionType: 'DEACTIVE' | 'DELETE';
		}) => {
			return await deleteUserByAdmin({
				ids: data.ids,
				actionType: data.actionType,
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
