'use client';
import { Button } from '@/components/ui/button';
import { useDownloadFile } from '@/lib/hooks/useFile';
import { Download } from 'lucide-react';
import { FC } from 'react';
type CardProps = {
	data: {
		name: string;
		description: string | null;
		status: string;
		file: string | null;
		fileId: string | null;
	};
};
const DownloadFile: FC<CardProps> = ({ data }) => {
	const { mutate: downloadFile, isPending } = useDownloadFile();
	const handleDownload = (file: string | null) => {
		if (file) {
			downloadFile({ fileName: file });
		}
	};

	return (
		<div className="file-card bg-black-dark p-5 rounded-md border border-primary-gray border-opacity-30">
			<div className="grid grid-cols-[1fr,50px]">
				<div className="">
					<h6 className="heading-6 text-gray-muted">{data.name}</h6>
					<p className="text-base-2 text-gray-light">
						{data.description}
					</p>
				</div>
				<div className="flex justify-end">
					<Button
						disabled={isPending}
						className="btn-primary-sm"
						onClick={() => handleDownload(data.file)}
					>
						<Download size={20} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DownloadFile;
