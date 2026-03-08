import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import cat1 from "@/assets/Cat1.webp";
import cat2 from "@/assets/Cat2.webp";
import cat3 from "@/assets/Cat3.webp";
import cat4 from "@/assets/Cat4.jpg";

// Sample categories
const categories = [
  {
    id: 1,
    name: "Phones",
    image: cat1,
    path: "/category/phones",
  },
  {
    id: 2,
    name: "Laptops",
    image: cat2,
    path: "/category/laptops",
  },
  {
    id: 3,
    name: "Smart Home",
    image: cat3,
    path: "/category/smart-home",
  },
  {
    id: 4,
    name: "Accessories",
    image: cat4,
    path: "/category/accessories",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} to={cat.path}>
            <Card className="hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div
                  className="h-40 w-full rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="text-center py-2 font-semibold">{cat.name}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
