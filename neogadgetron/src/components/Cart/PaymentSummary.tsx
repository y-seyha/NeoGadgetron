import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSummary() {
  const navigate = useNavigate();
  const { totalPrice, totalQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleOrder = () => {
    if (totalQuantity === 0) return;

    setIsLoading(true);
    navigate("/orders");
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <div className="border rounded-lg p-6 space-y-6">
      <div className="space-y-5">
        <h2 className="text-xl font-semibold">Payment Summary</h2>

        <div className="flex justify-between">
          <span>Items</span>
          <span>{totalQuantity}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>$0.00</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        <Button
          className="w-full"
          onClick={handleOrder}
          disabled={isLoading || totalQuantity === 0}
        >
          {isLoading ? "Redirecting..." : "Proceed to Checkout"}
        </Button>
      </div>
    </div>
  );
}
