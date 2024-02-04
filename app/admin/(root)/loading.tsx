import { Skeleton } from '@/components/ui/skeleton';

const DashboardLoading = () => {
	return (
		<div className="dashboard-col-space">
			<Skeleton className="h-[50px] w-[180px] rounded-md bg-black-dark " />

			<div className="grid lg:grid-cols-[1fr,350px] grid-cols-1 gap-5">
				<Skeleton className="h-[445px] w-full rounded-md bg-black-dark" />
				<Skeleton className="h-[445px] w-full rounded-md bg-black-dark " />
				<Skeleton className="lg:col-span-2 w-full h-[262px] rounded-md bg-black-dark" />
			</div>
		</div>
	);
};

export default DashboardLoading;
