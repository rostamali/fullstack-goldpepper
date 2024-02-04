import { Button } from '@/components/ui/button';
import { AdvisoryServices, ManagementServices } from '@/constants/content';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
export const metadata = {
	title: 'Comprehensive Investment Solutions | Your Path to Financial Success',
	description: `Explore our comprehensive investment solutions designed to guide you on the path to financial success. From user-friendly tools to expert advice, we have you covered.`,
};

const WhatWeDoPage = () => {
	return (
		<>
			<section className="pt-[150px] pb-[50px] space-y-24 bg-primary-gray">
				{/* Short Info */}
				<div className="container space-y-10">
					<div className="section__header">
						<h2 className="heading-2 text-white">
							Gold & Pepper: Pioneering Strategic Solutions for
							Tomorrow's Challenges
						</h2>
						<p className="text-base-1 text-gray-light mt-[10px]">
							In the complex and ever-evolving global landscape,
							Gold & Pepper Consulting emerges as a beacon of
							innovation and expertise. We specialize in crafting
							solutions that not only address today's challenges
							but also anticipate the needs of tomorrow. Our focus
							extends beyond hospitality to encompass real estate,
							manufacturing, and more, reflecting our commitment
							to excellence and forward-thinking.
						</p>
					</div>
					<div className="section__header">
						<h2 className="heading-2 text-white">
							Technical and Financial Consultancy
						</h2>
						<p className="text-base-1 text-gray-light mt-[10px]">
							At the core of our services is a comprehensive suite
							of technical and financial consultancy offerings,
							meticulously tailored for small and medium-sized
							enterprises (SMEs). With a profound understanding of
							market dynamics, we empower businesses to navigate
							their relationships with financial intermediaries,
							suppliers, and contractors effectively. Our ultimate
							goal is risk mitigation and ensuring business
							continuity in an unpredictable world.
						</p>
					</div>
					<div className="space-y-10">
						<h2 className="heading-2 text-white">
							Advisory Services
						</h2>
						<ul className="flex flex-col gap-[60px]">
							{AdvisoryServices.map((item, index) => (
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

				{/* CTA Banner */}
				<div className="container">
					<div
						className="md:p-10 p-4 rounded-md bg-cover"
						id="home-cta-banner"
					>
						<div className="space-y-5">
							<h2 className="heading-2 text-primary-white">
								Financial Consulting
							</h2>
							<div className="xl:w-[50%] lg:w-[70%] w-[100%]">
								<p className="text-base-2 text-gray-light">
									As a trusted ally in financial strategy and
									management, Gold & Pepper Consulting
									transforms financial challenges into
									opportunities for growth and innovation. Our
									seasoned consultants bring decades of
									experience to every engagement, ensuring
									tailored solutions that drive success.
								</p>
							</div>
							<div className="flex items-center gap-[15px]">
								<Link href="/who-we-are">
									<Button className="btn-primary-sm">
										Learn more
									</Button>
								</Link>
								<Link href="/auth/signup">
									<Button className="btn-ghost-sm text-gray-muted">
										Sign up
										<ChevronRight />
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Management Service */}
				<div className="container space-y-10">
					<div className="section__header">
						<h2 className="heading-2 text-white">Investments</h2>
						<p className="text-base-1 text-gray-light mt-[10px]">
							Our investment division specializes in identifying
							and managing unique investment opportunities in
							hospitality and real estate across diverse markets.
							Our impeccable track record establishes us as the
							preferred partner for private equity firms,
							individual investors, and institutional funds.
						</p>
					</div>
					<div className="section__header">
						<h2 className="heading-2 text-white">
							Management Services
						</h2>
					</div>
					<div className="space-y-10">
						<ul className="flex flex-col gap-[60px]">
							{ManagementServices.map((item, index) => (
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

						<p className="text-base-1 text-gray-light mt-[10px]">
							In the dynamic realm of global business, Gold &
							Pepper Consulting stands as a steadfast partner
							committed to delivering excellence, fostering
							innovation, and creating lasting value. With us, you
							gain more than solutions; you gain strategic
							partnerships designed for enduring success.
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default WhatWeDoPage;
