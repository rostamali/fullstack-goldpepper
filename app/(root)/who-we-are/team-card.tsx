'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TeamMembers } from '@/constants/content';
import Image from 'next/image';
import { FC, useState } from 'react';
type CardProps = {
	name: string;
	title: string;
	description: string;
	index: number;
	thumbnail: string;
};

const TeamCard: FC<CardProps> = ({
	name,
	title,
	description,
	index,
	thumbnail,
}) => {
	const [showFullDescription, setShowFullDescription] = useState(
		Array(TeamMembers.length).fill(false),
	);

	const toggleDescription = (index: number) => {
		const newShowFullDescription = [...showFullDescription];
		newShowFullDescription[index] = !newShowFullDescription[index];
		setShowFullDescription(newShowFullDescription);
	};
	return (
		<div className="flex flex-col gap-[20px] items-center text-center">
			<Image
				src={`/assets/team/${thumbnail}`}
				alt={name}
				width={1280}
				height={1920}
				className="object-cover w-[150px] h-[150px] object-top rounded-full"
			/>
			<div className="member-info">
				<h4 className="heading-4 text-primary-white">{name}</h4>
				<span className="text-base-1 text-gray-light">{title}</span>
			</div>
			<p className="text-base-2 text-gray-muted">
				{showFullDescription[index]
					? description
					: `${description.slice(0, 120)}...`}
			</p>
			<Badge
				onClick={() => toggleDescription(index)}
				className="border-[2px] border-primary-gray text-base-2 border-opacity-40 text-gray-muted py-1 px-2 cursor-pointer"
			>
				{showFullDescription[index] ? 'Read Less' : 'Read More'}
			</Badge>
		</div>
	);
};

export default TeamCard;
