'use client';
import FileUploader from '@/components/forms/file-uploader';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useUploadFiles } from '@/lib/hooks/useFile';

const UploadFiles = () => {
	const { mutate: uploadFiles, isPending } = useUploadFiles();
	const handleUploadFiles = async (files: File[]) => {
		const formData = new FormData();
		files.forEach((file) => {
			formData.append('files', file);
		});
		uploadFiles(formData);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg" title="Upload CSV">
					<span>Upload Files</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-black-dark md:max-w-[600px] max-w-[85%] border border-primary-gray border-opacity-30">
				<DialogHeader>
					<DialogTitle className="heading-4 text-primary-white">
						Upload Files
					</DialogTitle>
					<DialogDescription className="text-base-2 text-gray-light">
						Upload files by dragging or clicking to browse. The
						system will handle the upload automatically.
					</DialogDescription>
				</DialogHeader>
				<FileUploader
					isUploading={isPending}
					onChangeFile={(files) => handleUploadFiles(files)}
					containerClass={'border h-[250px] rounded-md mt-[20px]'}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default UploadFiles;
