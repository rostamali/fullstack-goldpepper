'use client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { ContactFormSchema } from '@/lib/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { useSubmitForm } from '@/lib/hooks/useForm';

const ContactForm = () => {
	const { mutate: submitForm, isPending } = useSubmitForm();
	const form = useForm<z.infer<typeof ContactFormSchema>>({
		resolver: zodResolver(ContactFormSchema),
		defaultValues: {
			name: '',
			email: '',
			message: '',
			acceptTerms: false,
		},
	});
	const handleSubmitForm = async (
		data: z.infer<typeof ContactFormSchema>,
	) => {
		submitForm(data, {
			onSuccess: () => {
				form.reset();
			},
		});
	};

	return (
		<Form {...form}>
			<form
				className="space-y-6"
				onSubmit={form.handleSubmit(handleSubmitForm)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Name
							</FormLabel>
							<FormControl>
								<Input className="input-field-sm" {...field} />
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
								Email
							</FormLabel>
							<FormControl>
								<Input className="input-field-sm" {...field} />
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Message
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us a little bit about yourself"
									className="resize-none input-field-sm"
									{...field}
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="acceptTerms"
					defaultValue={false}
					render={({ field }) => (
						<FormItem className="flex flex-col items-start space-x-3 space-y-0">
							<FormControl>
								<div className="flex items-center gap-[10px]">
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										id="acceptTerms"
										className="checkbox-lg"
									/>
									<div className="space-y-1 leading-none">
										<FormLabel
											className="field-label-sm"
											htmlFor="acceptTerms"
										>
											I agree with the terms and
											condistions
										</FormLabel>
									</div>
								</div>
							</FormControl>
							<FormMessage className="form-error block pt-[10px] !ml-0" />
						</FormItem>
					)}
				/>
				<div className="auth-input__group">
					<Button
						className="btn-primary-sm w-full"
						disabled={isPending}
					>
						{isPending ? 'Submitting' : 'Submit'}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default ContactForm;
