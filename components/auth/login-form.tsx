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
import { LoginFormSchema } from '@/lib/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import PasswordField from './password-field';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useLoginAccount } from '@/lib/hooks/useAuth';
import Spinner from '../shared/elements/spinner';

const LoginForm = () => {
	const [showForogt, setShowForgot] = useState(false);
	const { mutate: loginAccount, isPending } = useLoginAccount();
	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
	});
	const handleLoginForm = (values: z.infer<typeof LoginFormSchema>) => {
		loginAccount(values, {
			onSuccess: (res) => {
				if (res.success) {
					setShowForgot(false);
				} else {
					setShowForgot(true);
				}
			},
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleLoginForm)}
				className="form-flex-space"
			>
				<FormField
					control={form.control}
					name="email"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Email address
							</FormLabel>
							<FormControl>
								<Input
									type="email"
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
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor="password"
								className="field-label-sm"
							>
								Enter password
							</FormLabel>
							<PasswordField
								fieldClass={'input-field-sm'}
								id={'password'}
								value={field.value}
								onChange={field.onChange}
							/>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-2 sm:gap-[10px] gap-[4px] items-center">
					<FormField
						control={form.control}
						name="remember"
						defaultValue={false}
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										className="checkbox-sm"
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel className="text-base-2 text-primary-white">
										Remember me
									</FormLabel>
								</div>
							</FormItem>
						)}
					/>
					{showForogt && (
						<div className="text-right">
							<Link
								className="form-error duration-150 hover:underline"
								href="/auth/forgot-password"
							>
								Forgot password?
							</Link>
						</div>
					)}
				</div>
				<Button className="btn-primary-sm w-full" disabled={isPending}>
					{isPending && (
						<Spinner
							className={'stroke-primary-white h-[20px] w-[20px]'}
						/>
					)}
					Login
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
