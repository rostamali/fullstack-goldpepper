import GoBack from '@/components/shared/elements/go-back';
import ProjectForm from './project-form';

export const metadata = {
	title: 'Create Project - At Gold & Pepper',
	description: `Empower your business with Gold & Pepper's intuitive platform. Create investment projects effortlessly, backed by industry-specific insights. Start your success journey today.`,
};

const CreateProject = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<div className="flex items-center">
					<GoBack />
					<h3 className="heading-3 text-primary-white">
						New project
					</h3>
				</div>
			</div>
			<ProjectForm
				defaultValues={{
					type: 'CREATE',
					status: '',
					name: '',
					thumbnail: null,
					gallery: null,
					capex: 0,
					totalCost: 0,
					totalRevenue: 0,
					roi: 0,
					closeDate: new Date(),
					documents: null,
					description: { blocks: [] },
				}}
			/>
		</div>
	);
};

export default CreateProject;
