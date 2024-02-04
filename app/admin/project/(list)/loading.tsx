import { Skeleton } from '@/components/ui/skeleton';

const ProjectLoading = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<Skeleton className="h-[50px] w-[120px] rounded-md bg-black-dark " />
				<Skeleton className="h-[50px] w-[120px] rounded-md bg-black-dark " />
			</div>
			<div className="file-library dashboard-col-space">
				<div className="library-header">
					<div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-[40px] gap-[20px]">
						<div className="lg:col-span-2 flex items-center gap-[15px]">
							<Skeleton className="h-[50px] w-[50%] max-sm:w-full rounded-md bg-black-dark " />
						</div>
						<div className="lg:col-span-3 w-full xm:flex xm:items-center xm:justify-between xm:gap-[15px]">
							<div className="flex-1 grid grid-cols-5 items-center gap-[15px]">
								<div className="col-span-3">
									<Skeleton className="h-[50px] w-full rounded-md bg-black-dark " />
								</div>
								<div className="col-span-2">
									<Skeleton className="h-[50px] w-full rounded-md bg-black-dark " />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="space-y-3">
				{[1, 2, 3, 4, 5, 6].map((item) => (
					<Skeleton
						className="h-[80px] w-full rounded-md bg-black-dark "
						key={item}
					/>
				))}
			</div>
			<div className="flex justify-end">
				<Skeleton className="h-[50px] w-[120px] rounded-md bg-black-dark" />
			</div>
		</div>
	);
};

export default ProjectLoading;
