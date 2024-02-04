import DirstributePieGraph from '@/components/graph/dirstribute-pie-graph';
import { fetchAdminDashboardData } from '@/server/actions/analytic.action';
import { Contact, ShieldCheck } from 'lucide-react';
export const metadata = {
	title: 'Gold & Pepper - Admin Dashboard',
	description: `Empower your business with Gold & Pepper's intuitive platform. Create investment projects effortlessly, backed by industry-specific insights. Start your success journey today.`,
};

const AdminPage = async () => {
	const result = await fetchAdminDashboardData();

	return (
		<div className="dashboard-col-space">
			<h3 className="heading-3 text-primary-white">Dashboard</h3>

			{result && (
				<div className="grid lg:grid-cols-[1fr,350px] grid-cols-1 gap-5">
					<div className="space-y-5">
						<div className="bg-primary-white p-5 rounded-md space-y-8">
							<h5 className="heading-5 border-l-[4px] pl-4 border-black-light leading-[1.2em]">
								Registered users
							</h5>
							<div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-3.5">
								{result.userData.map((item, index) => (
									<div
										className="bg-black-light p-5 rounded-md space-y-2"
										key={index}
									>
										<div className="h-[45px] w-[45px] bg-primary-gold rounded-md flex-center text-primary-white">
											<ShieldCheck size={23} />
										</div>
										<h4 className="heading-3 text-gray-muted">
											{item.value}
										</h4>
										<p className="text-base-1 text-gray-light">
											{item.label}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="bg-primary-white p-5 rounded-md">
						<DirstributePieGraph
							data={result.userData}
							title={'User Graph'}
						/>
					</div>
					<div className="lg:col-span-2 bg-primary-white p-5 rounded-md space-y-8">
						<h5 className="heading-5 border-l-[4px] pl-4 border-black-light leading-[1.2em]">
							Project Stats
						</h5>
						<div className="grid md:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-3.5">
							{result.projectData.map((item, index) => (
								<div
									className="bg-black-light p-5 rounded-md space-y-2"
									key={index}
								>
									<div className="h-[45px] w-[45px] bg-primary-gold rounded-md flex-center text-primary-white">
										<Contact size={18} />
									</div>
									<h4 className="heading-3 text-gray-muted">
										{item.value}
									</h4>
									<p className="text-base-1 text-gray-light">
										{item.label}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminPage;
