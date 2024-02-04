import Logo from '../elements/logo';
import ProfileMenu from '../elements/profile-menu';
import AuthMobileLeftNavbar from './auth-mobile-left-navbar';

const AuthHeader = () => {
	return (
		<header className="admin-header bg-black-dark">
			<div className="mx-auto w-full max-w-6xl px-6 sm:px-14">
				<div className="flex items-center justify-between py-5">
					<Logo
						className={
							'md:hidden max-md:w-[40px] max-md:h-[40px] w-[40px] h-[40px]'
						}
					/>
					<div className="max-lg:hidden"></div>
					<div className="flex-center gap-[10px]">
						<ProfileMenu />
						<AuthMobileLeftNavbar />
					</div>
				</div>
			</div>
		</header>
	);
};

export default AuthHeader;
