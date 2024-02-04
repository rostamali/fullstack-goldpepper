import { fetchProjectById } from '@/server/actions/project.action';
import ProjectForm from '../create/project-form';
import GoBack from '@/components/shared/elements/go-back';
import { Button } from '@/components/ui/button';
import EmptyError from '@/components/shared/elements/empty-error';
import Link from 'next/link';
export const metadata = {
	title: 'Update Project - At Gold & Pepper',
	description: `Empower your business with Gold & Pepper's intuitive platform. Create investment projects effortlessly, backed by industry-specific insights. Start your success journey today.`,
};

type SearchParams = {
	searchParams: {
		project_id: string;
	};
};

const UpdateProject = async ({ searchParams }: SearchParams) => {
	const result = await fetchProjectById({
		id: searchParams.project_id,
	});
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<div className="flex items-center">
					<GoBack />
					<h3 className="heading-3 text-primary-white">
						Update project
					</h3>
				</div>
			</div>
			{result ? (
				<ProjectForm
					defaultValues={{
						type: 'UPDATE',
						status: result.status,
						name: result?.name,
						description: result?.description,
						thumbnail: result?.thumbnail,
						gallery: result?.gallery,
						capex: result?.capex,
						totalCost: result?.totalCost,
						totalRevenue: result?.totalRevenue,
						roi: result?.roi,
						closeDate: result?.closeDate,
						documents: result.documents ? result.documents : null,
					}}
					id={result.id}
				/>
			) : (
				<EmptyError
					contentClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					title={'There are no projects to show'}
					description={`Oops! Currently, there are no projects to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
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

export default UpdateProject;
