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
import { usePathname } from 'next/navigation';
import LeftNavbar from '@/app/admin/left-navbar';

const AuthMobileLeftNavbar = () => {
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
				<LeftNavbar />
			</SheetContent>
		</Sheet>
	);
};

export default AuthMobileLeftNavbar;
