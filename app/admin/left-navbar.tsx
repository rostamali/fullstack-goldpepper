'use client';
import { AdminLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LeftNavbar = () => {
	const pathname = usePathname();
	return (
		<ul className="mt-[40px] flex flex-col gap-[10px]">
			{AdminLinks.map((link, index) => (
				<li key={index}>
					<Link
						href={`${link.url}`}
						className={`btn-navlink ${
							pathname === link.url
								? 'btn-navlink-active shadow-sm'
								: ''
						}`}
					>
						<link.icon className="h-[20px]" strokeWidth={1.5} />
						<span className="max-lg:hidden max-md:block">
							{link.label}
						</span>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default LeftNavbar;
