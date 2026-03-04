import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Shield, LifeBuoy, Gift } from "lucide-react";

// Features
const features = [
  {
    id: 1,
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On orders over $50",
  },
  {
    id: 2,
    icon: Shield,
    title: "Secure Payments",
    subtitle: "100% secure checkout",
  },
  {
    id: 3,
    icon: LifeBuoy,
    title: "24/7 Support",
    subtitle: "We’re here to help",
  },
  {
    id: 4,
    icon: Gift,
    title: "Special Offers",
    subtitle: "Exclusive deals and discounts",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feat) => (
          <Card
            key={feat.id}
            className="p-4 flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <CardContent className="flex flex-col items-center gap-2">
              <feat.icon className="w-8 h-8 text-primary" />
              <h3 className="font-semibold">{feat.title}</h3>
              <p className="text-sm text-muted-foreground">{feat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
