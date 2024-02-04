import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="min-h-screen bg-black-light flex-center flex-col">
			<div className="md:w-[650px] w-full flex flex-col items-center justify-center gap-[20px] text-center px-[20px]">
				<h2 className="heading-2 text-primary-white">
					Oops! This Page Can't Be Found.
				</h2>
				<p className="text-base-1 text-gray-muted">
					It looks like you've discovered an uncharted territory.
					<br />
					<br />
					We're sorry, but the page you're looking for seems to have
					been moved, deleted, or perhaps it never existed. But don't
					worry, this isn't the end of the road!
				</p>
				<Link href="/">
					<Button className="btn-primary-lg">Return Home</Button>
				</Link>
			</div>
		</div>
	);
}
