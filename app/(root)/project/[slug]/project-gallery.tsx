'use client';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useState, FC } from 'react';
import type { Swiper as SwiperSliderType } from 'swiper';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
type GalleryProps = {
	gallery: {
		url: string;
	}[];
	alt: string;
};

const ProjectGallery: FC<GalleryProps> = ({ gallery, alt }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperSliderType | null>(
		null,
	);
	return (
		<div className="product-gallery">
			<Swiper
				spaceBetween={10}
				navigation={{
					nextEl: '.gallery-arrow-left',
					prevEl: '.gallery-arrow-right',
				}}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className="relative rounded-md"
			>
				{gallery.map((slide, index) => (
					<SwiperSlide key={index}>
						<div className="flex-center">
							<Image
								src={`/uploads/files/${slide.url}`}
								alt={alt}
								width={800}
								height={800}
								className="object-cover w-full h-[380px]"
							/>
						</div>
					</SwiperSlide>
				))}
				<button className="gallery-arrow gallery-arrow-left">
					<ChevronLeft />
				</button>
				<button className="gallery-arrow gallery-arrow-right">
					<ChevronRight />
				</button>
			</Swiper>
			{gallery.length > 1 && (
				<Swiper
					onSwiper={setThumbsSwiper}
					spaceBetween={15}
					slidesPerView={4}
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
					className="mt-[15px]"
				>
					{gallery.map((thumb, index) => (
						<SwiperSlide key={index}>
							<div className="bg-white flex-center rounded-md">
								<Image
									src={`/uploads/files/${thumb.url}`}
									alt={alt}
									width={400}
									height={400}
									className="object-cover w-full h-[100px] rounded shadow-sm"
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
};

export default ProjectGallery;
