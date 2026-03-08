import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import axios from "axios";
import ContactForm from "@/components/Order/ContactForm";
import ShippingForm from "@/components/Order/ShippingForm";
import PaymentMethod from "@/components/Order/PaymentMethod";
import OrderSummary from "@/components/Order/OrderSummary";
import { toast } from "sonner";

export default function Order() {
  const { user, isAuthenticated } = useAuth();
  const { cart, clearCart, totalPrice } = useCart();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [processing, setProcessing] = useState(false);

  if (!isAuthenticated || !user)
    return <MainLayout>Please login to checkout</MainLayout>;

  const handleCheckout = async (): Promise<void> => {
    if (!cart.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (!contact.name || !contact.email || !contact.phone) {
      toast.error("Please complete all contact fields");
      return;
    }

    if (
      !shipping.address ||
      !shipping.city ||
      !shipping.province ||
      !shipping.postalCode
    ) {
      toast.error("Please complete all shipping fields");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setProcessing(true);

    try {
      const payload = {
        user_id: user.id,
        total_price: totalPrice,
        status: "pending",
        shipping_name: contact.name,
        shipping_phone: contact.phone,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        items: cart.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        payment_method: paymentMethod,
      };

      await axios.post("http://localhost:3000/api/v1/orders", payload, {
        withCredentials: true,
      });

      toast.success("Order placed successfully!");
      clearCart();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ContactForm contact={contact} setContact={setContact} />
            <ShippingForm shipping={shipping} setShipping={setShipping} />
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>

          <OrderSummary
            cart={cart}
            totalPrice={totalPrice}
            handleCheckout={handleCheckout}
            processing={processing}
          />
        </div>
      </div>
    </MainLayout>
  );
}
