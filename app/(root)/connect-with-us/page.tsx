import { Button } from '@/components/ui/button';
import { GlobalFootprint } from '@/constants/content';
import Image from 'next/image';
import Link from 'next/link';
import LocationCard from './location-card';
export const metadata = {
	title: 'Engage with Investment Excellence | Connect Today',
	description: `Connect with us, your gateway to investment excellence. Reach out for inquiries, guidance, or simply to start your journey towards informed investment decisions.`,
};

const ConnectUs = () => {
	return (
		<>
			<section id="connect-us-banner">
				<div className="container">
					<div className="flex items-center sm:h-[450px] h-[350px]">
						<h2 className="heading-2 text-primary-white">
							Connect with us
						</h2>
					</div>
				</div>
			</section>
			<section id="about-us" className="py-[60px] bg-primary-gray">
				<div className="container">
					<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
						<div className="flex flex-col gap-[20px]">
							<span className="text-base-2 text-gray-muted">
								Vision
							</span>
							<h2 className="heading-2 text-primary-white">
								Engage with Gold & Pepper: A Gateway to
								Expertise
							</h2>
						</div>
						<div className="flex flex-col gap-[20px] items-start">
							<p className="text-base-2 text-gray-light">
								In the dynamic realm of hospitality consultancy,
								effective communication and timely engagement
								are paramount. At Gold & Pepper, we prioritize
								accessibility and responsiveness, ensuring that
								our clients and partners always have a direct
								channel to our expertise.
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
			<section id="about-us" className="py-[60px] bg-primary-gray">
				<div className="container">
					<div className="section__header">
						<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
							<div className="flex flex-col gap-[20px]">
								<h2 className="heading-2 text-primary-white">
									Our Global Footprint
								</h2>
								<p className="text-base-2 text-gray-light">
									Gold & Pepper's expansive operational
									network spans strategic locations,
									positioning us to serve diverse market needs
									with agility and precision.
								</p>
							</div>
						</div>
					</div>
					<div className="mt-[50px]">
						<div className="flex flex-col gap-[60px]">
							{GlobalFootprint.map((office, index) => (
								<LocationCard
									key={index}
									title={office.title}
									location={office.location}
									telephone={office.telephone}
									email={office.email}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
			<section id="Contact" className="py-[60px] bg-primary-gray">
				<div className="container">
					<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px] items-center">
						<div className="flex flex-col gap-[25px]">
							<span className="text-base-2 text-gray-muted">
								Our Journey
							</span>
							<div className="flex flex-col gap-[15px]">
								<h3 className="heading-3 text-primary-white">
									Embrace the Future with Gold & Pepper
								</h3>
								<p className="text-base-1 text-gray-light">
									Your journey towards industry leadership and
									sustainable growth is but a conversation
									away. Engage with Gold & Pepper today and
									unlock a world of strategic insights,
									tailored solutions, and unparalleled
									expertise.
								</p>
							</div>
							<div className="flex items-center gap-[15px]">
								<Link href="/who-we-are">
									<Button className="btn-primary-sm">
										About us
									</Button>
								</Link>
								<Link href="/">
									<Button className="btn-ghost-sm">
										Contact
									</Button>
								</Link>
							</div>
						</div>
						<Image
							src={'/assets/our-journey.jpg'}
							alt={'The Genesis of Gold & Pepper'}
							width={1279}
							height={854}
							priority={true}
							className="object-cover w-full h-[300px] rounded-lg"
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default ConnectUs;
