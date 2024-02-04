'use client';
interface ModalLibraryProps {
	trigger: React.ReactNode;
	modalTitle: string;
	gallery: boolean;
	onChange: React.Dispatch<React.SetStateAction<FileSelection[] | null>>;
	selected: FileSelection[] | null;
}
import { Button } from '@/components/ui/button';
import { FC, useEffect, useState } from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import LibraryFiles from './library-files';
import { useLoadFiles } from '@/lib/hooks/useFile';

const ModalLibrary: FC<ModalLibraryProps> = ({
	modalTitle,
	gallery,
	onChange,
	selected,
	trigger,
}) => {
	const {
		data: library,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useLoadFiles(null, null);
	const [items, setItems] = useState<FileSelection[] | null>(null);
	useEffect(() => {
		setItems(selected);
	}, [selected]);

	return (
		<Dialog>
			<DialogTrigger>{trigger}</DialogTrigger>
			<DialogContent className="xl:max-w-[1000px] max-w-[95%] bg-black-dark border border-gray-muted border-opacity-15">
				{!isLoading && library ? (
					<>
						<DialogHeader>
							<DialogTitle>
								<div className="heading-4 text-primary-white">
									{modalTitle}
								</div>
							</DialogTitle>
							<DialogDescription>
								<span className="text-base-2 text-gray-dark">
									Upload files by dragging or clicking to
									browse. The system will handle the upload
									automatically.
								</span>
							</DialogDescription>
						</DialogHeader>
						<div className="modal-library-container my-[25px]">
							<div className="flex flex-col gap-[25px]">
								{library?.pages.map((files, index) => (
									<LibraryFiles
										files={files}
										selected={items}
										setItems={setItems}
										gallery={gallery}
										key={index}
									/>
								))}
							</div>
							<div className="flex-center mt-[15px]">
								<Button
									className="btn-primary-sm"
									onClick={() => fetchNextPage()}
									disabled={hasNextPage ? false : true}
								>
									{isFetchingNextPage
										? 'Loading more...'
										: hasNextPage
										? 'Load more'
										: 'Nothing to load'}
								</Button>
							</div>
						</div>
						<div className="flex items-center justify-between gap-[15px]">
							<div className="text-base-2 text-primary-white">
								{items ? items.length : 0} file(s) selected.
							</div>
							<DialogClose asChild>
								<Button
									type="button"
									className="btn-primary-sm"
									onClick={() => onChange(items)}
								>
									Insert
								</Button>
							</DialogClose>
						</div>
					</>
				) : (
					<h3>Loading......</h3>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default ModalLibrary;
