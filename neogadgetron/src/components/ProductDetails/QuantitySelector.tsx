import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (qty: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
}) => (
  <div className="flex items-center gap-2">
    <Button variant="outline" onClick={() => onChange(Math.max(1, quantity - 1))}>
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