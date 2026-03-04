import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sample products
const products = [
  { id: 1, name: "iPhone 15", price: "$999", image: "/images/product1.jpg" },
  { id: 2, name: "MacBook Pro", price: "$1999", image: "/images/product2.jpg" },
  { id: 3, name: "Smart Lamp", price: "$49", image: "/images/product3.jpg" },
  {
    id: 4,
    name: "Wireless Earbuds",
    price: "$129",
    image: "/images/product4.jpg",
  },
];

const FeaturedProductsCarousel = () => {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold mb-6">Best Sellers</h2>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="py-4">
            {products.map((prod) => (
              <CarouselItem key={prod.id}>
                <Card className="m-2 hover:scale-105 transition-transform duration-300">
                  <CardContent className="flex flex-col items-center">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="h-60 w-50 object-cover rounded-lg"
                    />
                    <h3 className="mt-2 font-semibold">{prod.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {prod.price}
                    </p>
                    <Button className="mt-2 w-full">Add to Cart</Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100" />
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedProductsCarousel;
