import { Badge } from '@/components/ui/badge';
import { fetchUserDashboardData } from '@/server/actions/analytic.action';
import Link from 'next/link';
export const metadata = {
	title: 'Your Investment Hub | Personalized Dashboard',
	description: `Experience the power of personalized investment management. Your dashboard, your data – stay informed, track progress, and make strategic decisions effortlessly.`,
};

const UserDashboard = async () => {
	const result = await fetchUserDashboardData();

	return (
		<div className="dashboard-col-space">
			<h3 className="heading-3 text-primary-white">My Dashboard</h3>
			{result && (
				<>
					<div className="grid grid-cols-2 gap-5">
						{result.userData.map((item, index) => (
							<div
								key={index}
								className="space-y-2 bg-black-dark p-5 rounded-md"
							>
								<h6 className="heading-6 text-gray-muted">
									{item.label}
								</h6>
								<p className="text-base-2 text-white">
									{item.value}
								</p>
							</div>
						))}
					</div>
					{result.isPhoneShow && (
						<div className="bg-black-dark p-4 rounded-md border-l-4 border-action-warning">
							<div className="flex items-center justify-between">
								<div className="space-y-2">
									<h5 className="heading-5 text-gray-muted">
										Enter Your Phone Number
									</h5>
									<p className="text-base-2 text-gray-muted">
										Your phone number is crucial for
										communication purposes.
									</p>
								</div>
								<Link href="/user/profile">
									<Badge className="border border-gray-light text-base-1 py-2 px-4 text-gray-light hover:bg-gray-light hover:text-black-light">
										Add now
									</Badge>
								</Link>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default UserDashboard;
