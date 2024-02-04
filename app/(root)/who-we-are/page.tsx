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
						A Synthesis of Expertise and Vision
					</h2>
					<p className="text-base-1 text-gray-light mt-[10px]">
						Positioned at the confluence of the Middle Eastern and
						European business landscapes, Gold & Pepper represents a
						paradigm of excellence in the realm of business
						consultancy. Our institution is meticulously crafted
						upon pillars of professional acumen, industry foresight,
						and an unwavering commitment to stakeholder value.
					</p>
				</div>
				<div className="section__header mt-[40px]">
					<h2 className="heading-2 text-white">
						Our Organizational Fabric
					</h2>
					<p className="text-base-1 text-gray-light mt-[10px]">
						Gold & Pepper is not just a consultancy firm; it is an
						embodiment of a philosophy that prioritizes strategic
						alignment, market resilience, and sustainable growth.
						Our ethos is deeply rooted in the principles of trust,
						reliability, and actionable intelligence, ensuring that
						our partners and clients always have a competitive edge
						in the dynamic world of hospitality.
					</p>
				</div>
			</div>

			{/* Our team */}
			<div className="container">
				<div className="section__header">
					<h2 className="heading-2 text-white">Our Core Team</h2>
					<p className="text-base-1 text-gray-light mt-[10px]">
						Positioned at the confluence of the Middle Eastern and
						European business landscapes, Gold & Pepper represents a
						paradigm of excellence in the realm of business
						consultancy. Our institution is meticulously crafted
						upon pillars of professional acumen, industry foresight,
						and an unwavering commitment to stakeholder value.
					</p>
				</div>
				<div className="team__list mt-[40px]">
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
			<div className="container">
				<div className="section__header">
					<h2 className="heading-2 text-white">Our Network</h2>
					<p className="text-base-1 text-gray-light mt-[10px]">
						At Gold & Pepper, we believe that the future belongs to
						those who not only envision it but have the expertise
						and commitment to shape it. Join us in sculpting the
						future of the hospitality industry, one strategic
						milestone at a time.
					</p>
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
