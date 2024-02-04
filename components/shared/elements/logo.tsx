import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
type LogoProps = {
	url?: string;
	className: string;
};
const Logo: FC<LogoProps> = ({ url, className }) => {
	return (
		<Link href={url ? url : '/'}>
			<Image
				src={'/assets/black-logo.png'}
				alt={'Gold & Pepper'}
				width={500}
				height={500}
				className={`${className} invert-[100%]`}
			/>
		</Link>
	);
};

export default Logo;
