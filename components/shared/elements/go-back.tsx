'use client';
import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GoBack = () => {
	const router = useRouter();
	return (
		<button
			type="button"
			onClick={() => router.back()}
			className="text-gray-light"
		>
			<ArrowBigLeft size={18} />
		</button>
	);
};

export default GoBack;
