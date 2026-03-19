import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import type { Product } from "@/types";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/hooks/useCart";


const ProductImage = ({
  src,
  alt,
  onClick,
  className = "",
  height = "400px", // default height
  width = "100%", // default width
}: {
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
  height?: string | number;
  width?: string | number;
}) => (
  <div
    onClick={onClick}
    className={`overflow-hidden rounded ${className}`}
    style={{
      width,
      height,
    }}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

interface QuantitySelectorProps {
  quantity: number;
  onChange: (qty: number) => void;
}

const QuantitySelector = ({ quantity, onChange }: QuantitySelectorProps) => (
  <div className="flex items-center gap-2">
    <Button
      variant="outline"
      onClick={() => onChange(Math.max(1, quantity - 1))}
    >
      -
    </Button>

    <Input
      type="number"
      value={quantity}
      min={1}
      step={1}
      className="w-16 text-center"
      onChange={(e) => {
        const val = Number(e.target.value);
        if (!isNaN(val) && val >= 1) onChange(val);
      }}
    />

    <Button variant="outline" onClick={() => onChange(quantity + 1)}>
      +
    </Button>
  </div>
);


const RelatedProducts = ({ products }: { products: Product[] }) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">Related Products</h2>
    <ScrollArea className="h-48">
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <Link key={p.id} to={`/products/${p.id}`}>
            <Card key={p.id} className="p-2 hover:shadow-lg transition">
              <CardContent className="space-y-2">
                <ProductImage
                  src={p.image_url ?? ""}
                  alt={p.name ?? ""}
                  className="w-full h-28"
                />
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-primary font-semibold">${p.price}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ScrollArea>
  </div>
);

export default function ProductDetailPage() {
  const { addToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1); 
  const [added, setAdded] = useState(false);

 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/products/${id}`,
        );
        const prod = res.data as Product;
        setProduct(prod);
        setActiveImage(prod.image_url ?? "");

        if (prod.category_id) {
          const relatedRes = await axios.get(
            `http://localhost:3000/api/v1/products/category/${prod.category_id}`,
          );
          const relatedProducts = relatedRes.data.products || [];
          const filtered = relatedProducts.filter(
            (p: Product) => p.id !== prod.id,
          );
          setRelated(filtered);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/cart-items",
        {
          product_id: product.id,
          quantity: quantity,
        },
        { withCredentials: true },
      );

      const cartItemFromBackend = response.data;

      addToCart({
        id: cartItemFromBackend.id,
        cartId: cartItemFromBackend.cart_id,
        productId: cartItemFromBackend.product_id,
        quantity: cartItemFromBackend.quantity,
        name: product.name,
        price: Number(product.price),
        image: product.image_url || "",
      });

      setAdded(true);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  if (loading || !product) return <p>Loading...</p>;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT: Images + Related */}
          <div className="md:col-span-2 space-y-6">
            <div className="border rounded-lg overflow-hidden group">
              <div className="border rounded-lg group">
                <ProductImage
                  src={activeImage}
                  alt={product.name ?? ""}
                  className="transition-transform duration-300 group-hover:scale-105"
                  height="400px"
                />
              </div>
            </div>

            {/* <div className="flex gap-2 mt-2">
              <ProductImage
                src={product.image_url ?? ""}
                alt={product.name ?? ""}
                onClick={() => setActiveImage(product.image_url ?? "")}
                className="w-20 h-20 border border-primary"
              />
            </div> */}

            {related.length > 0 && <RelatedProducts products={related} />}
          </div>

          {/* RIGHT: Info + Actions */}
          <div className="space-y-4 sticky top-24">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary">
              ${product.price}
            </p>
            <p
              className={`font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.stock > 0
                ? `✔ In Stock (${product.stock})`
                : "Out of Stock"}
            </p>
            <p className="text-gray-600">{product.description}</p>

            {/* Quantity Selector ONLY local */}
            <QuantitySelector quantity={quantity} onChange={setQuantity} />

            <div className="space-y-2">
              <Button
                className="w-full bg-primary text-white"
                onClick={handleAddToCart}
              >
                {added ? "Added" : "Add to Cart"}
              </Button>
              <Button variant="outline" className="w-full">
                Buy Now
              </Button>
              <Button variant="ghost" className="w-full text-red-500">
                ♡ Add to Wishlist
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="space-y-4">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="specs">
              <p>Specs coming soon...</p>
            </TabsContent>
            <TabsContent value="reviews">
              <p>Reviews coming soon...</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
