import AdminAuth from '@/components/auth/admin-auth';
import Logo from '@/components/shared/elements/logo';
import AuthHeader from '@/components/shared/headers/auth-header';
import LeftNavbar from './left-navbar';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="font-poppins">
			<AdminAuth>
				<div className="bg-black-light relative w-full">
					<div className="flex-1 md:grid grid-cols-[266px_minmax(0,1fr)] max-lg:grid-cols-[100px_minmax(0,1fr)]">
						<section className="bg-black-dark sticky left-0 top-0 px-6 pt-5 flex h-screen flex-col overflow-y-auto max-md:hidden">
							<Logo className="w-[50px] h-[50px]" />
							<LeftNavbar />
						</section>
						<section>
							<AuthHeader />
							<div className="mx-auto w-full max-w-6xl px-6 sm:px-14 py-16">
								{children}
							</div>
						</section>
					</div>
				</div>
			</AdminAuth>
		</main>
	);
}
