import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/hooks/useCart";
import { ProductImage } from "@/components/ProductDetails/ProductImage";
import { RelatedProducts } from "@/components/ProductDetails/RelatedProductst";
import { ProductInfo } from "@/components/ProductDetails/ProductInfo";
import type { Product } from "@/types";
import { ProductTabs } from "@/components/ProductDetails/ProductTabs";
import Loading from "@/components/common/Loading";

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
          setRelated(relatedProducts.filter((p: Product) => p.id !== prod.id));
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
        { product_id: product.id, quantity },
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

  if (loading || !product) return <Loading />;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <ProductImage
              src={activeImage}
              alt={product.name ?? ""}
              className="transition-transform duration-300 group-hover:scale-105"
              height="400px"
            />
            {related.length > 0 && <RelatedProducts products={related} />}
          </div>
          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            added={added}
          />
        </div>
        <ProductTabs product={product} />
      </div>
    </MainLayout>
  );
}
