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
import { useDeleteInterest } from '@/lib/hooks/useInvest';
import ViewDetails from './view-details';
type ActionProps = {
	id: string;
};

const InvestorAction: FC<ActionProps> = ({ id }) => {
	const [selectId, setSelectId] = useState<string | null>(null);
	const { mutate: deleteData, isPending } = useDeleteInterest();

	return (
		<div className="w-full text-center">
			<Popover>
				<PopoverTrigger>
					<MoreHorizontal />
				</PopoverTrigger>
				<PopoverContent className="w-32 bg-white p-1 absolute -right-3">
					<PopoverClose className="menubar-item" asChild>
						<button onClick={() => setSelectId(id)}>
							View details
						</button>
					</PopoverClose>
					<PopoverClose
						className="menubar-item !text-action-danger"
						asChild
					>
						<button
							disabled={isPending}
							onClick={() => {
								deleteData({ id });
							}}
						>
							Delete Now
						</button>
					</PopoverClose>
				</PopoverContent>
			</Popover>
			{selectId && <ViewDetails id={selectId} onChange={setSelectId} />}
		</div>
	);
};

export default InvestorAction;
