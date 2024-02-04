import { ProjectFormSchema } from '@/lib/form-validation';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { FC } from 'react';
import { X } from 'lucide-react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SelectField from '@/components/shared/elements/select-field';
import { DocumentStatus } from '@/constants';
import { Button } from '@/components/ui/button';
import SelectDocument from '@/components/shared/elements/select-document';

type FieldSidebarProps = {
	form: UseFormReturn<z.infer<typeof ProjectFormSchema>>;
};

const DocumentFields: FC<FieldSidebarProps> = ({ form }) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'documents',
	});
	const addField = (field: number) => {
		append(
			{
				name: `Attached file no: ${field + 1}`,
				description: '',
				status: 'PRIVATE',
				file: [],
			},
			{ shouldFocus: true },
		);
	};

	return (
		<div className="document-fields">
			<Accordion type="single" collapsible className="space-y-2">
				{fields.map((field, index) => (
					<AccordionItem
						value={`flat-${index}`}
						key={index}
						className="border-b-0"
					>
						<div className="document__title">
							<button
								onClick={() => remove(index)}
								type="button"
								className="document__remove"
							>
								<X size={14} />
							</button>
							<AccordionTrigger className="flex-1">
								{form.watch(`documents.${index}.name`).length >
								0
									? form.watch(`documents.${index}.name`)
									: 'Project ducument'}
							</AccordionTrigger>
						</div>
						<AccordionContent>
							<div className="grid grid-cols-[300px,1fr] gap-[20px] p-4 bg-primary-white rounded-md mt-1.5">
								<div className="document-file">
									<FormField
										control={form.control}
										name={`documents.${index}.file`}
										render={({ field }) => (
											<FormItem>
												<FormLabel className="field-label-sm !text-black-dark">
													Document file
												</FormLabel>
												<FormControl>
													<SelectDocument
														trigger={
															<div className="text-base-2 text-black-dark">
																Choose file
															</div>
														}
														modalTitle={
															'Select Thumbnail'
														}
														onChange={
															field.onChange
														}
														frameClass="w-full h-[180px] bg-white rounded-md"
														thumbClass="overflow-hidden rounded-md"
														iconClass="text-black-dark text-opacity-50"
														selected={field.value}
													/>
												</FormControl>
												<FormMessage className="form-error pt-2 block" />
											</FormItem>
										)}
									/>
								</div>
								<div className="space-y-4">
									<FormField
										control={form.control}
										name={`documents.${index}.name`}
										render={({ field }) => (
											<FormItem>
												<FormLabel className="field-label-sm !text-black-light">
													Document name
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
										name={`documents.${index}.status`}
										render={({ field }) => (
											<FormItem>
												<FormLabel className="field-label-sm !text-black-light">
													Document status
												</FormLabel>
												<FormControl>
													<SelectField
														triggerClass={
															'input-field-sm bg-primary-white'
														}
														placeholder={''}
														defaultValue={
															field.value
														}
														onChange={
															field.onChange
														}
														options={DocumentStatus}
													/>
												</FormControl>
												<FormMessage className="form-error" />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`documents.${index}.description`}
										render={({ field }) => (
											<FormItem>
												<FormLabel className="field-label-sm !text-black-light">
													Document description
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
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			<Button
				onClick={() => addField(fields.length)}
				type="button"
				className="badge-success mt-2"
			>
				Add Document
			</Button>
		</div>
	);
};

export default DocumentFields;
