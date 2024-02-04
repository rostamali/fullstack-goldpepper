import { isAuthenticated } from '@/server/actions/auth.action';
import { redirect } from 'next/navigation';

const AdminAuth = async ({ children }: { children: React.ReactNode }) => {
	const isAccess = await isAuthenticated();
	if (!isAccess || isAccess.role !== 'ADMIN') redirect('/auth/login');

	return <>{children}</>;
};

export default AdminAuth;
