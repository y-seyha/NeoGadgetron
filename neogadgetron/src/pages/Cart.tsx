import React from "react";

import MainLayout from "@/components/layout/MainLayout";
import OrderSummary from "@/components/Cart/OrderSummary";
import PaymentSummary from "@/components/Cart/PaymentSummary";

const Cart: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-5 text-4xl font-bold pt-5">Your Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <OrderSummary />
          </div>
          <div className="space-y-4">
            <PaymentSummary />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
