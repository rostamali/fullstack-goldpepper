import { Skeleton } from '@/components/ui/skeleton';

const DetailsLoading = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<Skeleton className="h-[50px] w-[180px] rounded-md bg-black-dark " />
			</div>
			<div className="grid grid-cols-[1fr,350px] max-lg:grid-cols-1 gap-[25px]">
				<Skeleton className="h-[350px] w-full rounded-md bg-black-dark " />
				<Skeleton className="h-[350px] w-full rounded-md bg-black-dark " />
				<div className="lg:col-span-2">
					<div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[25px]">
						<Skeleton className="h-[350px] w-full rounded-md bg-black-dark " />
						<Skeleton className="h-[350px] w-full rounded-md bg-black-dark " />
						<Skeleton className="h-[350px] w-full rounded-md bg-black-dark " />
						<Skeleton className="h-[350px] w-full rounded-md bg-black-dark " />
					</div>
				</div>

				<Skeleton className="lg:col-span-2 h-[350px] w-full rounded-md bg-black-dark " />
			</div>
		</div>
	);
};

export default DetailsLoading;
