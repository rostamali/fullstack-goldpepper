import { fetProfileMenu } from '@/server/actions/auth.action';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import Image from 'next/image';
import Link from 'next/link';
import LogoutBtn from './logout-btn';

const ProfileMenu = async () => {
	const result = await fetProfileMenu();
	return (
		<Popover>
			<PopoverTrigger asChild>
				{result && (
					<button className="flex items-center gap-1.5">
						<Image
							src={
								result.profile
									? `/uploads/avatar/${result.profile}`
									: '/assets/placeholder.svg'
							}
							alt={'Placeholder'}
							width={100}
							height={100}
							className="h-[45px] w-[45px] rounded-full object-cover"
						/>
						<div className="flex flex-col items-start">
							<h5 className="heading-6 text-white">
								{result.name}
							</h5>
							<span className="text-base-2 text-gray-muted">
								{result.role}
							</span>
						</div>
					</button>
				)}
			</PopoverTrigger>
			<PopoverContent className="PopoverContent bg-black-dark text-primary-white border border-primary-gray border-opacity-25 mt-4 p-2">
				<div className="flex flex-col gap-1">
					{result &&
						result.links.map((item, index) => (
							<Link
								key={index}
								href={item.url}
								className="rounded font-poppins text-[12px] px-2 py-1 duration-150 hover:bg-primary-white hover:bg-opacity-15"
							>
								{item.label}
							</Link>
						))}
					<LogoutBtn
						className={
							'rounded font-poppins text-[12px] px-2 py-1 duration-150 hover:bg-primary-white hover:bg-opacity-15 text-left'
						}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default ProfileMenu;
