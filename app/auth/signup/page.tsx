import AuthFormHeader from '@/components/auth/auth-form-header';
import SignupForm from '@/components/auth/signup-form';
import Link from 'next/link';
export const metadata = {
	title: 'Register a New Account | Gold & Pepper',
	description:
		'Join Gold & Pepper today! Sign up to unlock exclusive features and personalized content. It only takes a few minutes to get started',
};

const SignupPage = () => {
	return (
		<div className="flex flex-col gap-[40px]">
			<AuthFormHeader
				title={'Create your account'}
				content={'to continue on Gold & Pepper'}
			/>
			<SignupForm />
			<p className="text-base-2 text-gray-muted">
				Already have an account?{' '}
				<Link href="/auth/login" className="text-primary-gold">
					Log in
				</Link>
			</p>
		</div>
	);
};

export default SignupPage;
