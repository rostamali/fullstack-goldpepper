import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="min-h-screen bg-black-light flex-center flex-col">
			<div className="sm:w-[550px] w-full flex flex-col items-center justify-center gap-[20px] text-center px-[20px]">
				<span className="heading-5 text-gray-light">Oops!</span>
				<h2 className="heading-2 text-primary-white">404</h2>
				<p className="text-base-2 text-gray-muted">
					The page you are looking for might be removed or temporally
					unavailable
				</p>
				<Link href="/">
					<Button className="btn-primary-lg">Return Home</Button>
				</Link>
			</div>
		</div>
	);
}
