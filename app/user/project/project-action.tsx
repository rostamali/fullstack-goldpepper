import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { FC } from 'react';
import { PopoverClose } from '@radix-ui/react-popover';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
type ActionProps = {
	id: string;
};

const ProjectAction: FC<ActionProps> = ({ id }) => {
	return (
		<Popover>
			<PopoverTrigger className="mx-auto">
				<MoreHorizontal />
			</PopoverTrigger>
			<PopoverContent className="w-32 bg-white p-1 absolute -right-3 space-y-1">
				<PopoverClose className="menubar-item" asChild>
					<Link href={`/user/project/${id}`}>View details</Link>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	);
};

export default ProjectAction;
