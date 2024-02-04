'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ClientList } from '@/constants/content';
import Image from 'next/image';
import 'swiper/css';

const ClientLogos = () => {
	return (
		<Swiper
			spaceBetween={15}
			slidesPerView={2}
			breakpoints={{
				768: {
					slidesPerView: 3,
				},
				1020: {
					slidesPerView: 4,
				},
			}}
			autoplay={true}
		>
			{ClientList.map((item, index) => (
				<SwiperSlide key={index}>
					<div className="flex-center">
						<Image
							src={`/assets/client-logo/${item.icon}`}
							alt=""
							width={400}
							height={400}
							className="w-full rounded-md"
						/>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default ClientLogos;
