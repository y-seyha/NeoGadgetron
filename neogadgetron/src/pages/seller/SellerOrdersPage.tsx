// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import MainLayout from "@/components/layout/MainLayout";
// import { useAuth } from "@/hooks/useAuth";
// import axios from "axios";
// import { toast } from "sonner";

// export interface Order {
//   id: string;
//   user_id: string;
//   buyer_name: string;
//   buyer_email: string;
//   total: number;
//   status: "pending" | "shipped" | "delivered" | "cancelled";
//   created_at: string;
// }

// const SellerOrdersPage = () => {
//   const { user } = useAuth();
//   const sellerId = user?.id;

//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchOrders = async () => {
//     if (!sellerId) return;
//     setLoading(true);
//     try {
//       const res = await axios.get<Order[]>(
//         `http://localhost:3000/api/v1/sellers/${sellerId}/orders`,
//         { withCredentials: true },
//       );
//       setOrders(res.data ?? []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     void fetchOrders();
//   }, [sellerId]);

//   // Filter orders by buyer name/email
//   const filteredOrders = orders.filter(
//     (order) =>
//       order.buyer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.buyer_email.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   return (
//     <MainLayout>
//       <div className="flex flex-col gap-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div className="flex flex-col gap-2 w-full sm:w-auto">
//             <h1 className="text-3xl font-bold">Seller Orders</h1>
//             <p className="text-gray-500 mt-1">Manage all your orders here</p>
//             <Input
//               placeholder="Search by buyer name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="mt-2 w-full sm:w-80"
//             />
//           </div>
//           <Button onClick={() => void fetchOrders()}>Refresh Orders</Button>
//         </div>

//         <div className="bg-gray-50 dark:bg-black shadow border rounded-2xl">
//           {/* Table Header */}
//           <div className="py-2 hidden sm:grid grid-cols-6 border bg-gray-100 dark:bg-black p-2 rounded-t font-semibold text-gray-700 dark:text-gray-100">
//             <div>Order ID</div>
//             <div>Buyer</div>
//             <div>Email</div>
//             <div>Total</div>
//             <div>Status</div>
//             <div>Created At</div>
//           </div>

//           {/* Table Rows */}
//           <div className="flex flex-col gap-1">
//             {loading ? (
//               <p className="p-4">Loading orders...</p>
//             ) : filteredOrders.length === 0 ? (
//               <p className="p-4 text-gray-500">No orders found.</p>
//             ) : (
//               filteredOrders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="grid sm:grid-cols-6 gap-2 items-center bg-white dark:bg-black p-2 hover:shadow transition border rounded-lg"
//                 >
//                   <div className="truncate">{order.id}</div>
//                   <div className="truncate">{order.buyer_name}</div>
//                   <div className="truncate">{order.buyer_email}</div>
//                   <div>${order.total.toFixed(2)}</div>
//                   <div className="capitalize">{order.status}</div>
//                   <div>{new Date(order.created_at).toLocaleString()}</div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default SellerOrdersPage;

import MainLayout from "@/components/layout/MainLayout";


const SellerOrdersPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl">Coming Soon....</h2>
      </div>
    </MainLayout>
  );
};

export default SellerOrdersPage;
