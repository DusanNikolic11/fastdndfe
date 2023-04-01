import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Carousel = ({ images }: { images: string[] }) => {
  return (
    <div className="bg-beige-light/60 rounded-2xl p-5 flex basis-1/4">
      <Swiper
        slidesPerView={Math.min(images.length, 3)}
        modules={[Pagination]}
        className="mySwiper"
        spaceBetween={30}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <img src={image} alt={`slide ${image}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
