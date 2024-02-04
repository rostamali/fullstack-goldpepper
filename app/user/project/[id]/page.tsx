import AssetsLineGraph from '@/components/graph/assets-line-graph';
import DirstributePieGraph from '@/components/graph/dirstribute-pie-graph';
import ProfitEquityGraph from '@/components/graph/profit-equity-graph';
import DownloadFile from '@/components/shared/elements/download-file';
import EmptyError from '@/components/shared/elements/empty-error';
import GoBack from '@/components/shared/elements/go-back';
import { Button } from '@/components/ui/button';
import { investorDetailsByUser } from '@/server/actions/invest.action';
import Link from 'next/link';
type SearchParams = {
	params: {
		id: string;
	};
};
export const metadata = {
	title: 'Project Details | Gold & Pepper',
	description: `Discover diverse investment opportunities. Explore projects, analyze details, and make confident decisions. Your gateway to a thriving financial future.`,
};

const UserProjectDetails = async ({ params }: SearchParams) => {
	const result = await investorDetailsByUser({
		projectId: params.id,
	});
	return (
		<div className="dashboard-col-space">
			{result ? (
				<div className="project-info space-y-8">
					<div className="flex items-center">
						<GoBack />
						<h4 className="heading-4 text-gray-muted">
							<span className="text-primary-gold">Name:</span>{' '}
							{result.name}
						</h4>
					</div>
					<div className="grid grid-cols-3 gap-[20px]">
						{result.terms.map((item, index) => (
							<div
								key={index}
								className="space-y-2 bg-black-dark p-5 rounded-md"
							>
								<h6 className="heading-6 text-gray-muted">
									{item.label}
								</h6>
								<p className="text-base-2 text-white">
									{item.value}
								</p>
							</div>
						))}
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
											companyData={
												result?.performanceData
											}
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
					{result.documents.length > 0 && (
						<div className="space-y-6">
							<h4 className="heading-4 border-l-[4px] pl-4 border-gray-light leading-[1.2em] text-gray-light">
								Documents
							</h4>
							<div className="grid grid-cols-3 gap-5">
								{result.documents.map((item, index) => (
									<DownloadFile key={index} data={item} />
								))}
							</div>
						</div>
					)}
				</div>
			) : (
				<EmptyError
					contentClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					title={'There are no info to show'}
					description={`Whoa! It looks like your request is still on pending. You can see the details after accepting the request you submitted.`}
					Links={
						<Link href="/user/project">
							<Button className="btn-primary-lg">Go Back</Button>
						</Link>
					}
				/>
			)}
		</div>
	);
};

export default UserProjectDetails;
