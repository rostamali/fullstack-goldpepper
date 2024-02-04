import { fetchInvestmentsByAdmin } from '@/server/actions/invest.action';
import InvestorList from './investor-list';
import LocalSearch from '@/components/shared/filters/local-search';
import SelectFilter from '@/components/shared/filters/select-filter';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { InvestmentStatus } from '@/constants';
type SearchParams = {
	searchParams: {
		page: string;
		status: InvestmentStatus;
		q: string | null;
	};
};

const InvestorListPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchInvestmentsByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		status: searchParams.status
			? (searchParams.status.toLocaleUpperCase() as InvestmentStatus)
			: null,
		query: searchParams.q ? searchParams.q : null,
	});

	return (
		<div className="dashboard-col-space">
			<h3 className="heading-3 text-primary-white">Interested users</h3>
			<div className="table-header">
				<div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-[40px] gap-[20px]">
					<div className="lg:col-span-3 w-full xm:flex xm:items-center xm:justify-between xm:gap-[15px]">
						<div className="flex-1 grid grid-cols-5 items-center gap-[15px]">
							<LocalSearch
								route={'/admin/investor'}
								iconPosition={'left'}
								placeholder={''}
								containerClass={
									'bg-white border border-primary-gray border-opacity-15 col-span-3'
								}
								inputClass={'h-[50px]'}
								iconClass={''}
							/>
							<div className="col-span-2">
								<SelectFilter
									filterKey={'status'}
									placeholder={'Filter by status'}
									triggerClass={'input-field-lg bg-white'}
									contentClass={'bg-white'}
									options={InvestmentStatus}
								/>
							</div>
						</div>
					</div>
					<div className="lg:col-span-2 flex items-center gap-[15px] justify-end">
						<Link href="/project" target="_blank">
							<Button className="btn-primary-lg">
								Check portal
							</Button>
						</Link>
					</div>
				</div>
			</div>
			<InvestorList
				data={result ? result.investments : []}
				pages={result ? result.pages : 0}
			/>
		</div>
	);
};

export default InvestorListPage;
