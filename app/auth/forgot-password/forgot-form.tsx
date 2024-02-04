'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { ForgotPasswordSchema } from '@/lib/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from '@/components/shared/elements/spinner';
import { useForgotPassword } from '@/lib/hooks/useAuth';

const ForgotForm = () => {
	const { mutate: forgotPassword, isPending } = useForgotPassword();
	const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});
	const handleForgotPassword = async (
		data: z.infer<typeof ForgotPasswordSchema>,
	) => {
		forgotPassword(data, {
			onSuccess: () => {
				form.reset();
			},
		});
	};

	return (
		<Form {...form}>
			<form
				className="space-y-7"
				onSubmit={form.handleSubmit(handleForgotPassword)}
			>
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
									type="email"
									className="input-field-sm"
									{...field}
								/>
							</FormControl>
							<FormMessage className="form__error" />
						</FormItem>
					)}
				/>

				<Button className="btn-primary-sm w-full" disabled={isPending}>
					<>
						{isPending && (
							<Spinner
								className={'h-[22px] w-[22px] stroke-white'}
							/>
						)}
						Continue
					</>
				</Button>
			</form>
		</Form>
	);
};

export default ForgotForm;
