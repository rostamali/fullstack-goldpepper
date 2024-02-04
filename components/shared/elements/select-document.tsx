import { FC, useEffect, useState } from 'react';
import { FileText, Image as IconImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import ModalLibrary from '@/components/shared/modals/modal-library';
type SetDocumentProps = {
	trigger: React.ReactNode;
	modalTitle: string;
	onChange: React.Dispatch<React.SetStateAction<FileSelection[] | null>>;
	frameClass: string;
	thumbClass?: string;
	iconClass?: string;
	selected: FileSelection[];
};

const SelectDocument: FC<SetDocumentProps> = ({
	onChange,
	trigger,
	frameClass,
	modalTitle,
	selected,
	thumbClass,
	iconClass,
}) => {
	const [document, setDocument] = useState<null | FileSelection[]>(null);
	useEffect(() => {
		setDocument(selected);
	}, [selected]);
	return (
		<div className="thumbnail-selection font-poppins">
			<div
				className={`border border-primary-gray border-opacity-15 relative ${frameClass}`}
			>
				{document && document?.length > 0 ? (
					<div className="w-full h-full relative group overflow-hidden">
						<div
							className={`w-full bg-white flex flex-col gap-[10px] items-center justify-center text-center p-[25px]`}
						>
							<FileText
								size={70}
								className="text-action-success"
							/>
							<div className="absolute bg-white w-full bottom-0 p-3 border-t border-primary-gray border-opacity-20">
								<p className="text-base-2">
									{document[0]?.title}
								</p>
							</div>
						</div>
						<div
							className={`absolute duration-150 opacity-0 top-0 backdrop-blur-[2px] left-0 w-full h-full bg-black-dark bg-opacity-40 group-hover:opacity-[1] flex-center ${thumbClass}`}
						>
							<Button
								className="text-white p-0"
								onClick={() => {
									onChange([]);
									setDocument([]);
								}}
							>
								<Trash2 strokeWidth={2.25} />
							</Button>
						</div>
					</div>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<FileText size={50} className="text-primary-gold" />
					</div>
				)}
				<ModalLibrary
					trigger={trigger}
					modalTitle={modalTitle}
					gallery={false}
					onChange={(file) => {
						onChange(file);
						setDocument(file);
					}}
					selected={document}
				/>
			</div>
		</div>
	);
};

export default SelectDocument;
