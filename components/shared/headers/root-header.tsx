import Link from 'next/link';
import RootMobileNavbar from './root-mobile-navbar';
import Logo from '../elements/logo';
import { RootLinks } from '@/constants';
import RootHeaderLink from './root-header-link';
import { isAuthenticated } from '@/server/actions/auth.action';
import { Button } from '@/components/ui/button';

const RootHeader = async () => {
	const isAuth = await isAuthenticated();

	return (
		<header id="header" className="py-[20px] bg-primary-gray">
			<div className="container">
				<div className="flex items-center justify-between">
					<Logo className={'w-[60px] h-[60px]'} />
					<div className="flex items-center gap-[10px] flex-1 justify-end">
						<ul className="lg:flex items-center gap-[25px] hidden">
							{RootLinks.map((link, index) => (
								<RootHeaderLink
									key={index}
									url={link.url}
									label={link.label}
								/>
							))}
						</ul>
						{isAuth ? (
							<Link
								href={
									isAuth.role === 'ADMIN' ? '/admin' : '/user'
								}
							>
								<Button className="lg:block hidden btn-primary-sm">
									My Account
								</Button>
							</Link>
						) : (
							<div className="lg:block hidden">
								<Link href="/auth/login">
									<Button className="btn-primary-sm">
										Sign in
									</Button>
								</Link>
							</div>
						)}
						<RootMobileNavbar isAuth={isAuth} />
					</div>
				</div>
			</div>
		</header>
	);
};

export default RootHeader;
