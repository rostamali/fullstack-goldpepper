import LocalSearch from '@/components/shared/filters/local-search';

const ProjectFilter = () => {
	return (
		<div className="project-filter bg-black-light border border-primary-gray border-opacity-30 relative p-4 rounded-md">
			<h5 className="heading-5 text-gray-light">Filter projects</h5>
			<div className="mt-4">
				<LocalSearch
					route={'/project'}
					iconPosition={'left'}
					placeholder={''}
					containerClass={
						'bg-white border border-primary-gray border-opacity-15 col-span-3'
					}
					inputClass={'h-[50px]'}
					iconClass={''}
				/>
			</div>
		</div>
	);
};

export default ProjectFilter;
