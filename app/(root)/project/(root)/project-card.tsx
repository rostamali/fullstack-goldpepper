import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
type CardProsp = {
	data: {
		name: string;
		slug: string;
		capex: number;
		totalRevenue: number;
		totalCost: number;
		closeDate: Date;
		thumbnail: {
			url: string;
		} | null;
	};
};

const ProjectCard: FC<CardProsp> = ({ data }) => {
	const maxLength = 30;
	const handleSliceName = (name: string) => {
		const truncatedName =
			name.length > maxLength
				? `${name.substring(0, maxLength)}...`
				: name;
		return truncatedName;
	};

	return (
		<div className="project-card bg-black-light border border-primary-gray border-opacity-30 relative group p-4 rounded-md overflow-hidden">
			<Image
				src={
					data.thumbnail
						? `/uploads/files/${data.thumbnail.url}`
						: '/assets/placeholder.svg'
				}
				alt={data.name}
				width={500}
				height={500}
				className="w-full object-cover h-[180px] rounded"
			/>
			<div className="py-5 space-y-3">
				<h6 className="heading-6 text-primary-gold">
					{handleSliceName(data.name)}
				</h6>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<p className="text-base-2 text-primary-white">
							Revenue
						</p>
						<p className="text-base-2 !text-[12px] text-gray-muted">
							{data.totalRevenue}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-base-2 text-primary-white">
							Total cost
						</p>
						<p className="text-base-2 !text-[12px] text-gray-muted">
							{data.totalCost}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-base-2 text-primary-white">Capex</p>
						<p className="text-base-2 !text-[12px] text-gray-muted">
							{data.capex}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-base-2 text-primary-white">Closed</p>
						<p className="text-base-2 !text-[12px] text-gray-muted">
							12 Jan 2023
						</p>
					</div>
				</div>
			</div>

			<div className="absolute bg-black-dark bg-opacity-60 backdrop-blur-sm w-full h-full top-0 left-0 flex-center opacity-0 hidden group-hover:opacity-100 group-hover:flex">
				<Link href={`/project/${data.slug}`}>
					<Badge className="px-4 py-2 text-base-1 border border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-gray-light">
						<span>View now</span>
					</Badge>
				</Link>
			</div>
		</div>
	);
};

export default ProjectCard;
