import AssetsLineGraph from '@/components/graph/assets-line-graph';
import DirstributePieGraph from '@/components/graph/dirstribute-pie-graph';
import ProfitEquityGraph from '@/components/graph/profit-equity-graph';
import EmptyError from '@/components/shared/elements/empty-error';
import GoBack from '@/components/shared/elements/go-back';
import { Button } from '@/components/ui/button';
import { fetchProjectCompanyDetails } from '@/server/actions/project.action';
import Link from 'next/link';
export const metadata = {
	title: 'Project Details - At Gold & Pepper',
	description: `Empower your business with Gold & Pepper's intuitive platform. Create investment projects effortlessly, backed by industry-specific insights. Start your success journey today.`,
};

type SearchParams = {
	searchParams: {
		project_id: string;
	};
};
const ProjectDetails = async ({ searchParams }: SearchParams) => {
	const result = await fetchProjectCompanyDetails({
		id: searchParams.project_id,
	});

	if (
		result &&
		result.assetsData === null &&
		result.dcfData === null &&
		result.distributionData === null &&
		result.profitEquityData === null &&
		result.ebitdaData === null &&
		result.performanceData === null &&
		result.breakData === null
	)
		return (
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
		);
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<div className="flex items-center">
					<GoBack />
					<h3 className="heading-3 text-primary-white">
						Project details
					</h3>
				</div>
			</div>
			<div className="grid grid-cols-[1fr,350px] max-lg:grid-cols-1 gap-[25px]">
				{result && result?.assetsData && (
					<div>
						<AssetsLineGraph
							companyData={result?.assetsData}
							title={'Assets Value'}
						/>
					</div>
				)}
				{result && result?.distributionData && (
					<div>
						<DirstributePieGraph
							data={result?.distributionData}
							title={'Distribution'}
						/>
					</div>
				)}
				<div className="lg:col-span-2">
					<div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[25px]">
						{result && result.profitEquityData && (
							<div>
								<ProfitEquityGraph
									data={result.profitEquityData}
								/>
							</div>
						)}
						{result && result?.ebitdaData && (
							<div>
								<AssetsLineGraph
									companyData={result?.ebitdaData}
									title={'Ebitda'}
								/>
							</div>
						)}
						{result && result?.performanceData && (
							<div>
								<AssetsLineGraph
									companyData={result?.performanceData}
									title={'Performance'}
								/>
							</div>
						)}
						{result && result?.dcfData && (
							<div>
								<AssetsLineGraph
									companyData={result?.dcfData}
									title={'DCF Methods'}
								/>
							</div>
						)}
					</div>
				</div>
				{result && result?.breakData && (
					<div className="lg:col-span-2">
						<AssetsLineGraph
							companyData={result?.breakData}
							title={'Break Even'}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectDetails;
