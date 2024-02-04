'use client';
import { FC } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { ProjectStatusFormat, dateFormat } from '@/lib/formater';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EmptyError from '@/components/shared/elements/empty-error';
import ProjectAction from './project-action';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/components/shared/filters/pagination';
type ListProps = {
	list: ProjectList[];
	pages: number;
};

const ProjectList: FC<ListProps> = ({ list, pages }) => {
	return (
		<div className="project-list dashboard-col-space">
			{list.length > 0 ? (
				<Table className="shadow-light-100">
					<TableHeader className="[&_tr]:border-b-0">
						<TableRow className="border-b-0">
							<TableHead className="p-0">
								<div className="table-head-start">Project</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">Status</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-data">
									Close date
								</div>
							</TableHead>
							<TableHead className="p-0">
								<div className="table-head-end">
									<div className="mx-auto">Actions</div>
								</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="border-t-0">
						{list.map((item, index) => (
							<TableRow
								key={index}
								className="border-b-0 border-t-0"
							>
								<TableCell className="p-0">
									<div className="table-cell-start min-h-[80px]">
										<div className="flex items-center gap-1.5">
											<Image
												src={
													item.thumbnail
														? `/uploads/files/${item.thumbnail.url}`
														: '/assets/placeholder.svg'
												}
												alt={item.name}
												width={400}
												height={400}
												className="h-[50px] w-[50px] rounded-md object-cover border border-primary-gray border-opacity-30"
											/>
											<p className="text-base-2">
												{item.name.substring(0, 30)}...
											</p>
										</div>
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										<Badge
											variant="outline"
											className="px-2 py-1"
										>
											{ProjectStatusFormat[item.status]}
										</Badge>
									</div>
								</TableCell>

								<TableCell className="p-0">
									<div className="table-cell-data min-h-[80px]">
										{dateFormat(item.createdAt)}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-end min-h-[80px]">
										<ProjectAction id={item.id} />
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
					title={'There are no projects to show'}
					description={`Oops! Currently, there are no projects to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
					Links={
						<Link href="/admin/project/create">
							<Button className="btn-primary-lg">
								Create project
							</Button>
						</Link>
					}
				/>
			)}
			<div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-[15px]">
				<div className="text-base-1 "></div>
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

export default ProjectList;
