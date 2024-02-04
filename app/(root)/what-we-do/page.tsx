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
			<section id="we-do-banner">
				<div className="container">
					<div className="flex items-center sm:h-[450px] h-[350px]">
						<h2 className="heading-2 text-primary-white">
							What we do
						</h2>
					</div>
				</div>
			</section>
			<section
				id="about-us"
				className="md:py-[80px] py-[60px] bg-primary-gray"
			>
				<div className="container">
					<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
						<div className="flex flex-col gap-[20px]">
							<span className="text-base-2 text-gray-muted">
								Vision
							</span>
							<h2 className="heading-2 text-primary-white">
								Gold & Pepper: A Synthesis of Expertise and
								Vision
							</h2>
						</div>
						<div className="flex flex-col gap-[20px] items-start">
							<p className="text-base-2 text-gray-light">
								Positioned at the confluence of the Middle
								Eastern and European business landscapes, Gold &
								Pepper represents a paradigm of excellence in
								the realm of business consultancy. Our
								institution is meticulously crafted upon pillars
								of professional acumen, industry foresight, and
								an unwavering commitment to stakeholder value.
							</p>
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
			</section>
			<section
				id="service"
				className="md:py-[80px] py-[60px] bg-primary-gray"
			>
				<div className="container">
					<div className="section__header">
						<div className="section__header">
							<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
								<h2 className="heading-2 text-primary-white">
									Gold & Pepper: A Synthesis of Expertise and
									Vision
								</h2>
								<p className="text-base-2 text-gray-light">
									Positioned at the confluence of the Middle
									Eastern and European business landscapes,
									Gold & Pepper represents a paradigm of
									excellence in the realm of business
									consultancy. Our institution is meticulously
									crafted upon pillars of professional acumen,
									industry foresight, and an unwavering
									commitment to stakeholder value.
								</p>
							</div>
						</div>
					</div>
					<div className="services__list">
						<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-[40px] gap-[25px] mt-[50px]">
							{AdvisoryServices.map((service, index) => (
								<ServiceCard
									key={index}
									data={service}
									link={false}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
			<section
				id="management"
				className="md:py-[80px] py-[60px] bg-primary-gray"
			>
				<div className="container">
					<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
						<div className="flex flex-col gap-[20px]">
							<span className="text-base-2 text-gray-muted">
								Invest
							</span>
							<h2 className="heading-4 text-primary-white">
								Unlock Your Financial Potential with Our
								Investment Platform
							</h2>
						</div>
					</div>
					<div className="grid lg:grid-cols-3 grid-cols-1 md:gap-[40px] gap-[60px] mt-[40px]">
						<div className="flex flex-col gap-[20px]">
							<h2 className="heading-2 text-primary-white">
								Management Services
							</h2>
							<p className="text-base-2 text-gray-light">
								Gold & Pepper's investment arm specializes in
								identifying, funding, and stewarding unique
								hospitality and real estate investment
								opportunities across diverse markets. With an
								unblemished track record, we have solidified our
								position as the preferred partner for private
								equity firms, individual investors, and
								institutional funds.
							</p>
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
						<div className="lg:col-span-2">
							<div className="grid sm:grid-cols-2 grid-cols-1 md:gap-[40px] gap-[30px]">
								{ManagementServices.map((service, index) => (
									<ServiceCard
										key={index}
										data={service}
										link={false}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default WhatWeDoPage;
