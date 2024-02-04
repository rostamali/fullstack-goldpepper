import { FC } from 'react';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CompanyInfoSchema } from '@/lib/form-validation';
import { X } from 'lucide-react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
type FormProps = {
	form: UseFormReturn<z.infer<typeof CompanyInfoSchema>>;
};

const DistributionFields: FC<FormProps> = ({ form }) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'distribution',
	});
	const createNewField = () => {
		append({
			label: '',
			value: undefined,
		});
	};
	return (
		<Accordion type="single" collapsible className="space-y-2">
			<AccordionItem value="distribution-methods" className="border-b-0">
				<div className="document__title !bg-black-dark">
					<AccordionTrigger className="flex-1 [&_svg]:text-white">
						<h5 className="heading-5 text-primary-white">
							Distribution methods
						</h5>
					</AccordionTrigger>
					<Button
						className="badge-success"
						onClick={createNewField}
						type="button"
					>
						New Field
					</Button>
				</div>
				<AccordionContent>
					<div className="pt-4 grid grid-cols-2 max-md:grid-cols-1 gap-[20px]">
						{fields.length > 0 &&
							fields.map((item, index) => (
								<div
									key={index}
									className="bg-black-dark p-5 rounded-md space-y-4"
								>
									<FormField
										control={form.control}
										name={`distribution.${index}.label`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<div className="flex items-center justify-between">
													<FormLabel className="field-label-sm">
														Label
													</FormLabel>
													<button
														onClick={() =>
															remove(index)
														}
														type="button"
														className="document__remove"
													>
														<X size={14} />
													</button>
												</div>

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
										name={`distribution.${index}.value`}
										render={({ field }) => (
											<FormItem>
												<FormLabel className="field-label-sm">
													Value
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
							))}
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default DistributionFields;
