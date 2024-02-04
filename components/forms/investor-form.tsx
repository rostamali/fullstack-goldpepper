'use client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InvestorDetailsSchema } from '@/lib/form-validation';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import SelectField from '../shared/elements/select-field';
import { InvestmentStatus } from '@/constants';
import { useUpdateInterest } from '@/lib/hooks/useInvest';

type FormProps = {
	defaultValues: z.infer<typeof InvestorDetailsSchema>;
	id: string;
};
const InvestorForm: FC<FormProps> = ({ defaultValues, id }) => {
	const { mutate: updateInterest, isPending } = useUpdateInterest();
	const form = useForm<z.infer<typeof InvestorDetailsSchema>>({
		resolver: zodResolver(InvestorDetailsSchema),
		defaultValues,
	});
	const handleInvestorForm = async (
		data: z.infer<typeof InvestorDetailsSchema>,
	) => {
		updateInterest({
			id: id as string,
			values: data,
		});
	};

	return (
		<Form {...form}>
			<form
				className="form-flex-space"
				onSubmit={form.handleSubmit(handleInvestorForm)}
			>
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Full name
								</FormLabel>
								<FormControl>
									<Input
										className="input-field-sm"
										{...field}
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Email address
								</FormLabel>
								<FormControl>
									<Input
										className="input-field-sm"
										{...field}
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Phone number
								</FormLabel>
								<FormControl>
									<Input
										className="input-field-sm"
										{...field}
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Status
								</FormLabel>
								<FormControl>
									<SelectField
										triggerClass={
											'input-field-sm bg-primary-white'
										}
										placeholder={'Select status'}
										defaultValue={field.value}
										onChange={(val) => {
											field.onChange(val);
										}}
										options={InvestmentStatus}
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="sendMessage"
					render={({ field }) => (
						<FormItem className="flex flex-col items-start space-x-3 space-y-0">
							<FormControl>
								<div className="flex items-center gap-[10px]">
									<Checkbox
										id="send-message"
										className="checkbox-sm"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									<FormLabel
										htmlFor="send-message"
										className="field-label-sm !text-[14px] space-y-1 leading-none"
									>
										Send the investor an email about the
										update
									</FormLabel>
								</div>
							</FormControl>

							<FormMessage className="form-error block pt-[10px] !ml-0" />
						</FormItem>
					)}
				/>
				<Button className="btn-primary-sm" disabled={isPending}>
					Save Changes
				</Button>
			</form>
		</Form>
	);
};

export default InvestorForm;
