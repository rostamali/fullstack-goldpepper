import {
	ToastError,
	ToastSuccess,
} from '@/components/shared/elements/custom-toast';
import {
	deleteInterestedByAdmin,
	fetchSingleInvestorById,
	submitProjectInterested,
	updateInvestorByAdmin,
} from '@/server/actions/invest.action';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { InvestorDetailsSchema } from '../form-validation';
import * as z from 'zod';

export const useSubmitInterest = () => {
	return useMutation({
		mutationFn: async (data: { agreeTerm: boolean; projectId: string }) => {
			return await submitProjectInterested(data);
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
export const useDeleteInterest = () => {
	return useMutation({
		mutationFn: async (data: { id: string }) => {
			return await deleteInterestedByAdmin(data);
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
export const useUpdateInterest = () => {
	return useMutation({
		mutationFn: async (data: {
			id: string;
			values: z.infer<typeof InvestorDetailsSchema>;
		}) => {
			return await updateInvestorByAdmin({
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
export const useInvestorDetails = (id: string) => {
	return useQuery({
		queryKey: ['fileDetails', id],
		queryFn: async () => await fetchSingleInvestorById({ id }),
	});
};
// fetchSingleInvestorById
