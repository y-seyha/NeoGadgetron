import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Phones", path: "/category/phones" },
  { id: 2, name: "Laptops", path: "/category/laptops" },
  { id: 3, name: "Smart Home", path: "/category/smart-home" },
  { id: 4, name: "Accessories", path: "/category/accessories" },
];

const FeaturedCategories = () => {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
      <div className="flex flex-row gap-4 justify-start">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={cat.path}
            className="flex-1 text-center py-5 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
