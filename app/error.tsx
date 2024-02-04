'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="min-h-screen bg-black-light flex-center flex-col">
			<div className="sm:w-[550px] w-full flex flex-col items-center justify-center gap-[20px] text-center px-[20px]">
				<span className="heading-5 text-gray-light">
					There was a problem
				</span>
				<h2 className="heading-2 text-primary-white">
					{error.message ? error.message : 'Something went wrong'}
				</h2>
				<p className="text-base-2 text-gray-muted">
					Please try again later or contact our support if the problem
					persists.
				</p>
				<Link href="/">
					<Button className="btn-primary-lg">Return Home</Button>
				</Link>
			</div>
		</div>
	);
}
