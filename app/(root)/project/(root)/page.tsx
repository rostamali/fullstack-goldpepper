import { fetchProjectsByUser } from '@/server/actions/project.action';
import ProjectCard from './project-card';
import Pagination from '@/components/shared/filters/pagination';
import ProjectFilter from './project-filter';
import EmptyError from '@/components/shared/elements/empty-error';
import { Button } from '@/components/ui/button';
type SearchParams = {
	searchParams: {
		page: string;
		q: string | null;
	};
};
export const metadata = {
	title: 'Explore Investment Opportunities | Detailed Project Insights',
	description: `Explore investment opportunities with detailed project insights. Discover the potential returns, risks, and everything you need to make confident investment decisions.`,
};

const Projects = async ({ searchParams }: SearchParams) => {
	const result = await fetchProjectsByUser({
		pageSize: 6,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="bg-black-dark py-[120px] space-y-10">
			<div className="container">
				<div className="grid lg:grid-cols-[300px,1fr] grid-cols-1 gap-6">
					<div className="filters">
						<ProjectFilter />
					</div>
					<div className="projects space-y-10">
						{result &&
							(result.projects.length > 0 ? (
								<div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-[20px]">
									{result.projects.map((project, index) => (
										<ProjectCard
											key={index}
											data={project}
										/>
									))}
								</div>
							) : (
								<EmptyError
									contentClass={
										'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
									}
									title={'There are no project to show'}
									description={`Whoa! It looks like the project is not exist you are looking for. Reload the full page and try again.`}
									Links={
										<a href="/project">
											<Button className="btn-primary-lg">
												Reload
											</Button>
										</a>
									}
								/>
							))}
						<div className="flex-center">
							<Pagination
								pages={result?.pages ? result.pages : 0}
								containerClass={''}
								prevBtnClass={''}
								nextBtnClass={''}
								paginateBtnClass={
									'border border-primary-gray border-opacity-40 text-white hover:bg-primary-gold'
								}
								paginateActiveClass={
									'bg-primary-gold text-primary-white'
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Projects;
