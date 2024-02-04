import { FileText } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
type FileProps = {
	file: FileLibraryType;
};

const DetailsFileView: FC<FileProps> = ({ file }) => {
	return (
		<div className="file-view rounded-md overflow-hidden relative group border border-primary-gray border-opacity-10">
			{file.fileType === 'image' && (
				<Image
					src={`/uploads/files/${file?.url}`}
					alt={file?.title}
					priority={true}
					width={1240}
					height={750}
					className={`object-cover h-[220px]`}
				/>
			)}
			{file.fileType === 'application' && (
				<div
					className={`h-[220px] w-full bg-white flex flex-col gap-[10px] items-center justify-center text-center p-[25px]`}
				>
					<FileText size={70} className="text-action-success" />
					<div className="absolute bg-white w-full bottom-0 p-3 border-t border-primary-gray border-opacity-20">
						<p className="text-base-2">{file.title}</p>
					</div>
				</div>
			)}
			{file.fileType === 'text' && (
				<div
					className={`h-[220px] w-full bg-white flex flex-col gap-[10px] items-center justify-center text-center p-[25px]`}
				>
					<FileText size={70} className="text-action-success" />
					<div className="absolute bg-white w-full bottom-0 p-3 border-t border-primary-gray border-opacity-20">
						<p className="text-base-2">{file.title}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default DetailsFileView;
