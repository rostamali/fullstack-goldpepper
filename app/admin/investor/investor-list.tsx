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
import EmptyError from '@/components/shared/elements/empty-error';
import Pagination from '@/components/shared/filters/pagination';
import { Badge } from '@/components/ui/badge';
import { InvestmentStatusFormat, dateFormat } from '@/lib/formater';
import InvestorAction from './investor-action';

type ListProps = {
	data: InvestorList[];
	pages: number;
};

const InvestorList: FC<ListProps> = ({ data, pages }) => {
	return (
		<div className="user-table dashboard-col-space">
			{data.length > 0 ? (
				<Table>
					<TableHeader className="[&_tr]:border-b-0">
						<TableRow className="border-b-0">
							<TableHead className="p-0">
								<div className="table-head-start">
									<div className="flex items-center gap-[10px]">
										<span>Project</span>
									</div>
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Investor</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Status</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">
									Agree terms
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
						{data.map((item, index) => (
							<TableRow
								className="border-b-0 border-t-0"
								key={index}
							>
								<TableCell className="p-0">
									<div className="table-cell-start min-h-[80px]">
										<span className="text-base-2 text-black-light">
											{item.project.name.substring(0, 30)}
											...
										</span>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										<div className="flex flex-col gap-[5px]">
											<span className="text-base-2 text-black-light">
												{item.name}
											</span>
											<span className="text-base-2 !text-[13px] !text-primary-gold">
												{item.email}
											</span>
										</div>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										<Badge className="border border-black-light text-base-2 text-black-light">
											{
												InvestmentStatusFormat[
													item.status
												]
											}
										</Badge>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										<span className="text-base-2 text-black-light">
											{dateFormat(item.createdAt)}
										</span>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-end min-h-[80px] text-black-light">
										<InvestorAction id={item.id} />
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
				<div className="text-base-1"></div>
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

export default InvestorList;
