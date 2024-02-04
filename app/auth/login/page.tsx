import AuthFormHeader from '@/components/auth/auth-form-header';
import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';
export const metadata = {
	title: 'Sign In to Your Account | Gold & Pepper',
	description:
		'Securely sign in to your account on Gold & Pepper. Access your personalized content and services with just a few clicks',
};

const LoginPage = () => {
	return (
		<div className="flex flex-col gap-[40px]">
			<AuthFormHeader
				title={'Sign in'}
				content={'to continue on Gold & Pepper'}
			/>
			<LoginForm />
			<p className="text-base-2 text-gray-muted">
				Don't have an account?{' '}
				<Link href="/auth/signup" className="text-primary-gold">
					Sign up
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
