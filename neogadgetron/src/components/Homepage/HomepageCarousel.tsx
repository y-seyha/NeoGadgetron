import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import banner1 from "@/assets/ecommerce1.png";
import banner2 from "@/assets/ecommerce2.png";
import banner3 from "@/assets/ecommerce3.png";

const banners = [
  {
    id: 1,
    image: banner1,
    title: "Latest Electronics",
    subtitle: "Upgrade your gadgets today",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: banner2,
    title: "Smart Home Deals",
    subtitle: "Make your home smarter",
    cta: "Explore",
  },
  {
    id: 3,
    image: banner3,
    title: "Accessories Collection",
    subtitle: "Top accessories for your devices",
    cta: "Browse",
  },
];

const HomepageCarousel = () => {
  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      <Carousel
        className="w-full h-full"
        // plugins={[
        //   Autoplay({
        //     delay: 2000,
        //   }),
        // ]}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div
                className="relative w-full h-96 bg-gray-200"
                style={{
                  backgroundImage: `url(${banner.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start px-8 md:px-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                    {banner.title}
                  </h2>
                  {banner.subtitle && (
                    <p className="text-white mb-4 text-sm md:text-lg">
                      {banner.subtitle}
                    </p>
                  )}
                  {banner.cta && (
                    <Button size="lg" className="bg-primary text-white">
                      {banner.cta}
                    </Button>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Optional navigation arrows */}
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 z-10" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 z-10" />
      </Carousel>
    </div>
  );
};

export default HomepageCarousel;
