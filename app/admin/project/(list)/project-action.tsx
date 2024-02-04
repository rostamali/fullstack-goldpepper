'use client';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { FC } from 'react';
import { PopoverClose } from '@radix-ui/react-popover';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useDeleteProject } from '@/lib/hooks/useProject';
type ActionProps = {
	id: string;
};

const ProjectAction: FC<ActionProps> = ({ id }) => {
	const { mutate: deleteProject, isPending } = useDeleteProject();

	return (
		<Popover>
			<PopoverTrigger className="mx-auto">
				<MoreHorizontal />
			</PopoverTrigger>
			<PopoverContent className="w-32 bg-white p-1 absolute -right-3 space-y-1">
				<PopoverClose className="menubar-item" asChild>
					<Link href={`/admin/project/edit?project_id=${id}`}>
						Edit project
					</Link>
				</PopoverClose>
				<PopoverClose className="menubar-item" asChild>
					<Link href={`/admin/project/info?project_id=${id}`}>
						Project info
					</Link>
				</PopoverClose>
				<PopoverClose className="menubar-item" asChild>
					<Link href={`/admin/project/details?project_id=${id}`}>
						View details
					</Link>
				</PopoverClose>
				<PopoverClose
					className="menubar-item !text-action-danger"
					asChild
				>
					<button
						disabled={isPending}
						onClick={() => {
							deleteProject({
								projectId: id,
							});
						}}
					>
						Delete project
					</button>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	);
};

export default ProjectAction;
