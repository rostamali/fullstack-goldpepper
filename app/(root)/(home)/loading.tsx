import Spinner from '@/components/shared/elements/spinner';

const HomeLoading = () => {
	return (
		<div className="flex-center bg-black-dark min-h-[450px]">
			<Spinner className={'h-[35px] w-[35px] stroke-gray-muted'} />
		</div>
	);
};

export default HomeLoading;
