import { Skeleton } from '@/components/ui/skeleton';

const ProjectFormLoading = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<Skeleton className="h-[50px] w-[180px] rounded-md bg-black-dark " />
			</div>
			<div className="space-y-6">
				<div className="grid lg:grid-cols-[1fr,300px] gap-[25px]">
					<div className="form-flex-space">
						<div>
							<Skeleton className="h-[21px] w-[160px] rounded-md bg-black-dark " />
							<Skeleton className="h-[45px] w-full rounded-md bg-black-dark mt-2" />
						</div>
						<div>
							<Skeleton className="h-[45px] max-sm:w-full sm:w-[60%] rounded-md bg-black-dark" />
						</div>
						<div className="grid grid-cols-2 gap-[25px]">
							{[1, 2, 3, 4].map((item) => (
								<div key={item}>
									<Skeleton className="h-[21px] w-[160px] rounded-md bg-black-dark " />
									<Skeleton className="h-[45px] w-full rounded-md bg-black-dark mt-2" />
								</div>
							))}
						</div>
					</div>
					<div className="form-sidebar form-flex-space">
						<div>
							<Skeleton className="h-[21px] w-[160px] rounded-md bg-black-dark " />
							<Skeleton className="h-[45px] w-full rounded-md bg-black-dark mt-2" />
						</div>
						<div>
							<Skeleton className="h-[21px] w-[160px] rounded-md bg-black-dark " />
							<Skeleton className="h-[45px] w-full rounded-md bg-black-dark mt-2" />
						</div>
						<div>
							<Skeleton className="h-[21px] w-[160px] rounded-md bg-black-dark " />
							<Skeleton className="h-[158px] w-full rounded-md bg-black-dark my-2" />
							<Skeleton className="h-[18px] w-[140px] rounded-md bg-black-dark " />
						</div>
					</div>
				</div>
				<div>
					<Skeleton className="h-[21px] w-[160px] rounded-md bg-black-dark " />
					<Skeleton className="h-[440px] w-full rounded-md bg-black-dark mt-2" />
				</div>
				<div className="flex justify-end">
					<Skeleton className="h-[50px] w-[140px] rounded-md bg-black-dark" />
				</div>
			</div>
			{/* <ProjectForm
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
         description: [{}],
      }}
   /> */}
		</div>
	);
};

export default ProjectFormLoading;
