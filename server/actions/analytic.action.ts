'use server';

import { isAuthenticated } from './auth.action';
import prisma from '../prisma';
import { UserRoleFormat, dateFormat } from '@/lib/formater';

export const fetchAdminDashboardData = async () => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN') return;

		const users = await prisma.user.findMany({
			select: {
				status: true,
				role: true,
				investments: {
					select: {
						id: true,
					},
				},
			},
		});
		const projects = await prisma.project.findMany({
			select: {
				status: true,
			},
		});

		const userData = [
			{
				id: 'total-users',
				label: 'Total Users',
				value: users.length,
			},
			{
				id: 'active-users',
				label: 'Active Users',
				value: users.filter((user) => user.status === 'ACTIVE').length,
			},
			{
				id: 'banned-users',
				label: 'Banned Users',
				value: users.filter((user) => user.status === 'INACTIVE')
					.length,
			},
			{
				id: 'total-admin',
				label: 'Total Admin',
				value: users.filter((user) => user.role === 'ADMIN').length,
			},
			{
				id: 'total-manager',
				label: 'Total Manager',
				value: users.filter((user) => user.role === 'MANAGER').length,
			},
			{
				id: 'total-investor',
				label: 'Total Investor',
				value: users.filter((user) => user.investments.length > 0)
					.length,
			},
		];
		const projectData = [
			{
				label: 'Total Projects',
				value: projects.length,
			},
			{
				label: 'Active Porjects',
				value: projects.filter((user) => user.status === 'ACTIVE')
					.length,
			},
			{
				label: 'Private Users',
				value: users.filter((user) => user.status === 'INACTIVE')
					.length,
			},
		];

		return {
			userData,
			projectData,
		};
	} catch (error) {}
};
export const fetchUserDashboardData = async () => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return;

		const user = await prisma.user.findUnique({
			where: {
				id: isAuth.id,
				status: 'ACTIVE',
				isVerified: true,
			},
			select: {
				status: true,
				createdAt: true,
				role: true,
				phoneNumber: true,
			},
		});
		if (!user) return;

		const investment = await prisma.investment.findMany({
			where: {
				userId: isAuth.id,
			},
			select: {
				id: true,
				status: true,
			},
		});
		const userData = [
			{
				label: 'Role',
				value: UserRoleFormat[user.role],
			},
			{
				label: '# Interest',
				value: investment.length,
			},
			{
				label: 'Accept Request',
				value: investment.filter((item) => item.status === 'ACCEPT')
					.length,
			},
			{
				label: 'Join Date',
				value: dateFormat(user.createdAt),
			},
		];

		return {
			userData,
			isPhoneShow: user.phoneNumber ? true : false,
		};
	} catch (error) {
		return;
	}
};
