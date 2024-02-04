'use client';
import { FC } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import FileDetailScreen from '@/components/shared/loading/file-details-screen';
import { UserRoleFormat, dateFormat } from '@/lib/formater';
import { useFileDetails } from '@/lib/hooks/useFile';
import EmptyError from '@/components/shared/elements/empty-error';
import DetailsFileView from './details-file-view';
import FileCompress from '@/components/forms/file-compress';
type FileDetailsProps = {
	fileId: string;
	onChange: (val: string | null) => void;
};

const FileDetails: FC<FileDetailsProps> = ({ fileId, onChange }) => {
	const { data, isLoading } = useFileDetails(fileId as string);

	return (
		<Dialog
			open={fileId ? true : false}
			onOpenChange={() => onChange(null)}
		>
			<DialogContent className="bg-black-dark max-w-[650px] max-md:w-[95%] max-md:h-[500px] max-md:overflow-y-scroll border-0">
				{!isLoading ? (
					data ? (
						<div className="file-details">
							<div>
								<h4 className="heading-4 text-primary-white">
									File Details
								</h4>
								<div className="text-base-2 text-gray-light">
									{data?.title}
								</div>
							</div>
							<div className="grid md:grid-cols-2 grid-cols-1 gap-[25px] items-center my-[30px]">
								<div className="flex flex-col gap-[10px]">
									<DetailsFileView file={data} />
								</div>
								<div className="file-info-wrap">
									<div className="grid grid-cols-2 gap-[20px]">
										<div className="file-info">
											<h6 className="heading-6 text-primary-white">
												Size:
											</h6>
											<p className="text-base-2 mt-[4px] text-gray-dark">
												<span className="badge-info">
													{data?.size}
												</span>
											</p>
										</div>
										<div className="file-info">
											<h6 className="heading-6 text-primary-white">
												Uploaded date:
											</h6>
											<p className="text-base-2 mt-[4px] text-gray-dark">
												{dateFormat(data?.createdAt)}
											</p>
										</div>
										<div className="file-info">
											<h6 className="heading-6 text-primary-white">
												Compress:
											</h6>
											<p className="text-base-2 mt-[4px] text-gray-dark">
												{data?.isCompress
													? 'True'
													: 'False'}
											</p>
										</div>
										<div className="file-info">
											<h6 className="heading-6 text-primary-white">
												Quality %:
											</h6>
											<p className="text-base-s mt-[4px] text-gray-dark">
												<span className="badge-info">
													{data?.compressPercent
														? `${data?.compressPercent}%`
														: '0%'}
												</span>
											</p>
										</div>
									</div>
									<div className="mt-[20px]">
										<h6 className="heading-6 text-primary-white">
											Actions:
										</h6>
										<div className="flex items-center gap-[5px] mt-[5px]">
											<FileCompress fileId={data?.id} />
										</div>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-[5px]">
									<div className="h-[45px] w-[45px] bg-primary-gray rounded-full"></div>
									<div className="flex flex-col gap-[4px]">
										<p className="text-base-1 text-white">
											{data.author.firstName}
										</p>
										<span className="text-base-2 text-gray-dark">
											{UserRoleFormat[data.author.role]}
										</span>
									</div>
								</div>
								<Button className="btn-primary-sm">
									Delete
								</Button>
							</div>
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
									<Button className="btn-primary-lg">
										Reload
									</Button>
								</a>
							}
						/>
					)
				) : (
					<FileDetailScreen />
				)}
			</DialogContent>
		</Dialog>
	);
};

export default FileDetails;
