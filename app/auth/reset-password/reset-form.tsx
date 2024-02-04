'use client';
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
import { FC } from 'react';
import { ResetPasswordSchema } from '@/lib/form-validation';
import Spinner from '@/components/shared/elements/spinner';
import { Button } from '@/components/ui/button';
import PasswordField from '@/components/auth/password-field';
import { useResetPassword } from '@/lib/hooks/useAuth';
type FormProps = {
	token: string;
};

const ResetForm: FC<FormProps> = ({ token }) => {
	const { mutate: resetPassword, isPending } = useResetPassword();
	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
	});
	const handleResetPassword = async (
		data: z.infer<typeof ResetPasswordSchema>,
	) => {
		resetPassword({
			...data,
			token,
		});
	};
	return (
		<Form {...form}>
			<form
				className="space-y-5"
				onSubmit={form.handleSubmit(handleResetPassword)}
			>
				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor="newPass"
								className="field-label-sm"
							>
								New password
							</FormLabel>
							<FormControl>
								<PasswordField
									fieldClass={
										'input-field-sm bg-primary-white'
									}
									id={'newPass'}
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor="confirmPass"
								className="field-label-sm"
							>
								Confirm password
							</FormLabel>
							<FormControl>
								<PasswordField
									fieldClass={
										'input-field-sm bg-primary-white'
									}
									id={'confirmPass'}
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<Button
					className="btn-primary-sm gap-[5px] w-full"
					disabled={isPending}
				>
					<>
						{isPending && (
							<Spinner
								className={'h-[16px] w-[16px] stroke-white'}
							/>
						)}
						Save Password
					</>
				</Button>
			</form>
		</Form>
	);
};

export default ResetForm;
