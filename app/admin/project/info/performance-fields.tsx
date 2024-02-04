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
import { CompanyInfoSchema } from '@/lib/form-validation';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/shared/elements/date-picker';
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

const PerformanceFields: FC<FormProps> = ({ form }) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'performance',
	});
	const createNewField = () => {
		append({
			date: new Date(),
			value: undefined,
		});
	};
	return (
		<Accordion type="single" collapsible className="space-y-2">
			<AccordionItem value="perforance-fields" className="border-b-0">
				<div className="document__title !bg-black-dark">
					<AccordionTrigger className="flex-1 [&_svg]:text-white">
						<h5 className="heading-5 text-primary-white">
							Perforamnce
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
										name={`performance.${index}.date`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<div className="flex items-center justify-between">
													<FormLabel className="field-label-sm">
														Date
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
													<DatePicker
														triggerClass={
															'input-field-sm bg-white'
														}
														onChange={
															field.onChange
														}
														defaultValue={
															field.value
														}
													/>
												</FormControl>
												<FormMessage className="form-error" />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`performance.${index}.value`}
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

export default PerformanceFields;
