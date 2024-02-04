import UserCreate from '@/components/shared/modals/user-create';
import { fetchUsersByAdmin } from '@/server/actions/auth.action';
import UserList from './user-list';
import UploadCSV from '@/components/shared/modals/upload-csv';
import LocalSearch from '@/components/shared/filters/local-search';
import SelectFilter from '@/components/shared/filters/select-filter';
import { UserStatus } from '@/constants';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Registered Users - Manage Users',
	description: `View and manage registered users on Gold & Pepper's admin dashboard. Control user access, permissions, and account details.`,
};

type SearchParams = {
	searchParams: {
		page: string;
		status: UserStatus;
		q: string | null;
	};
};

const UsersPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchUsersByAdmin({
		pageSize: 8,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		status: searchParams.status
			? (searchParams.status.toLocaleUpperCase() as UserStatus)
			: null,
		query: searchParams.q ? searchParams.q : null,
	});

	return (
		<div className="dashboard-col-space">
			<h3 className="heading-3 text-primary-white">Register users</h3>
			<div className="table-header">
				<div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-[40px] gap-[20px]">
					<div className="lg:col-span-3 w-full xm:flex xm:items-center xm:justify-between xm:gap-[15px]">
						<div className="flex-1 grid grid-cols-5 items-center gap-[15px]">
							<LocalSearch
								route={'/admin/user'}
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
									options={UserStatus}
								/>
							</div>
						</div>
					</div>
					<div className="lg:col-span-2 flex items-center gap-[15px] justify-end">
						<UserCreate />
						<UploadCSV type={'USER'} />
					</div>
				</div>
			</div>
			<UserList
				data={result ? result.users : []}
				pages={result ? result.pages : 0}
				current={result?.current ? result?.current : null}
			/>
		</div>
	);
};

export default UsersPage;
