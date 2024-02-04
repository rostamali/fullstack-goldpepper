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
import { FC } from 'react';
import { ProjectInterestSchema } from '@/lib/form-validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { useSubmitInterest } from '@/lib/hooks/useInvest';
type FormProps = {
	projectId: string;
};

const SubmitInterested: FC<FormProps> = ({ projectId }) => {
	const { mutate: submitForm, isPending } = useSubmitInterest();
	const form = useForm<z.infer<typeof ProjectInterestSchema>>({
		resolver: zodResolver(ProjectInterestSchema),
	});
	const handleProjectInterest = async (
		data: z.infer<typeof ProjectInterestSchema>,
	) => {
		submitForm({
			projectId,
			agreeTerm: data.acceptTerms,
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-sm">Submit interest</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[550px] max-sm:w-[95%] bg-black-dark border border-primary-gray border-opacity-30 space-y-3">
				<DialogHeader>
					<h4 className="heading-4 text-gray-muted">
						Send us your interest
					</h4>
					<p className="text-base-1 text-gray-muted">
						Send us your interest, one of our support team will
						contact you soon.
					</p>
				</DialogHeader>
				<div>
					<Form {...form}>
						<form
							className="flex flex-col gap-[25px]"
							onSubmit={form.handleSubmit(handleProjectInterest)}
						>
							<div className="h-[250px] overflow-y-auto scrollbar-sm">
								<p className="text-base-2 text-gray-light leading-6">
									Lorem ipsum dolor sit amet consectetur,
									adipisicing elit. Aliquid nihil veniam magni
									dolore amet quisquam nulla quaerat cum,
									molestiae facilis ipsum tempora asperiores
									neque sequi sunt suscipit ea reiciendis
									ducimus a laboriosam unde quia
									exercitationem dicta? Nostrum non, aliquid
									accusamus suscipit natus necessitatibus
									impedit dicta omnis recusandae, officiis
									dolores distinctio.
									<br /> <br />
									Lorem ipsum dolor sit amet consectetur,
									adipisicing elit. Aliquid nihil veniam magni
									dolore amet quisquam nulla quaerat cum,
									molestiae facilis ipsum tempora asperiores
									neque sequi sunt suscipit ea reiciendis
									ducimus a laboriosam unde quia
									exercitationem dicta? Nostrum non, aliquid
									accusamus suscipit natus necessitatibus
									impedit dicta omnis recusandae, officiis
									dolores distinctio.
								</p>
							</div>
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
													onCheckedChange={
														field.onChange
													}
													id="acceptTerms"
													className="checkbox-lg"
												/>
												<div className="space-y-1 leading-none">
													<FormLabel
														className="field-label-sm text-gray-muted"
														htmlFor="acceptTerms"
													>
														I agree with the terms
														and condistions
													</FormLabel>
												</div>
											</div>
										</FormControl>
										<FormMessage className="form-error block pt-[10px] !ml-0" />
									</FormItem>
								)}
							/>
							<Button
								className="btn-primary-sm"
								disabled={isPending}
							>
								{isPending
									? 'Submitting...'
									: 'Submit Interest'}
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SubmitInterested;
