import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CounterDetails, FeatureList } from '@/constants/content';
import { ChevronRight } from 'lucide-react';
import ClientLogos from './client-logos';
export const metadata = {
	title: 'Unlock Your Financial Potential | Leading Investment Porta',
	description:
		'Discover a world of financial possibilities with our leading investment portal. Empowering you with expert guidance and user-friendly tools for confident investment decisions.',
};

export default function Home() {
	return (
		<>
			<section
				className="md:h-[800px] h-[600px] bg-cover bg-no-repeat"
				style={{
					backgroundImage: `url(/assets/home-hero-banner.png)`,
				}}
			>
				<div className="container flex-center h-full text-center">
					<div className="flex flex-col items-center gap-[30px] md:w-[60%] w-full">
						<h1 className="heading-1 text-primary-white text-center">
							The Genesis of
							<br />
							Gold & Pepper
						</h1>
						<p className="text-base-1 text-gray-light text-center">
							Situated at the strategic nexus between the Middle
							Eastern and European markets, Gold & Pepper was
							conceived to address the nuanced demands of the
							hospitality sector. Our foundation is anchored in
							the principles of professional integrity, precise
							market insight, and unwavering commitment to client
							success.
						</p>
						<div className="flex items-center gap-[15px]">
							<Link href="/who-we-are">
								<Button className="btn-primary-lg">
									About us
								</Button>
							</Link>
							<Link href="/project">
								<Button className="btn-ghost-lg !text-white">
									Portals
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-primary-gray md:py-[80px] py-[60px] space-y-28">
				{/* Short info */}
				<div className="container">
					<div className="space-y-2">
						<h2 className="heading-2 text-primary-white">
							Discover the Power of Our Investment Platform
						</h2>
						<p className="text-base-1 text-gray-light">
							Situated at the strategic nexus between the Middle
							Eastern and European markets, Gold & Pepper was
							conceived to address the nuanced demands of the
							hospitality sector. Our foundation is anchored in
							the principles of professional integrity, precise
							market insight, and unwavering commitment to client
							success.
						</p>
					</div>
					<div className="about-features mt-[40px]">
						<div className="grid md:grid-cols-2 grid-cols-1 gap-[40px]">
							{[1, 2].map((item, index) => (
								<div key={index} className="space-y-3">
									<h4 className="heading-4 text-white border-l-[4px] border-primary-gold leading-[1em] pl-2">
										Vision & Mission
									</h4>
									<p className="text-base-1 text-gray-light">
										Gold & Pepper was founded with a
										singular vision: To elevate the
										standards of business consultancy by
										offering unparalleled expertise tailored
										to the unique challenge and
										opportunities inherent in the
										hospitality industry. Our mission is to
										empower our clients with actionable
										strategies, ensuring sustainable growth
										and competitive advantage in an ever-
										evolving global marketplace.
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Features */}
				<div className="container">
					<div className="feature-items mt-[60px]">
						{FeatureList.map((item, index) => (
							<Link
								key={index}
								href={item.url}
								className="border-t last:border-b border-gray-50 flex items-center justify-between py-4 duration-150 hover:bg-gray-light hover:bg-opacity-30"
							>
								<div className="space-y-1.5 flex-1">
									<h5 className="heading-5 text-white">
										{item.name}
									</h5>
									<p className="text-base-1 text-gray-light">
										{item.description}
									</p>
								</div>
								<ChevronRight
									size={50}
									className="text-gray-muted max-sm:hidden"
								/>
							</Link>
						))}
					</div>
				</div>

				{/* CTA banner */}
				<div className="container">
					<div
						className="md:p-10 p-4 rounded-md bg-cover"
						id="home-cta-banner"
					>
						<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
							<div className="flex flex-col gap-[20px]">
								<span className="text-base-2 text-primary-white">
									Invest
								</span>
								<h2 className="heading-2 text-primary-white">
									Unlock Your Financial Potential with Our
									Investment Platform
								</h2>
							</div>
							<div className="flex flex-col gap-[20px] items-start">
								<p className="text-base-2 text-gray-light">
									We are a leading investment portal,
									providing individuals with the tools and
									knowledge to make informed investment
									decisions. With our user-friendly platform
									and expert guidance, you can confidently
									navigate the world of investing and achieve
									your financial goals.
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
										</Button>
									</Link>
								</div>
							</div>
						</div>

						<div className="cta-banner-logos mt-[60px]">
							<ClientLogos />
						</div>
					</div>
				</div>

				{/* Counter */}
				<div className="container">
					<div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[25px]">
						{CounterDetails.map((item, index) => (
							<div
								className="space-y-3 text-center max-sm:text-left"
								key={index}
							>
								<h1 className="heading-1 text-gray-light">
									{item.counter}
								</h1>
								<h4 className="heading-5 text-gray-muted">
									{item.label}
								</h4>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
