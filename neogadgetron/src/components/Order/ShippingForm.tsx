import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Dispatch, SetStateAction } from "react";

interface Shipping {
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

interface ShippingProps {
  shipping: Shipping;
  setShipping: Dispatch<SetStateAction<Shipping>>;
}

export default function ShippingForm({ shipping, setShipping }: ShippingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Address"
          value={shipping.address}
          onChange={(e) =>
            setShipping({ ...shipping, address: e.target.value })
          }
          className="input"
          required
        />

        <input
          placeholder="City"
          value={shipping.city}
          onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
          className="input"
          required
        />

        <input
          placeholder="Province"
          value={shipping.province}
          onChange={(e) =>
            setShipping({ ...shipping, province: e.target.value })
          }
          className="input"
          required
        />

        <input
          placeholder="Postal Code"
          value={shipping.postalCode}
          onChange={(e) =>
            setShipping({ ...shipping, postalCode: e.target.value })
          }
          className="input"
          required
        />
      </CardContent>
    </Card>
  );
}
