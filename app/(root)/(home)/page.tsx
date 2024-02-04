import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HomeWhatWeDo, CounterDetails, FeatureList } from '@/constants/content';
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
							Empowering Innovation
							<br />
							Driving Growth
						</h1>
						<p className="text-base-1 text-gray-light text-center">
							At Gold & Pepper Consulting, we are more than just a
							conduit between markets; we are your partners in
							turning vision into reality. Positioned at the
							strategic nexus of the Middle Eastern and European
							markets, our expertise encompasses hospitality, real
							estate, manufacturing, and more. We are dedicated to
							guiding your business through its growth journey,
							offering bespoke solutions that align with your
							unique needs and ambitions.
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
			<section className="bg-primary-gray md:py-[80px] py-[60px] space-y-20">
				{/* Short info */}
				<div className="container space-y-12">
					<div className="space-y-2">
						<div className="space-y-1">
							<span className="text-base-2 text-gray-light">
								About Us
							</span>
							<h2 className="heading-2 text-primary-white">
								Together, Crafting Tomorrow's Success Stories
							</h2>
						</div>
						<p className="text-base-1 text-gray-light">
							Gold & Pepper Consulting represents the intersection
							of professionalism and passion. As your strategic
							allies, we immerse ourselves in the intricacies of
							your business, providing insights and strategies
							that pave the way for sustainable growth and a
							competitive edge. Our commitment is deeply rooted in
							understanding the diverse challenges and
							opportunities you face, ensuring a partnership that
							transcends traditional consultancy.
						</p>
					</div>
					<div className="about-features">
						<div className="grid md:grid-cols-2 grid-cols-1 gap-[40px]">
							<div className="space-y-3">
								<h4 className="heading-4 text-white border-l-[4px] border-primary-gold leading-[1em] pl-2">
									A Team Committed to Your Story
								</h4>
								<p className="text-base-1 text-gray-light">
									Your greatest asset at Gold & Pepper
									Consulting is our team. With a global
									outlook and a commitment to excellence, we
									are here to support your journey at every
									step. Our expertise is complemented by our
									dedication to your success, ensuring that
									together, we achieve extraordinary results.
								</p>
							</div>
							<div className="space-y-3">
								<h4 className="heading-4 text-white border-l-[4px] border-primary-gold leading-[1em] pl-2">
									Unlocking Potential, Together
								</h4>
								<p className="text-base-1 text-gray-light">
									The path to success begins with a
									conversation. At Gold & Pepper Consulting,
									we are prepared to listen, understand, and
									act on your vision. Reach out to us, and
									let's uncover the vast opportunities
									awaiting your business in the dynamic arena
									of global commerce.
								</p>
							</div>
						</div>
					</div>
					<div className="space-y-2">
						<div className="space-y-1">
							<span className="text-base-2 text-gray-light">
								Our Vision & Mission
							</span>
							<h2 className="heading-2 text-primary-white">
								A Shared Path to Excellence
							</h2>
						</div>
						<p className="text-base-1 text-gray-light">
							Our mission is to redefine the essence of business
							consultancy by merging our expertise with your
							distinct business requirements. In the ever-evolving
							global marketplace, we stand alongside you,
							empowering your business with actionable strategies
							that promote growth, innovation, and lasting
							success.
						</p>
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

				{/* What we do */}
				<div className="container">
					<div className="space-y-10">
						<div className="space-y-2">
							<div className="space-y-1">
								<span className="text-base-2 text-gray-light">
									What We Do
								</span>
								<h2 className="heading-2 text-primary-white">
									Innovation, Investment, Growth
								</h2>
							</div>
							<p className="text-base-1 text-gray-light">
								Gold & Pepper Consulting delivers a range of
								strategic solutions tailored to support your
								business at every stage of its journey. From
								facilitating market entry and expansion to
								forging connections with investors and strategic
								partners, our approach is as varied as the
								industries we serve. Whether you're focused on
								hospitality, real estate, manufacturing,
								aviation, or any other sector, our commitment is
								to arm you with the expertise and support
								necessary to flourish.
							</p>
						</div>
						<ul className="flex flex-col gap-[60px]">
							{HomeWhatWeDo.map((item, index) => (
								<li
									key={index}
									className="grid md:grid-cols-4 grid-cols-1 gap-[20px]"
								>
									<h4 className="heading-4 uppercase text-white">
										{item.title}
									</h4>
									<p className="md:col-span-3 text-base-1 text-gray-light">
										{item.description}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Features */}
				{/* <div className="container">
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
				</div> */}
			</section>
		</>
	);
}
