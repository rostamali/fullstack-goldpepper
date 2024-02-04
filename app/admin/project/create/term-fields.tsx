import { ProjectFormSchema } from '@/lib/form-validation';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { FC } from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type TermProps = {
	form: UseFormReturn<z.infer<typeof ProjectFormSchema>>;
};

const TermFields: FC<TermProps> = ({ form }) => {
	return (
		<div className="grid grid-cols-2 gap-[25px]">
			<FormField
				control={form.control}
				name="capex"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="field-label-lg">
							Capex required
						</FormLabel>
						<FormControl>
							<Input {...field} className="input-field-sm" />
						</FormControl>

						<FormMessage className="form-error" />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="totalCost"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="field-label-lg">
							Total cost
						</FormLabel>
						<FormControl>
							<Input {...field} className="input-field-sm" />
						</FormControl>

						<FormMessage className="form-error" />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="totalRevenue"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="field-label-lg">
							Total revenue
						</FormLabel>
						<FormControl>
							<Input {...field} className="input-field-sm" />
						</FormControl>

						<FormMessage className="form-error" />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="roi"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="field-label-lg">ROI</FormLabel>
						<FormControl>
							<Input {...field} className="input-field-sm" />
						</FormControl>

						<FormMessage className="form-error" />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default TermFields;
