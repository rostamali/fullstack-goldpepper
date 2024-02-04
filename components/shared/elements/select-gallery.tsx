import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import { Image as IconImage } from 'lucide-react';
import ModalLibrary from '@/components/shared/modals/modal-library';

type GalleryProps = {
	onChange: React.Dispatch<React.SetStateAction<FileSelection[] | null>>;
	frameClass: string;
	thumbClass?: string;
	iconClass?: string;
	selected: FileSelection[] | null;
	defaultTrigger: string;
};

const SelectGallery: FC<GalleryProps> = ({
	onChange,
	selected,
	frameClass,
	thumbClass,
	defaultTrigger,
	iconClass,
}) => {
	const [gallery, setGallery] = useState<FileSelection[] | null>(null);
	const handleRemovedGallery = (file: FileSelection) => {
		if (gallery) {
			const filterFile = gallery.filter((item) => item.id !== file.id);
			setGallery(filterFile.length === 0 ? null : filterFile);
			onChange(filterFile.length === 0 ? null : filterFile);
		} else {
			setGallery(null);
		}
	};
	useEffect(() => {
		setGallery(selected);
	}, [gallery]);

	return (
		<div className="set-gallery relative">
			{gallery && gallery.length > 0 && (
				<div className={frameClass}>
					{gallery.map((file, index) => (
						<div
							className={`relative group overflow-hidden ${thumbClass}`}
							key={index}
						>
							<Image
								src={`/uploads/files/${file.url}`}
								alt={file.title}
								width={500}
								height={500}
								className={`w-full h-full object-cover`}
							/>
							<div className="absolute opacity-0 w-full h-full top-0 left-0 backdrop-blur-[2px] bg-black-dark bg-opacity-20 flex flex-col items-center justify-center gap-[10px] duration-150 group-hover:opacity-[1] text-white">
								<Button
									type="button"
									onClick={() => handleRemovedGallery(file)}
								>
									<Trash2 strokeWidth={2.25} />
								</Button>
							</div>
						</div>
					))}
					{gallery && gallery.length > 0 && (
						<ModalLibrary
							trigger={<GalleryTrigger className={thumbClass} />}
							modalTitle={'Select gallery'}
							gallery={true}
							onChange={(file) => {
								onChange(file);
								setGallery(file);
							}}
							selected={gallery}
						/>
					)}
				</div>
			)}
			{!gallery && (
				<ModalLibrary
					trigger={
						<Button className="badge-success mt-2" type="button">
							Select gallery
						</Button>
					}
					modalTitle={'Select gallery'}
					gallery={true}
					onChange={(file) => {
						onChange(file);
						setGallery(file);
					}}
					selected={gallery}
				/>
			)}
		</div>
	);
};

const GalleryTrigger = ({ className }: { className: string | undefined }) => {
	return (
		<div className={`flex-center ${className}`}>
			<div className="flex flex-col items-center gap-[10px]">
				<span className="text-base-2">Add more</span>
			</div>
		</div>
	);
};
export default SelectGallery;
