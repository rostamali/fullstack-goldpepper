'use client';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import Logo from '../elements/logo';
import { RootLinks } from '@/constants';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
type Auth = {
	id: string;
	role: 'ADMIN' | 'USER' | 'MANAGER';
};
type BarProps = {
	isAuth: Auth | undefined;
};
const RootMobileNavbar: FC<BarProps> = ({ isAuth }) => {
	const pathname = usePathname();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="text-primary-white lg:hidden block p-0">
					<Menu size={25} />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				className=" xm:w-[280px] w-[260px] bg-black-light border-0"
			>
				<div className="flex items-start">
					<SheetClose asChild>
						<Logo className={'w-[60px] h-[60px]'} />
					</SheetClose>
				</div>
				<ul className="py-[60px] space-y-3">
					{RootLinks.map((item, index) => (
						<li key={index}>
							<SheetClose asChild>
								<Link
									href={item.url}
									className={`btn-navlink ${
										pathname === item.url
											? 'btn-navlink-active'
											: ''
									}`}
								>
									{item.label}
								</Link>
							</SheetClose>
						</li>
					))}
				</ul>
				{isAuth ? (
					<SheetClose asChild>
						<Link
							className="w-full"
							href={isAuth.role === 'ADMIN' ? '/admin' : '/user'}
						>
							<Button className="btn-primary-sm w-full">
								My Account
							</Button>
						</Link>
					</SheetClose>
				) : (
					<SheetClose asChild>
						<Link href="/auth/login" className="w-full">
							<Button className="btn-primary-sm w-full">
								Sign in
							</Button>
						</Link>
					</SheetClose>
				)}
			</SheetContent>
		</Sheet>
	);
};

export default RootMobileNavbar;
