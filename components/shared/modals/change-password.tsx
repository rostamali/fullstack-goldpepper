'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
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
import { ChangePasswordSchema } from '@/lib/form-validation';
import { useUpdatePassword } from '@/lib/hooks/useAuth';
import PasswordField from '@/components/auth/password-field';
import Spinner from '../elements/spinner';

const ChangePassword = () => {
	const { mutate: updatePassword, isPending } = useUpdatePassword();
	const form = useForm<z.infer<typeof ChangePasswordSchema>>({
		resolver: zodResolver(ChangePasswordSchema),
	});
	const handlePassword = async (
		data: z.infer<typeof ChangePasswordSchema>,
	) => {
		updatePassword(data);
		form.reset();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">Change Password</Button>
			</DialogTrigger>
			<DialogContent className="bg-black-dark md:max-w-[450px] max-w-[85%] border-0">
				<DialogHeader>
					<DialogTitle className="heading-4 text-gray-dark">
						Change Password
					</DialogTitle>
					<DialogDescription className="text-base-2 text-gray-light">
						Fill the form using correct information.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						className="form-flex-space"
						onSubmit={form.handleSubmit(handlePassword)}
					>
						<FormField
							control={form.control}
							name="oldPassword"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="old-password"
										className="field-label-sm"
									>
										Enter old password
									</FormLabel>
									<FormControl>
										<PasswordField
											fieldClass={'input-field-sm'}
											id={'old-password'}
											onChange={(val) => {
												field.onChange(val);
											}}
											value={field.value}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPassword"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="new-password"
										className="field-label-sm"
									>
										Enter new password
									</FormLabel>
									<FormControl>
										<PasswordField
											fieldClass={'input-field-sm'}
											id={'new-password'}
											onChange={(val) => {
												field.onChange(val);
											}}
											value={field.value}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="confirm-password"
										className="field-label-sm"
									>
										Enter confirm password
									</FormLabel>
									<FormControl>
										<PasswordField
											fieldClass={'input-field-sm'}
											id={'confirm-password'}
											onChange={(val) => {
												field.onChange(val);
											}}
											value={field.value}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<Button className="btn-primary-sm" disabled={isPending}>
							{isPending && (
								<Spinner
									className={'btn-spinner-sm mr-[5px]'}
								/>
							)}
							Save Changes
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ChangePassword;
