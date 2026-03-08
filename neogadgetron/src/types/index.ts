export type CartItem = {
  id: number;
  cartId?: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export interface Product {
  cart_id: number;
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  category_name?: string; // optional
  created_at: string;
  updated_at: string;
  image_url: string | null;
  image_public_id: string | null;
}

export interface Shipping {
  address: string;
  city: string;
  province: string;
  postalCode: string;
}
