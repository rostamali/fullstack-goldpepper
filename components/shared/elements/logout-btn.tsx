'use client';
import { useLoggedOut } from '@/lib/hooks/useAuth';
import { FC } from 'react';
type BtnProps = {
	className: string;
};
const LogoutBtn: FC<BtnProps> = ({ className }) => {
	const { mutate: logout, isPending } = useLoggedOut();

	return (
		<button
			className={className}
			onClick={() => logout()}
			disabled={isPending}
		>
			Logout
		</button>
	);
};

export default LogoutBtn;
