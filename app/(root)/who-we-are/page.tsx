import { OurNetworks, TeamMembers } from '@/constants/content';
export const metadata = {
	title: 'Meet the Leaders in Investment Excellence | Our Story',
	description: `Get to know us, the leaders in investment excellence. Our story is rooted in professional integrity, precise market insight, and a commitment to your success`,
};
const AboutUs = () => {
	return (
		<section className="pt-[150px] pb-[50px] space-y-24 bg-primary-gray">
			{/* Details */}
			<div className="container">
				<div className="section__header">
					<h2 className="heading-2 text-white">
						Gold & Pepper: A Synthesis of Expertise and Vision
					</h2>
					<p className="text-base-1 text-gray-light mt-[10px]">
						Nestled at the strategic crossroads of the Middle
						Eastern and European business landscapes, Gold & Pepper
						Consulting stands as a beacon of excellence in the
						business consultancy arena. Our foundation is built on
						the pillars of professional acumen, industry foresight,
						and a steadfast commitment to delivering value to our
						stakeholders.
					</p>
				</div>
				<div className="section__header mt-[40px]">
					<h2 className="heading-2 text-white">
						Our Organizational Fabric
					</h2>
					<p className="text-base-1 text-gray-light mt-[10px]">
						More than a consultancy firm, Gold & Pepper is the
						embodiment of a philosophy that champions strategic
						alignment, market resilience, and sustainable growth.
						Our ethos is anchored in trust, reliability, and
						actionable intelligence, ensuring our partners and
						clients maintain a competitive edge in the fast-paced
						world of business.
					</p>
				</div>
			</div>

			{/* Our team */}
			<div className="container space-y-10">
				<div className="section__header">
					<h2 className="heading-2 text-white">Our Core Team</h2>
				</div>
				<div className="team__list">
					<div className="team grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
						{TeamMembers.map((item, index) => (
							<div
								key={index}
								className="relative bg-cover bg-no-repeat md:h-[400px] h-[300px] bg-top group rounded-md overflow-hidden"
								style={{
									backgroundImage: `url(/assets/team/${item.icon})`,
								}}
							>
								<div className="flex flex-col items-center justify-end h-full p-4">
									<div className="bg-gray-muted text-center p-2 w-full rounded-md">
										<h4 className="heading-6 text-black-dark">
											{item.name}
										</h4>
										<span className="text-base-1 text-black-light">
											{item.title}
										</span>
									</div>
								</div>
								<div className="bg-gray-light absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center p-3 text-center opacity-0 group-hover:opacity-100 duration-150">
									<p className="text-base-2 text-primary-gray">
										{item.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Our networks */}
			<div className="container space-y-10">
				<div className="section__header">
					<h2 className="heading-2 text-white">Our Network</h2>
				</div>
				<div className="services mt-[40px]">
					<ul className="flex flex-col gap-[60px]">
						{OurNetworks.map((item, index) => (
							<li
								key={index}
								className="grid md:grid-cols-4 grid-cols-1 gap-[20px]"
							>
								<h4 className="heading-4 uppercase text-white">
									{item.name}
								</h4>
								<p className="md:col-span-3 text-base-1 text-gray-light">
									{item.description}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
