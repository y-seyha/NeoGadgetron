import React from "react";

import MainLayout from "@/components/layout/MainLayout";
import OrderSummary from "@/components/Cart/OrderSummary";
import PaymentSummary from "@/components/Cart/PaymentSummary";

const Cart: React.FC = () => {
  return (
    <MainLayout>
      <div>
        <h2 className="p-2 mb-5 text-4xl font-bold">Your Cart</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <OrderSummary />
          </div>
          <div>
            <PaymentSummary />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
