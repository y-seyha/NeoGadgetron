import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ProductImage } from "./ProductImage";
import type { Product } from "@/types";

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">Related Products</h2>
    <ScrollArea className="h-48">
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <Link key={p.id} to={`/products/${p.id}`}>
            <Card className="p-2 hover:shadow-lg transition">
              <CardContent className="space-y-2">
                <ProductImage src={p.image_url ?? ""} alt={p.name ?? ""} className="w-full h-28" />
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