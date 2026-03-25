import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Product } from "@/types";


interface ProductTabsProps {
  product: Product;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => (
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
);