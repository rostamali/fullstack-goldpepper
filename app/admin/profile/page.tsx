import ProfileForm from '@/components/forms/profile-form';
import ProfileAvatar from '@/components/shared/elements/profile-avatar';
import ChangePassword from '@/components/shared/modals/change-password';
import { dateFormat } from '@/lib/formater';
import { fetchProfileDetails } from '@/server/actions/auth.action';
import { CalendarDays } from 'lucide-react';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'My Profile - Manage Admin Account',
	description: `Customize and review your admin profile on Gold & Pepper's admin dashboard. Update personal information, preferences, and security settings.`,
};

const AdminProfile = async () => {
	const result = await fetchProfileDetails();

	return (
		<div className="dashboard-col-space">
			{result && result.profile && (
				<div className="flex md:items-end justify-between max-md:flex-col gap-[15px]">
					<div className="flex xm:items-center gap-[15px] max-xm:flex-col">
						<ProfileAvatar
							previewUrl={
								result.avatar
									? `/uploads/avatar/${result.avatar?.url}`
									: null
							}
							isThumbnail={result.avatar ? true : false}
							pageUrl={'/user/profile'}
							frameClass={'h-[120px] w-[120px] rounded-full'}
							thumbnailClass={'h-[120px] w-[120px] rounded-full'}
						/>
						<div className="flex flex-col gap-2">
							<div>
								<h3 className="heading-3 text-white">
									{result?.profile?.firstName}{' '}
									{result?.profile?.lastName}
								</h3>
								<span className="text-base-2 text-white">
									{result?.profile?.email}
								</span>
							</div>
							<div className="flex items-center text-gray-light gap-[5px]">
								<CalendarDays size={20} />
								<span className="text-base-2 mt-1">
									Joined{' '}
									{dateFormat(result?.profile?.createdAt)}
								</span>
							</div>
						</div>
					</div>
					<div className="flex xm:justify-end">
						<ChangePassword />
					</div>
				</div>
			)}
			{result && result.profile && (
				<ProfileForm
					defaultValues={{
						firstName: result.profile.firstName,
						lastName: result.profile.lastName || '',
						phoneNumber: result.profile.phoneNumber || '',
						company: result.profile.company || '',
						bio: result.profile.bio || '',
					}}
				/>
			)}
		</div>
	);
};

export default AdminProfile;
