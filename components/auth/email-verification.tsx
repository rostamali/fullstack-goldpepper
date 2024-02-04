'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import OtpField from '../shared/elements/otp-field';
import { useVerifyAccount } from '@/lib/hooks/useAuth';
import Spinner from '../shared/elements/spinner';

const EmailVerification = () => {
	const EmailVerifyForm = z.object({
		otp: z.string({ required_error: 'Password is required' }),
	});
	const { mutate: verifyAccount, isPending } = useVerifyAccount();
	const form = useForm<z.infer<typeof EmailVerifyForm>>({
		resolver: zodResolver(EmailVerifyForm),
		defaultValues: {
			otp: '',
		},
	});
	const handleConfirmOtp = async (data: z.infer<typeof EmailVerifyForm>) => {
		verifyAccount(data.otp);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleConfirmOtp)}
				className="form-flex-space"
			>
				<FormField
					control={form.control}
					name="otp"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								To confirm the email enter 6 digit OTP here
							</FormLabel>
							<FormControl>
								<OtpField
									onChange={field.onChange}
									fields={4}
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
							className={'stroke-primary-white h-[20px] w-[20px]'}
						/>
					)}
					Verify Account
				</Button>
			</form>
		</Form>
	);
};

export default EmailVerification;
