import AuthFormHeader from '@/components/auth/auth-form-header';
import Link from 'next/link';
import ResetForm from './reset-form';
import { fetchForgotPasswordToken } from '@/server/actions/auth.action';
type SearchParams = {
	searchParams: {
		token: string;
	};
};
export const metadata = {
	title: 'Reset Your Password | Gold & Pepper',
	description:
		'Securely reset your password for Gold & Pepper. Follow the instructions to choose a new password and regain access to your account. Your security is our priority',
};

const ResetPasswordPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchForgotPasswordToken(searchParams.token);
	if (!result || !result.success)
		throw new Error('Auth is required to access this resource');

	return (
		<div className="flex flex-col gap-[40px]">
			<AuthFormHeader
				title={'Password reset'}
				content={`New password should different from old password`}
			/>
			<ResetForm token={searchParams.token} />
			<p className="text-base-2 text-gray-muted">
				Already have an account?{' '}
				<Link href="/auth/login" className="text-primary-gold">
					Sign in
				</Link>
			</p>
		</div>
	);
};

export default ResetPasswordPage;
