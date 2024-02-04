'use client';
import { FC } from 'react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { isFileSelected, toggleFileSelection } from '@/lib/formater';
import EmptyError from '../../elements/empty-error';
import FileView from './file-view';
type libraryFile = {
	gallery: boolean;
	files: FileSelection[];
	selected: FileSelection[] | null;
	setItems: (value: FileSelection[] | null) => void;
};
const LibraryFiles: FC<libraryFile> = ({
	files,
	gallery,
	setItems,
	selected,
}) => {
	return (
		<div className="library-files">
			{files.length > 0 ? (
				<div className="grid md:grid-cols-3 grid-cols-2 gap-[25px]">
					{files.map((file, index) => (
						<div
							className="single-file relative cursor-pointer"
							key={index}
							onClick={() => {
								toggleFileSelection(
									file,
									setItems,
									selected,
									gallery,
								);
							}}
						>
							<FileView file={file} heightClass="h-[180px]" />
							<div className="bg-white absolute top-3 right-3 h-[28px] w-[28px] flex-center rounded-full">
								<Checkbox
									className="checkbox-sm !rounded-full"
									checked={isFileSelected(file, selected)}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default LibraryFiles;
