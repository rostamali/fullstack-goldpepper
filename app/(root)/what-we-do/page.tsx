import { Button } from '@/components/ui/button';
import { AdvisoryServices, ManagementServices } from '@/constants/content';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ServiceCard from './service-card';
export const metadata = {
	title: 'Comprehensive Investment Solutions | Your Path to Financial Success',
	description: `Explore our comprehensive investment solutions designed to guide you on the path to financial success. From user-friendly tools to expert advice, we have you covered.`,
};

const WhatWeDoPage = () => {
	return (
		<>
			<section className="pt-[150px] pb-[50px] space-y-24 bg-primary-gray">
				{/* Short Info */}
				<div className="container">
					<div className="section__header">
						<h2 className="heading-2 text-white">
							Pioneering Strategic Solutions for Tomorrow's
							Challenges
						</h2>
						<p className="text-base-1 text-gray-light mt-[10px]">
							At the heart of our offerings lies a comprehensive
							suite of technical and financial consultancy
							services, tailored explicitly for small and
							medium-sized enterprises (SMEs). Our strategies are
							rooted in a deep understanding of market dynamics,
							enabling us to support enterprises through their
							engagements with financial intermediaries,
							suppliers, and contractors. Our primary objective:
							risk mitigation and the assurance of business
							continuity in an unpredictable environment.
						</p>
					</div>
					<div className="services mt-[40px]">
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
									In the realm of financial challenges and
									strategic pivots, Gold & Pepper stands as a
									trusted ally. Our seasoned consultants, with
									decades of combined experience, ensure that
									every financial obstacle is transformed into
									an opportunity for growth and innovation.
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
				<div className="container">
					<div className="section__header">
						<h2 className="heading-2 text-white">
							Investments Management Services
						</h2>
						<p className="text-base-1 text-gray-light mt-[10px]">
							Gold & Pepper's investment arm specializes in
							identifying, funding, and stewarding unique
							hospitality and real estate investment opportunities
							across diverse markets. With an unblemished track
							record, we have solidified our position as the
							preferred partner for private equity firms,
							individual investors, and institutional funds.
						</p>
					</div>
					<div className="services mt-[40px]">
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
					</div>
				</div>
			</section>
		</>
	);
};

export default WhatWeDoPage;
