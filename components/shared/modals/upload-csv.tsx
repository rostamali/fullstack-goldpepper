'use client';
import { Button } from '@/components/ui/button';
import Papa from 'papaparse';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { FC, useState } from 'react';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { ToastError } from '../elements/custom-toast';
import FileUploader from '@/components/forms/file-uploader';
import { useUploadProject, useUploadUser } from '@/lib/hooks/useCSV';
type CsvProps = {
	type: 'USER' | 'PROJECT';
};

const UploadCSV: FC<CsvProps> = ({ type }) => {
	const [isPending, setIsPending] = useState(false);
	const { mutate: uploadUser } = useUploadUser();
	const { mutate: uploadProject } = useUploadProject();

	const handleUploadCsv = (files: File[]) => {
		setIsPending(true);
		const csvFiles = files.find((file) => file.type === 'text/csv');
		if (csvFiles) {
			Papa.parse(csvFiles, {
				header: true,
				skipEmptyLines: true,
				complete: async function (value) {
					if (type === 'USER') {
						uploadUser(value.data as CSVUser[], {
							onSuccess: () => {
								setIsPending(false);
							},
						});
					} else if (type === 'PROJECT') {
						uploadProject(value.data as CSVProject[], {
							onSuccess: () => {
								setIsPending(false);
							},
						});
					}
				},
			});
		} else {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError toastNumber={t} content={`Upload CSV file only`} />
			));
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg" title="Upload CSV">
					<Upload strokeWidth={1.5} size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-black-dark md:max-w-[450px] max-w-[85%] border border-primary-gray border-opacity-30">
				<DialogHeader>
					<DialogTitle className="heading-4 text-primary-white">
						Upload CSV
					</DialogTitle>
					<DialogDescription className="text-base-2 text-gray-dark">
						Import list of data from CSV files.
					</DialogDescription>
				</DialogHeader>
				<FileUploader
					isUploading={isPending}
					onChangeFile={(files) => handleUploadCsv(files)}
					containerClass={
						'border-2 border-primary-gray border-opacity-40 h-[180px] rounded-md'
					}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default UploadCSV;
