import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
type ServiceCardProps = {
	data: {
		name: string;
		description: string;
		icon: any;
		url?: string;
	};
	link: boolean;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ data, link }) => {
	return (
		<div className="flex flex-col gap-[15px]">
			<div className="h-[45px] w-[45px] bg-primary-gold flex-center rounded-md">
				<data.icon className="text-primary-white" size={25} />
			</div>
			<h3 className="heading-5 text-gray-muted">{data.name}</h3>
			<p className="text-base-2 text-gray-light">{data.description}</p>
			{link && (
				<Link
					href={data.url ? data.url : ''}
					className="text-base-2 text-primary-gold underline"
				>
					Learn more
				</Link>
			)}
		</div>
	);
};

export default ServiceCard;
