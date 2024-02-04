import { FC } from 'react';
type HeaderProps = {
	title: string;
	content: string;
};
const AuthFormHeader: FC<HeaderProps> = ({ title, content }) => {
	return (
		<div className="flex flex-col gap-1">
			<h3 className="heading-3 text-primary-white">{title}</h3>
			<span className="text-base-2 text-gray-muted">{content}</span>
		</div>
	);
};

export default AuthFormHeader;
