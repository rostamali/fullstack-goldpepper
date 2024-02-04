'use client';
import EmptyError from '@/components/shared/elements/empty-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { isChecked, toggleSelectList } from '@/lib/formater';
import { useState } from 'react';
import FileView from './file-view';
import FileDetails from './file-details';
import LocalSearch from '@/components/shared/filters/local-search';
import SelectFilter from '@/components/shared/filters/select-filter';
import { FileTypes } from '@/constants';
import UploadFiles from '@/components/shared/modals/upload-files';
import { FC } from 'react';
import Pagination from '@/components/shared/filters/pagination';
import { useDeleteFiles } from '@/lib/hooks/useFile';
import Spinner from '@/components/shared/elements/spinner';
type LibraryProps = {
	files: {
		id: string;
		fileType: string;
		fileName: string;
		title: string;
		description: string | null;
		url: string;
	}[];
	pages: number;
};

const FileLibrary: FC<LibraryProps> = ({ files, pages }) => {
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
	const [view, setView] = useState<string | null>(null);
	const { mutate: deleteFiles, isPending } = useDeleteFiles();

	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<h3 className="heading-3 text-primary-white">Files</h3>
				<UploadFiles />
			</div>
			<div className="library-header">
				<div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-[40px] gap-[20px]">
					<div className="lg:col-span-2 flex items-center gap-[15px]">
						<Button
							className="btn-primary-lg"
							disabled={
								isPending
									? true
									: selectedItems
									? selectedItems.length > 0
										? false
										: true
									: true
							}
							onClick={() => {
								if (selectedItems) {
									deleteFiles(selectedItems);
									setSelectedItems(null);
								}
							}}
						>
							{isPending && (
								<Spinner className="w-[20px] h-[20px] stroke-white" />
							)}
							Delete Selected
						</Button>
					</div>
					<div className="lg:col-span-3 w-full xm:flex xm:items-center xm:justify-between xm:gap-[15px]">
						<div className="flex-1 grid grid-cols-5 items-center gap-[15px]">
							<LocalSearch
								route={'/admin/files'}
								iconPosition={'left'}
								placeholder={''}
								containerClass={
									'bg-white border border-primary-gray border-opacity-15 col-span-3'
								}
								inputClass={'h-[50px]'}
								iconClass={''}
							/>
							<div className="col-span-2">
								<SelectFilter
									filterKey={'type'}
									placeholder={'Filter by type'}
									triggerClass={'input-field-lg bg-white'}
									contentClass={'bg-white'}
									options={FileTypes}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{files.length > 0 ? (
				<div className="grid lg:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-[25px]">
					{files.map((item, index) => (
						<div className="single-card relative" key={index}>
							<FileView
								file={item}
								heightClass={'h-[220px] max-sm:h-[160px]'}
								onView={setView}
							/>
							<div className="bg-white absolute top-3 right-3 h-[28px] w-[28px] flex-center rounded-full">
								<Checkbox
									className="checkbox-sm !rounded-full"
									onClick={() =>
										toggleSelectList(
											selectedItems,
											setSelectedItems,
											item.id,
										)
									}
									checked={isChecked(selectedItems, item.id)}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<EmptyError
					contentClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					title={'There are no files to show'}
					description={`Whoa! It looks like the files directory is currently empty. 📂 No files are present in this location.`}
					Links={
						<a href="/admin/files">
							<Button className="btn-primary-lg">Reload</Button>
						</a>
					}
				/>
			)}
			<div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-[15px]">
				<div className="text-base-1"></div>
				<Pagination
					pages={pages}
					containerClass={''}
					prevBtnClass={''}
					nextBtnClass={''}
					paginateBtnClass={
						'border border-primary-gray border-opacity-40 text-white hover:bg-primary-gold'
					}
					paginateActiveClass={'bg-primary-gold text-primary-white'}
				/>
			</div>
			{view && <FileDetails fileId={view} onChange={setView} />}
		</div>
	);
};

export default FileLibrary;
