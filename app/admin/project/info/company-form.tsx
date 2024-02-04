'use client';
import { Form } from '@/components/ui/form';
import { CompanyInfoSchema } from '@/lib/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import AssetFields from './asset-fields';
import BreakEvenFields from './break-even-fields';
import DcfFields from './dcf-fields';
import DistributionFields from './distribution-fields';
import EbitdaFields from './ebitda-fields';
import PerformanceFields from './performance-fields';
import ProfitEquityFields from './profit-equity-fields';
import { useProjectInfoUpdate } from '@/lib/hooks/useProject';
import GoBack from '@/components/shared/elements/go-back';
type FormProps = {
	defaultValues: z.infer<typeof CompanyInfoSchema>;
	id: string;
};

const CompanyForm: FC<FormProps> = ({ defaultValues, id }) => {
	const { mutate: updateProject, isPending } = useProjectInfoUpdate();
	const form = useForm<z.infer<typeof CompanyInfoSchema>>({
		resolver: zodResolver(CompanyInfoSchema),
		defaultValues,
	});
	const handleSubmitForm = async (
		data: z.infer<typeof CompanyInfoSchema>,
	) => {
		updateProject({
			id,
			values: data,
		});
	};
	return (
		<Form {...form}>
			<form
				className="space-y-6"
				onSubmit={form.handleSubmit(handleSubmitForm)}
			>
				<div className="flex items-center justify-between gap-[40px]">
					<div className="flex items-center">
						<GoBack />
						<h3 className="heading-3 text-primary-white">
							Company information
						</h3>
					</div>

					<Button className="btn-primary-lg" disabled={isPending}>
						Save changes
					</Button>
				</div>
				<AssetFields form={form} />
				<BreakEvenFields form={form} />
				<DcfFields form={form} />
				<DistributionFields form={form} />
				<EbitdaFields form={form} />
				<PerformanceFields form={form} />
				<ProfitEquityFields form={form} />
			</form>
		</Form>
	);
};

export default CompanyForm;
