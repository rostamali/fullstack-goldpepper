import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SelectFilter from '@/components/shared/filters/select-filter';
import { ProjectStatus } from '@/constants';
import LocalSearch from '@/components/shared/filters/local-search';
import { fetchProjectsByAdmin } from '@/server/actions/project.action';
import ProjectList from './project-list';
import UploadCSV from '@/components/shared/modals/upload-csv';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Project List - Manage Projects',
	description: `Efficiently manage and oversee projects on Gold & Pepper's admin dashboard. Access project details, track progress, and make informed decisions.`,
};

type SearchParams = {
	searchParams: {
		page: string;
		status: ProjectStatus;
		q: string | null;
	};
};
const ProjectListPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchProjectsByAdmin({
		pageSize: 7,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		status: searchParams.status
			? (searchParams.status.toLocaleUpperCase() as ProjectStatus)
			: null,
		query: searchParams.q ? searchParams.q : null,
	});

	return (
		<div className="dashboard-col-space">
			<h3 className="heading-3 text-primary-white">Projects</h3>
			<div className="table-header">
				<div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-[40px] gap-[20px]">
					<div className="lg:col-span-3 w-full xm:flex xm:items-center xm:justify-between xm:gap-[15px]">
						<div className="flex-1 grid grid-cols-5 items-center gap-[15px]">
							<LocalSearch
								route={'/admin/project'}
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
									options={ProjectStatus}
								/>
							</div>
						</div>
					</div>
					<div className="lg:col-span-2 flex items-center gap-[15px] justify-end">
						<Link href="/admin/project/create">
							<Button className="btn-primary-lg">
								New project
							</Button>
						</Link>
						<UploadCSV type={'PROJECT'} />
					</div>
				</div>
			</div>
			<ProjectList
				list={result ? result?.projects : []}
				pages={result ? result?.pages : 0}
			/>
		</div>
	);
};

export default ProjectListPage;
