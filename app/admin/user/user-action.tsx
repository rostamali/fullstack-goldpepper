import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { FC, useState } from 'react';
import { PopoverClose } from '@radix-ui/react-popover';
import { MoreHorizontal } from 'lucide-react';
import UserUpdate from '@/components/shared/modals/user-update';
import { useDeleteAccount } from '@/lib/hooks/useAuth';
type ActionProps = {
	id: string;
	current: string | null;
};

const UserAction: FC<ActionProps> = ({ id, current }) => {
	const [selectId, setSelectId] = useState<string | null>(null);
	const { mutate: deleteAccount, isPending } = useDeleteAccount();
	const banProfile = (ids: string[]) => {
		deleteAccount({
			ids,
			actionType: 'DEACTIVE',
		});
	};
	const deleteProfile = (ids: string[]) => {
		deleteAccount({
			ids,
			actionType: 'DELETE',
		});
	};

	return (
		<div className="w-full text-center">
			<Popover>
				<PopoverTrigger>
					<MoreHorizontal />
				</PopoverTrigger>
				<PopoverContent className="w-32 bg-white p-1 absolute -right-3">
					<PopoverClose className="menubar-item" asChild>
						<button onClick={() => setSelectId(id)}>
							Edit user
						</button>
					</PopoverClose>
					{current && current !== id && (
						<PopoverClose className="menubar-item" asChild>
							<button
								disabled={isPending}
								onClick={() => banProfile([id])}
							>
								Ban user
							</button>
						</PopoverClose>
					)}
					{current && current !== id && (
						<PopoverClose
							className="menubar-item !text-action-danger"
							asChild
						>
							<button
								disabled={isPending}
								onClick={() => deleteProfile([id])}
							>
								Delete user
							</button>
						</PopoverClose>
					)}
				</PopoverContent>
			</Popover>
			{selectId && <UserUpdate id={selectId} onChange={setSelectId} />}
		</div>
	);
};

export default UserAction;
