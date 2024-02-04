'use client';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { FC } from 'react';
import { UserRoleFormat, UserStatusFormat, dateFormat } from '@/lib/formater';
import EmptyError from '@/components/shared/elements/empty-error';
import Pagination from '@/components/shared/filters/pagination';
import UserAction from './user-action';

type ListProps = {
	data: UserList[];
	pages: number;
	current: string | null;
};

const UserList: FC<ListProps> = ({ data, pages, current }) => {
	return (
		<div className="user-table dashboard-col-space">
			{data.length > 0 ? (
				<Table>
					<TableHeader className="[&_tr]:border-b-0">
						<TableRow className="border-b-0">
							<TableHead className="p-0">
								<div className="table-head-start">
									<div className="flex items-center gap-[10px]">
										<span>User</span>
									</div>
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Role</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Status</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">
									Last Login
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-end">
									<div className="mx-auto">Action</div>
								</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="border-t-0">
						{data.map((user, index) => (
							<TableRow
								className="border-b-0 border-t-0"
								key={index}
							>
								<TableCell className="p-0">
									<div className="table-cell-start min-h-[80px]">
										<div className="flex flex-col gap-[5px]">
											<span className="text-base-2">
												{user.firstName} {user.lastName}
											</span>
											<span className="text-base-2 !text-[13px] !text-primary-gold">
												{user.email}
											</span>
										</div>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{UserRoleFormat[user.role]}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{user.status === 'ACTIVE' ? (
											<span className="badge-success">
												{UserStatusFormat[user.status]}
											</span>
										) : (
											<span className="badge-danger">
												{UserStatusFormat[user.status]}
											</span>
										)}
									</div>
								</TableCell>

								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{user.lastLogin
											? dateFormat(user.lastLogin)
											: 'No Activity'}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-end min-h-[80px]">
										<UserAction
											id={user.id}
											current={current}
										/>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<EmptyError
					contentClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					title={'No user found to show'}
					description={`Oops! Currently, there are no users to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
					Links={
						<a
							href="/admin/user"
							className="btn-navlink btn-navlink-active !w-auto"
						>
							Reload
						</a>
					}
				/>
			)}
			<div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-[15px]">
				<div className="text-base-1 text-opacity-0"></div>
				<Pagination
					pages={pages}
					containerClass={''}
					prevBtnClass={''}
					nextBtnClass={''}
					paginateBtnClass={
						'border border-primary-gray border-opacity-40 text-white hover:bg-primary-gold'
					}
					paginateActiveClass={'bg-primary-gold text-primary-white'}
				/>
			</div>
		</div>
	);
};

export default UserList;
