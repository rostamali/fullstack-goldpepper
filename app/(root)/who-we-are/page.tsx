import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TeamCard from './team-card';
import { TeamMembers } from '@/constants/content';
export const metadata = {
	title: 'Meet the Leaders in Investment Excellence | Our Story',
	description: `Get to know us, the leaders in investment excellence. Our story is rooted in professional integrity, precise market insight, and a commitment to your success`,
};
const AboutUs = () => {
	return (
		<>
			<section id="about-us-banner">
				<div className="container">
					<div className="flex items-center sm:h-[450px] h-[350px]">
						<h2 className="heading-2 text-primary-white">
							Who we are
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
							<span className="text-base-2 text-gray-light">
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
			<section id="about-us" className="py-[60px] bg-primary-gray">
				<div className="container">
					<div className="section__header">
						<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
							<h2 className="heading-2 text-gray-light">
								Gold & Pepper: A Synthesis of Expertise and
								Vision
							</h2>
							<p className="text-base-2 text-gray-light">
								Positioned at the confluence of the Middle
								Eastern and European business landscapes, Gold &
								Pepper represents a paradigm of excellence in
								the realm of business consultancy. Our
								institution is meticulously crafted upon pillars
								of professional acumen, industry foresight, and
								an unwavering commitment to stakeholder value.
							</p>
						</div>
					</div>
					<Image
						src={'/assets/gold-pepper-vision.jpg'}
						alt={`Gold & Pepper: A Synthesis of Expertise and Vision`}
						width={1280}
						height={853}
						className="w-full md:h-[550px] h-[300px] object-cover rounded-lg mt-[60px]"
					/>
				</div>
			</section>
			<section id="our-team" className="py-[60px] bg-primary-gray">
				<div className="container">
					<div className="section-header">
						<div className="flex flex-col gap-[20px]">
							<span className="text-base-2 text-gray-muted">
								About Us
							</span>
							<h2 className="heading-2 text-primary-white">
								Our team
							</h2>
						</div>
					</div>
					<div className="team-members mt-[60px]">
						<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
							{TeamMembers.map((team, index) => (
								<TeamCard
									name={team.name}
									title={team.title}
									description={team.description}
									thumbnail={team.icon}
									index={index}
									key={index}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
			<section id="networks" className="py-[60px] bg-primary-gray">
				<div className="container">
					<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px] items-center">
						<div className="flex flex-col gap-[25px]">
							<span className="text-base-2 text-gray-muted">
								Our Network
							</span>
							<div className="flex flex-col gap-[15px]">
								<h3 className="heading-3 text-primary-white">
									EUROPE - AD Advisory
								</h3>
								<p className="text-base-1 text-gray-muted">
									Renowned for its rigorous methodologies and
									client-centric approach, AD Advisory has
									been a stalwart in the European consultancy
									landscape since 2012. Their comprehensive
									service suite, combined with decades of
									collective expertise, positions them as a
									valuable ally in our quest for global
									excellence.
								</p>
							</div>
							<div className="flex flex-col gap-[15px]">
								<h3 className="heading-3 text-primary-white">
									MIDDLE EAST - IQ Hospitality
								</h3>
								<p className="text-base-1 text-gray-muted">
									Headquartered in Dubai, IQ Hospitality is a
									consultancy powerhouse specializing in F&B
									strategies. Their expansive service
									spectrum, coupled with collaborations with
									esteemed brands, amplifies our capacity to
									deliver unparalleled value to our clients.
								</p>
							</div>
							<p className="text-base-1 text-gray-muted">
								Headquartered in Dubai, IQ Hospitality is a
								consultancy powerhouse specializing in F&B
								strategies. Their expansive service spectrum,
								coupled with collaborations with esteemed
								brands, amplifies our capacity to deliver
								unparalleled value to our clients.
							</p>
						</div>
						<Image
							src={'/assets/business-network.jpg'}
							alt={'The Genesis of Gold & Pepper'}
							width={1280}
							height={853}
							priority={true}
							className="object-cover w-full md:h-[600px] h-[300px] rounded-lg"
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default AboutUs;
