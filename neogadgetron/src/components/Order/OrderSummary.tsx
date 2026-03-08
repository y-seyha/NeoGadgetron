import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/types";

interface SummaryProps {
  cart: CartItem[];
  totalPrice: number;
  handleCheckout: () => Promise<void>;
  processing: boolean;
}

export default function OrderSummary({
  cart,
  totalPrice,
  handleCheckout,
  processing,
}: SummaryProps) {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {cart.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}

        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${totalPrice}</span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        <Button
          className="w-full mt-4"
          onClick={handleCheckout}
          disabled={processing}
        >
          {processing ? "Processing..." : "Place Order"}
        </Button>
      </CardContent>
    </Card>
  );
}
