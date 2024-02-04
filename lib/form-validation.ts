import * as z from 'zod';
/* ================================== */
// User Schemas
/* ================================== */
const UserRole = ['ADMIN', 'USER'];
const FormTypes = ['CREATE', 'UPDATE'];
const UserStatus = ['ACTIVE', 'INACTIVE'];
const InvestmentStatus = ['ACCEPT', 'NOT_ACCEPT', 'PENDING', 'CANCELED'];

export const ResetPasswordSchema = z
	.object({
		newPassword: z
			.string({
				required_error: 'New password is required',
			})
			.min(6, { message: 'New password must be atleast 6 characters' })
			.max(12, { message: 'New password must be within 12 characters' }),
		confirmPassword: z
			.string({
				required_error: 'Confirm password is required',
			})
			.min(6, {
				message: 'Confirm password must be atleast 6 characters',
			})
			.max(12, {
				message: 'Confirm password must be within 12 characters',
			}),
	})
	.refine(
		(values) => {
			return values.newPassword === values.confirmPassword;
		},
		{
			message: 'Passwords must match!',
			path: ['confirmPassword'],
		},
	);
export const ForgotPasswordSchema = z.object({
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Email Must be valid',
		}),
});
export const ContactFormSchema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Name is required' })
		.max(30, { message: 'Name must not exceed 30 characters' }),
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Email Must be valid',
		}),
	message: z
		.string({
			required_error: 'Message is required',
		})
		.min(50, { message: 'Message must be atleast 50 characters' }),
	acceptTerms: z.boolean().refine((value) => value === true, {
		message: 'You must agree to the terms and conditions.',
	}),
});
export const LoginFormSchema = z.object({
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Email Must be valid',
		}),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be atleast 6 characters' }),
	remember: z.boolean(),
});
export const RegisterFormSchema = z.object({
	firstName: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Firstname is required' })
		.max(30, { message: 'Firstname must not exceed 30 characters' }),
	lastName: z.string(),
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Must be a valid email',
		}),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters' })
		.max(12, { message: 'Password must be within 12 characters' }),
});
export const ProfileFormSchema = z.object({
	firstName: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Firstname is required' })
		.max(30, { message: 'Firstname must not exceed 30 characters' }),
	lastName: z.string(),
	phoneNumber: z.string().max(12),
	company: z.string(),
	bio: z.string().max(200, { message: 'Bio must not exceed 200 characters' }),
});
export const ChangePasswordSchema = z
	.object({
		oldPassword: z
			.string({ required_error: 'Password is required' })
			.min(1, { message: 'Password is required' }),
		newPassword: z
			.string({ required_error: 'New password is required' })
			.min(6, { message: 'New password must be atleast 6 characters' })
			.max(12, { message: 'New password must be within 12 characters' }),
		confirmPassword: z
			.string({ required_error: 'Confirm password is required' })
			.min(6, {
				message: 'Confirm password must be atleast 6 characters',
			})
			.max(12, {
				message: 'Confirm password must be within 12 characters',
			}),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: `Passwords doesn't match`,
		path: ['confirmPassword'],
	})
	.refine((data) => data.newPassword !== data.oldPassword, {
		message: `Old & new password must be different`,
		path: ['newPassword'],
	});
export const UserFormSchema = z
	.object({
		firstName: z
			.string({
				required_error: 'Name is required',
			})
			.min(1, { message: 'Firstname is required' })
			.max(30, { message: 'Firstname must not exceed 30 characters' }),
		lastName: z.string(),
		email: z
			.string({
				invalid_type_error: 'Email Must be valid',
				required_error: 'Email is required',
			})
			.min(1, { message: 'Email is required' })
			.email({
				message: 'Must be a valid email',
			}),
		role: z
			.string({
				required_error: 'Role is required',
			})
			.refine((value) => UserRole.includes(value), {
				message:
					'Role must be one of the options: ' + UserRole.join(', '),
			})
			.refine(
				(value) =>
					value !== undefined && value !== null && value !== '',
				{
					message: 'Role is required',
				},
			),
		status: z
			.string({
				required_error: 'Status is required',
			})
			.refine((value) => UserStatus.includes(value), {
				message:
					'Status must be one of the options: ' +
					UserStatus.join(', '),
			})
			.refine(
				(value) =>
					value !== undefined && value !== null && value !== '',
				{
					message: 'Status is required',
				},
			),
		type: z
			.string({
				required_error: 'Type is required',
			})
			.refine((value) => FormTypes.includes(value), {
				message:
					'Type must be one of the options: ' + FormTypes.join(', '),
			})
			.refine(
				(value) =>
					value !== undefined && value !== null && value !== '',
				{
					message: 'Type is required',
				},
			),
		password: z
			.string()
			.min(6, { message: 'Password must be atleast 6 characters' })
			.max(12, { message: 'Password must be within 12 characters' })
			.nullable(),
		sendMessage: z.boolean(),
	})
	.refine((input) => {
		// allows bar to be optional only when foo is 'foo'
		if (input.type !== 'UPDATE' && input.password === undefined)
			return false;

		return true;
	});

