import { fetchProjectCompanyInfoById } from '@/server/actions/project.action';
import CompanyForm from './company-form';
import EmptyError from '@/components/shared/elements/empty-error';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export const metadata = {
	title: 'Project Info - Add Graph Values',
	description: `Empower your business with Gold & Pepper's intuitive platform. Create investment projects effortlessly, backed by industry-specific insights. Start your success journey today.`,
};
type SearchParams = {
	searchParams: {
		project_id: string;
	};
};

const ProjectGraphInfo = async ({ searchParams }: SearchParams) => {
	const result = await fetchProjectCompanyInfoById({
		id: searchParams.project_id,
	});

	return (
		<div className="dashboard-col-space">
			{result ? (
				<CompanyForm
					defaultValues={{
						type: 'UPDATE',
						assets: result.assetsValue,
						breakEven: result.breakEven,
						dcfMethod: result.dcfValue,
						distribution: result.distribution,
						ebitda: result.ebitda,
						performance: result.perforamnce,
						profitEquity: result.profitEquity,
					}}
					id={searchParams.project_id}
				/>
			) : (
				<EmptyError
					contentClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					title={'There are no info to show'}
					description={`Whoa! It looks like the project doesn't have any infromation at this moment. 📂`}
					Links={
						<Link href="/admin/project">
							<Button className="btn-primary-lg">Go Back</Button>
						</Link>
					}
				/>
			)}
		</div>
	);
};

export default ProjectGraphInfo;
