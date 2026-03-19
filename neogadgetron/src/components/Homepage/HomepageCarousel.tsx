import Slider from "react-slick";
import { Button } from "@/components/ui/button";
import banner1 from "@/assets/C05.avif";
import banner2 from "@/assets/Co2.jpg";
import banner3 from "@/assets/Co3.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const banners = [
  { id: 1, image: banner1, title: "Latest Electronics", subtitle: "Upgrade your gadgets today", cta: "Shop Now" },
  { id: 2, image: banner2, title: "Smart Home Deals", subtitle: "Make your home smarter", cta: "Explore" },
  { id: 3, image: banner3, title: "Accessories Collection", subtitle: "Top accessories for your devices", cta: "Browse" },
];

export default function HomepageCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
    fade: false,
    cssEase: "ease-in-out",
  };

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden relative">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative w-full h-96">
            <img src={banner.image} alt={banner.title} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start px-8 md:px-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{banner.title}</h2>
              {banner.subtitle && <p className="text-white mb-4 text-sm md:text-lg">{banner.subtitle}</p>}
              {banner.cta && <Button size="lg" variant="ghost" className="bg-primary text-white dark:bg-black">{banner.cta}</Button>}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}