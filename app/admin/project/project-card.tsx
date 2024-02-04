import { Button } from '@/components/ui/button';
import { dateFormat } from '@/lib/formater';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
type CardProsp = {
	project: {
		id: string;
		name: string;
		slug: string;
		status: string;
		createdAt: Date;
		thumbnail: {
			url: string;
		} | null;
	};
};

const ProjectCard: FC<CardProsp> = ({ project }) => {
	return (
		<div className="project-card bg-black-dark border border-opacity-10 border-gray-light rounded-md overflow-hidden">
			<Image
				src={
					project.thumbnail
						? `/uploads/files/${project.thumbnail?.url}`
						: '/assets/placeholder.svg'
				}
				alt={''}
				width={500}
				height={500}
				className="w-full object-cover h-[200px]"
			/>
			<div className="p-4 space-y-2">
				<h5 className="heading-5 text-primary-white">{project.name}</h5>
				<div className="grid grid-cols-2 gap-[20px]">
					{[1, 2, 3, 4].map((item, index) => (
						<div key={index}>
							<p className="font-poppins text-[14px] text-white">
								Close date
							</p>
							<span className="font-poppins text-[12px] text-gray-dark">
								12 Nov 2023
							</span>
						</div>
					))}
				</div>
				<div className="flex items-center justify-between">
					<Link href={`/admin/project/edit?project_id=${project.id}`}>
						<Button className="badge-success">Edit</Button>
					</Link>
					<Link href="">
						<Button className="badge-danger">Delete</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
