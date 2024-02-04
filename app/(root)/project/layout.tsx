import UserAuth from '@/components/auth/user-auth';

export default function ProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <UserAuth>{children}</UserAuth>;
}
