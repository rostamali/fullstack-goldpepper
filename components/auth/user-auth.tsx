import { isAuthenticated } from '@/server/actions/auth.action';
import { redirect } from 'next/navigation';

const UserAuth = async ({ children }: { children: React.ReactNode }) => {
	const isAccess = await isAuthenticated();
	if (!isAccess) redirect('/auth/login');

	return <>{children}</>;
};

export default UserAuth;
