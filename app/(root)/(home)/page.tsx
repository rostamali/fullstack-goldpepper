import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import ServiceCard from '../what-we-do/service-card';
import {
	CounterDetails,
	FeatureList,
	HomeContactInfo,
} from '@/constants/content';
import ContactForm from '@/components/forms/contact-form';
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
							The Genesis of Gold & Pepper
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
			<section
				id="about-us"
				className="md:py-[80px] py-[60px] bg-primary-gray"
			>
				<div className="container">
					<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
						<div className="flex flex-col gap-[20px]">
							<span className="text-base-2 text-gray-muted">
								Invest
							</span>
							<h2 className="heading-2 text-primary-white">
								Unlock Your Financial Potential with Our
								Investment Platform
							</h2>
						</div>
						<div className="flex flex-col gap-[20px] items-start">
							<p className="text-base-2 text-gray-light">
								We are a leading investment portal, providing
								individuals with the tools and knowledge to make
								informed investment decisions. With our
								user-friendly platform and expert guidance, you
								can confidently navigate the world of investing
								and achieve your financial goals.
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
				</div>
			</section>
			<section
				id="feature-list"
				className="md:py-[80px] py-[60px] bg-primary-gray"
			>
				<div className="container">
					<div className="feature-header">
						<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
							<div className="flex flex-col gap-[20px]">
								<h2 className="heading-2 text-primary-white">
									Discover the Power of Our Investment
									Platform
								</h2>
							</div>
							<div className="flex flex-col gap-[20px] items-start">
								<p className="text-base-2 text-gray-light">
									With our user-friendly interface, you can
									easily track your investments, analyze
									performance, and access real-time market
									data. Take control of your financial future
									today.
								</p>
							</div>
						</div>
					</div>
					<div className="feature-items mt-[60px]">
						<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
							{FeatureList.map((feature, index) => (
								<ServiceCard
									key={index}
									data={feature}
									link={true}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
			<section
				id="home-cta-banner"
				className="py-[100px] bg-cover md:bg-center bg-right"
			>
				<div className="container">
					<div className="banner-header">
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
					</div>
					<div className="cta-banner-logos mt-[80px]">
						<div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-[20px] items-center">
							{[1, 2, 3, 4, 5].map((item, index) => (
								<Image
									src={`/assets/client-logo/1000${item}.png`}
									alt={'Client logo'}
									width={113}
									height={80}
									key={index}
									className="object-contain w-auto h-[60px]"
								/>
							))}
						</div>
					</div>
				</div>
			</section>
			<section className="md:py-[80px] py-[60px] bg-primary-gray">
				<div className="container">
					<div className="grid sm:grid-cols-3 grid-cols-1 gap-[25px]">
						{CounterDetails.map((item, index) => (
							<div className="space-y-3" key={index}>
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
			<section
				id="contact-details"
				className="md:py-[80px] py-[60px] bg-primary-gray"
			>
				<div className="container">
					<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px]">
						<div>
							<div className="contact-header">
								<div className="space-y-4">
									<span className="text-base-2 text-gray-muted">
										Contact
									</span>
									<h2 className="heading-2 text-primary-white">
										Contact with us
									</h2>
									<p className="text-base-2 text-gray-light">
										Have questions or inquiries? We'd love
										to hear from you! Our dedicated team is
										here to provide assistance and support.
										Feel free to reach out through the
										contact form below, and we'll get back
										to you as soon as possible.
									</p>
								</div>
							</div>
							<div className="space-y-6 mt-[40px]">
								{HomeContactInfo.map((item, index) => (
									<div
										key={index}
										className="flex items-center gap-2"
									>
										<div className="h-[45px] w-[45px] bg-primary-gold rounded-md flex-center text-gray-muted">
											<item.icon size={25} />
										</div>
										<div className="space-y-1">
											<p className="text-base-1 text-primary-white">
												{item.title}
											</p>
											<p className="text-base-2 text-gray-light">
												{item.linkText}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="contact-form">
							<ContactForm />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
