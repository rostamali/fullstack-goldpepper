import RootFooter from '@/components/shared/headers/root-footer';
import RootHeader from '@/components/shared/headers/root-header';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<RootHeader />
			<main className="bg-primary-gray">
				<div className="container flex items-center justify-center py-[100px]">
					<div className="w-[450px] bg-black-light px-[25px] py-[40px] rounded-md">
						{children}
					</div>
				</div>
			</main>
			<RootFooter />
		</>
	);
}
