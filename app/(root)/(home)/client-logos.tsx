'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ClientList } from '@/constants/content';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Pagination } from 'swiper/modules';

const ClientLogos = () => {
	return (
		<div className="client-logo">
			<Swiper
				spaceBetween={15}
				breakpoints={{
					200: {
						slidesPerView: 1,
					},
					450: { slidesPerView: 2 },
					768: {
						slidesPerView: 3,
					},
					1020: {
						slidesPerView: 4,
					},
				}}
				className="mySwiper"
				pagination={{
					clickable: true,
				}}
				modules={[Pagination]}
			>
				{ClientList.map((item, index) => (
					<SwiperSlide key={index}>
						<Image
							src={`/assets/client-logo/${item.icon}`}
							alt={item.name}
							width={400}
							height={400}
							className="w-full h-[82px] rounded-md"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ClientLogos;
