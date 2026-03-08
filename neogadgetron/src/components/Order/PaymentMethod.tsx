import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}: PaymentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label>
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Credit Card
        </label>
      </CardContent>
    </Card>
  );
}
