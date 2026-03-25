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
  category_name?: string;
  created_at: string;
  updated_at: string;
  image_url?: string | null;
  image_public_id?: string | null;
}

export interface Shipping {
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
  is_verified: boolean;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
  };
  product?: {
    id: number;
    name: string;
    price: string;
    stock: number;
    image: string;
  };
}

export interface OrderItem {
  id: string;
  order_item_id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  item_price: string;
  status: "pending" | "shipped" | "delivered";
  created_at: string;
  updated_at: string;
}

export interface Analytics {
  revenue: {
    total_orders: number;
    total_revenue: number;
  };
  reviews: Review[];
}
