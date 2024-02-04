import { Skeleton } from '@/components/ui/skeleton';

const CompanyLoading = () => {
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<Skeleton className="h-[45px] w-[120px] rounded-md bg-black-dark " />
				<Skeleton className="h-[50px] xm:w-[140px] max-xm:w-[100px] rounded-md bg-black-dark " />
			</div>
			<div className="space-y-6">
				{[1, 2, 3, 4, 5, 6, 7].map((item) => (
					<Skeleton
						key={item}
						className="h-[50px] w-full rounded-md bg-black-dark "
					/>
				))}
			</div>
		</div>
	);
};

export default CompanyLoading;