// Project schema
const ProjectStatusOptions = ['ACTIVE', 'PRIVATE'];
const SelectFileSchema = z.object({
	id: z.string(),
	title: z.string(),
	url: z.string(),
	fileType: z.string(),
});
export const ProjectFormSchema = z.object({
	type: z
		.string({
			required_error: 'Type is required',
		})
		.refine((value) => FormTypes.includes(value), {
			message: 'Type must be one of the options: ' + FormTypes.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Type is required',
			},
		),
	name: z
		.string({
			required_error: 'Name is required',
		})
		.min(2, { message: 'Name must be atleast 2 characters' })
		.max(100, { message: 'Name must not exceed 100 characters' }),
	description: z.any(),
	thumbnail: z.array(SelectFileSchema).nullable(),
	gallery: z.array(SelectFileSchema).nullable(),
	status: z
		.string({
			required_error: 'Status is required',
		})
		.refine((value) => ProjectStatusOptions.includes(value), {
			message:
				'Status must be one of the options: ' +
				ProjectStatusOptions.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Status is required',
			},
		),
	capex: z.coerce
		.string({
			invalid_type_error: 'Capex must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'Capex must be positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
	totalRevenue: z.coerce
		.string({
			invalid_type_error: 'Revenue must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'Revenue must be positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
	totalCost: z.coerce
		.string({
			invalid_type_error: 'Cost must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'Cost must be positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
	roi: z.coerce
		.string({
			invalid_type_error: 'ROI must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'ROI must be positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
	closeDate: z.date({
		required_error: 'Close date is required',
	}),
	documents: z
		.array(
			z.object({
				name: z.string().min(1, 'Name is required'),
				status: z
					.string()
					.min(1, 'Status is required')
					.refine((value) => ['PUBLIC', 'PRIVATE'].includes(value), {
						message: 'Status must be either PUBLIC or PRIVATE',
					}),
				description: z.string(),
				file: z
					.array(SelectFileSchema)
					.refine((files) => files.length > 0 || files === null, {
						message: 'File is required for each document',
					}),
			}),
		)
		.nullable(),
});

/* ========================= */
// Investor Schemas
/* ========================= */
export const ProjectInterestSchema = z.object({
	acceptTerms: z.boolean().refine((value) => value === true, {
		message: 'You must agree to the terms and conditions.',
	}),
});
export const InvestorDetailsSchema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Name is required' })
		.max(30, { message: 'Name must not exceed 40 characters' }),
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Must be a valid email',
		}),
	phone: z.string(),
	status: z
		.string({
			required_error: 'Status is required',
		})
		.refine((value) => InvestmentStatus.includes(value), {
			message: 'Status must be one of: ' + InvestmentStatus.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Status is required',
			},
		),
	type: z
		.string({
			required_error: 'Type is required',
		})
		.refine((value) => FormTypes.includes(value), {
			message: 'Type must be one of the options: ' + FormTypes.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Type is required',
			},
		),
	sendMessage: z.boolean(),
});

/* ========================= */
// Company information graph
/* ========================= */
const BreakEvenType = ['REVENUE', 'EXPENCES'];
export const AssetsGraph = z.object({
	date: z.date(),
	value: z.coerce
		.string({
			invalid_type_error: 'Value must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'Value must be positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
});
export const BreakEvenGraph = z.object({
	date: z.date(),
	revenue: z.coerce
		.string({
			invalid_type_error: 'Value must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'Value must be positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
	expences: z.coerce
		.string({
			invalid_type_error: 'Value must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'Value must be positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
});
export const DcfGraph = z.object({
	date: z.date(),
	value: z.coerce
		.string({
			invalid_type_error: 'Value must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'Value must be positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
});
export const DistributionGraph = z.object({
	label: z.string().min(2, { message: `Label is required` }),
	value: z.coerce
		.string({
			invalid_type_error: 'Value must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'Value must be positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
});
export const EbitdaGraph = z.object({
	date: z.date(),
	value: z.coerce
		.string({
			invalid_type_error: 'Value must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'Value must be positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
});
export const PerformanceGraph = z.object({
	date: z.date(),
	value: z.coerce
		.string({
			invalid_type_error: 'Value must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'Value must be positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
});
export const ProfitEquityGraph = z.object({
	date: z.date(),
	profit: z.coerce
		.string({
			invalid_type_error: 'Profit must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue);
			},
			{
				message: 'Profit must be a number',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
	equity: z.coerce
		.string({
			invalid_type_error: 'Equity must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue);
			},
			{
				message: 'Equity must be a number',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
});
export const CompanyInfoSchema = z.object({
	type: z
		.string({
			required_error: 'Type is required',
		})
		.refine((value) => FormTypes.includes(value), {
			message: 'Type must be one of the options: ' + FormTypes.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Type is required',
			},
		),
	assets: z.array(AssetsGraph).nullable(), // Done
	breakEven: z.array(BreakEvenGraph).nullable(),
	dcfMethod: z.array(DcfGraph).nullable(), // Done
	distribution: z.array(DistributionGraph).nullable(), // Done
	ebitda: z.array(EbitdaGraph).nullable(), // Done
	performance: z.array(PerformanceGraph).nullable(), // Done
	profitEquity: z.array(ProfitEquityGraph).nullable(), // Done
});
