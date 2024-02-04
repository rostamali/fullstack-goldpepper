/* ============================== */
//  Packages types
/* ============================== */
declare module '@editorjs/header';
declare module '@editorjs/embed';
declare module '@editorjs/list';
declare module '@editorjs/inline-code';
declare module '@editorjs/code';
declare module '@editorjs/link';
declare module '@editorjs/image';
declare module '@editorjs/table';
/* ============================== */
//  Auth types
/* ============================== */
type UserStatus = 'ACTIVE' | 'INACTIVE';
interface ITokenOptions {
	expires: Date;
	maxAge: number;
	httpOnly: boolean;
	sameSite: 'lax' | 'strict' | 'none' | undefined;
	secure?: boolean;
}
type UserRole = 'USER' | 'ADMIN' | 'MANAGER';
interface RegisterUser {
	firstName: string;
	lastName?: string;
	email: string;
	password: string;
}
interface LoginUser {
	email: string;
	password: string;
	remember: boolean;
}
interface UserList {
	id: string;
	firstName: string;
	lastName: string | null;
	email: string;
	status: UserStatus;
	lastLogin: Date | null;
	createdAt: Date;
	role: UserRole;
}

type InvestmentStatus = 'ACCEPT' | 'NOT_ACCEPT' | 'PENDING' | 'CANCELED';
interface InvestorList {
	id: string;
	status: InvestmentStatus;
	name: string;
	email: string;
	phoneNumber: string | null;
	createdAt: Date;
	project: {
		name: string;
	};
}
interface UserInterestList {
	projectId: string;
	name: string;
	thumbnail: string | null;
	capex: number;
	roi: number;
	totalCost: number;
	totalRevenue: number;
	status: InvestmentStatus;
}
/* ============================== */
//  File library types
/* ============================== */
interface FileLibraryType {
	id: string;
	fileType: string;
	title: string;
	url: string;
}
interface FileSelection {
	id: string;
	fileType: string;
	title: string;
	url: string;
}

/* ============================== */
//  Project types
/* ============================== */
type ProjectStatus = 'ACTIVE' | 'PRIVATE';
interface ProjectList {
	id: string;
	name: string;
	slug: string;
	thumbnail: {
		url: string;
	} | null;
	status: ProjectStatus;
	createdAt: Date;
}

/* ============================== */
//  CSV file types
/* ============================== */
interface CSVUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	bio: string | null;
}
interface CSVProject {
	name: string;
	location: string;
	miniInvestment: number;
	capex: number;
	totalRevenue: number;
	totalCost: number;
	roi: number;
	targetAmount: number;
	status: ProjectStatus;
}
