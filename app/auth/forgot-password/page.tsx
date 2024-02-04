import AuthFormHeader from '@/components/auth/auth-form-header';
import Link from 'next/link';
import ForgotForm from './forgot-form';

export const metadata = {
	title: 'Forgot Password | Gold & Pepper',
	description:
		'Forgot your password? No worries! Recover access to your account on Gold & Pepper by resetting your password. Follow the simple steps to regain control',
};

const ForgotPassPage = () => {
	return (
		<div className="flex flex-col gap-[40px]">
			<AuthFormHeader
				title={'Forgot password'}
				content={`Enter your email and we'll send you a link to reset your password`}
			/>
			<ForgotForm />
			<p className="text-base-2 text-gray-muted">
				Already have an account?{' '}
				<Link href="/auth/login" className="text-primary-gold">
					Sign in
				</Link>
			</p>
		</div>
	);
};

export default ForgotPassPage;
