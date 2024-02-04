'use client';
import Link from 'next/link';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
type LinkProps = {
	url: string;
	label: string;
};

const RootHeaderLink: FC<LinkProps> = ({ url, label }) => {
	const pathname = usePathname();

	return (
		<li>
			<Link
				href={url}
				className={`font-poppins text-[15px] ${
					pathname === url
						? 'text-primary-gold font-medium'
						: 'text-primary-white font-light'
				}`}
			>
				{label}
			</Link>
		</li>
	);
};

export default RootHeaderLink;
