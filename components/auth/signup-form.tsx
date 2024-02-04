'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterFormSchema } from '@/lib/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import PasswordField from './password-field';
import { useState } from 'react';
import EmailVerification from './email-verification';
import { useRegisterAccount } from '@/lib/hooks/useAuth';
import Spinner from '../shared/elements/spinner';

const SignupForm = () => {
	const [showVerification, setShowVerification] = useState(false);
	const { mutate: registerAccount, isPending } =
		useRegisterAccount(setShowVerification);
	const form = useForm<z.infer<typeof RegisterFormSchema>>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
	});
	const handleSignupUser = async (
		data: z.infer<typeof RegisterFormSchema>,
	) => {
		registerAccount(data);
	};

	return (
		<>
			{!showVerification ? (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSignupUser)}
						className="form-flex-space"
					>
						<div className="grid grid-cols-2 gap-[25px]">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="field-label-sm">
											Firstname
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
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="field-label-sm">
											Lastname
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
						</div>
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
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="password"
										className="field-label-sm"
									>
										Enter password
									</FormLabel>
									<FormControl>
										<PasswordField
											fieldClass={'input-field-sm'}
											id={'password'}
											onChange={field.onChange}
											value={field.value}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<Button
							className="btn-primary-sm gap-1"
							disabled={isPending}
						>
							{isPending && (
								<Spinner
									className={
										'stroke-primary-white h-[20px] w-[20px]'
									}
								/>
							)}
							Create Account
						</Button>
					</form>
				</Form>
			) : (
				<EmailVerification />
			)}
		</>
	);
};

export default SignupForm;
