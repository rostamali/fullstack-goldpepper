import {
	AudioWaveform,
	CircleUser,
	Command,
	Component,
	Contact2,
	Facebook,
	FolderOpen,
	Instagram,
	LayoutList,
	Linkedin,
} from 'lucide-react';

export const SocialLinks = [
	{
		label: 'Facebook',
		url: '/',
		icon: Facebook,
	},
	{
		label: 'LinkedIn',
		url: '/',
		icon: Linkedin,
	},
	{
		label: 'Instagram',
		url: '/',
		icon: Instagram,
	},
];
export const TermsLinks = [
	{
		label: 'Privacy Policy',
		url: '/',
	},
	{
		label: 'Terms Of Use',
		url: '/',
	},
];
export const RootLinks = [
	{
		label: 'Home',
		url: '/',
	},
	{
		label: 'What we do',
		url: '/what-we-do',
	},
	{
		label: 'About Us',
		url: '/who-we-are',
	},
	{
		label: 'Connect with us',
		url: '/connect-with-us',
	},
	{
		label: 'Portals',
		url: '/project',
	},
];
export const UserLinks = [
	{
		label: 'Account',
		url: '/user',
		icon: Component,
	},
	{
		label: 'Projects',
		url: '/user/project',
		icon: LayoutList,
	},
	{
		label: 'Profile',
		url: '/user/profile',
		icon: CircleUser,
	},
];
export const AdminLinks = [
	{
		label: 'Dashboard',
		url: '/admin',
		icon: Component,
	},
	{
		label: 'Files',
		url: '/admin/files',
		icon: FolderOpen,
	},
	{
		label: 'Projects',
		url: '/admin/project',
		icon: Command,
	},
	{
		label: 'Investors',
		url: '/admin/investor',
		icon: AudioWaveform,
	},
	{
		label: 'Users',
		url: '/admin/user',
		icon: Contact2,
	},
	{
		label: 'Profile',
		url: '/admin/profile',
		icon: CircleUser,
	},
];
export const FileTypes = [
	{
		label: 'Images',
		value: 'image',
	},
	{
		label: 'Videos',
		value: 'video',
	},
	{
		label: 'Documents',
		value: 'application',
	},
];
export const ProjectStatus = [
	{
		label: 'Active',
		value: 'ACTIVE',
	},
	{
		label: 'Private',
		value: 'PRIVATE',
	},
];
export const DocumentStatus = [
	{
		label: 'Public',
		value: 'PUBLIC',
	},
	{
		label: 'Private',
		value: 'PRIVATE',
	},
];
export const UserStatus = [
	{
		label: 'Active',
		value: 'ACTIVE',
	},
	{
		label: 'Inactive',
		value: 'INACTIVE',
	},
];
export const UserRoles = [
	{
		label: 'Admin',
		value: 'ADMIN',
	},
	{
		label: 'User',
		value: 'USER',
	},
];
export const InvestmentStatus = [
	{
		label: 'Accept',
		value: 'ACCEPT',
	},
	{
		label: 'Not Accepted',
		value: 'NOT_ACCEPT',
	},
	{
		label: 'Pending',
		value: 'PENDING',
	},
	{
		label: 'Canceled',
		value: 'CANCELED',
	},
];
