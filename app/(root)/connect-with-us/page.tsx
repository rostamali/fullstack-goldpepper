import { Button } from '@/components/ui/button';
import { GlobalFootprint } from '@/constants/content';
import Image from 'next/image';
import Link from 'next/link';
import LocationCard from './location-card';
import ContactForm from '@/components/forms/contact-form';
export const metadata = {
	title: 'Engage with Investment Excellence | Connect Today',
	description: `Connect with us, your gateway to investment excellence. Reach out for inquiries, guidance, or simply to start your journey towards informed investment decisions.`,
};

const ConnectUs = () => {
	return (
		<section className="pt-[150px] pb-[50px] space-y-24 bg-primary-gray">
			{/* Details */}
			<div className="container">
				<div className="section__header">
					<h2 className="heading-2 text-white">
						Engage with Gold & Pepper: A Gateway to Expertise
					</h2>
					<p className="text-base-1 text-gray-light mt-[10px]">
						In the fast-paced world of business consultancy,
						effective communication and timely engagement stand at
						the forefront of success. At Gold & Pepper Consulting,
						we place a high priority on accessibility and
						responsiveness, ensuring that our clients and partners
						have seamless access to our wealth of expertise.
					</p>
				</div>
			</div>

			{/* Global Footprint */}
			<div className="container space-y-10">
				<div className="section__header">
					<h2 className="heading-2 text-white">
						Our Global Footprint
					</h2>
					<p className="text-base-1 text-gray-light mt-[10px]">
						Gold & Pepper Consulting boasts an extensive operational
						network across strategic locations, enabling us to meet
						the diverse needs of our clients with agility and
						precision.
					</p>
				</div>
				<div className="area">
					<ul className="flex flex-col gap-[60px]">
						{GlobalFootprint.map((item, index) => (
							<li
								key={index}
								className="grid md:grid-cols-4 grid-cols-1 gap-[20px]"
							>
								<h4 className="heading-4 uppercase text-white">
									{item.title}
								</h4>
								<div className="md:col-span-3 space-y-2">
									<div className="info__item">
										<p className="text-base-1 text-gray-light !font-medium">
											Location:
											<span className="font-normal ml-1">
												{item.location}
											</span>
										</p>
									</div>
									<div className="info__item">
										<p className="text-base-1 text-gray-light !font-medium group">
											Telephone:
											<Link
												scroll={false}
												href={`tel:${item.telephone}`}
												className="group-hover:text-primary-gold ml-1"
											>
												{item.telephone}
											</Link>
										</p>
									</div>
									<div className="info__item">
										<p className="text-base-1 text-gray-light !font-medium group">
											E-mail:
											<Link
												scroll={false}
												href={`mailto:${item.email}`}
												className="group-hover:text-primary-gold ml-1"
											>
												{item.email}
											</Link>
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Short info */}
			<div className="container space-y-6">
				<div className="section__header">
					<h2 className="heading-2 text-white">
						Embrace the Future with Gold & Pepper
					</h2>
					<p className="text-base-1 text-gray-light mt-[10px]">
						Your path to industry leadership and sustainable growth
						begins with a single conversation. By engaging with Gold
						& Pepper Consulting, you unlock a realm of strategic
						insights, bespoke solutions, and unmatched expertise.
						Let's embark on this journey together, shaping the
						future of your business with precision, innovation, and
						strategic foresight.
					</p>
				</div>
				<ContactForm />
			</div>
		</section>
	);
};

export default ConnectUs;
