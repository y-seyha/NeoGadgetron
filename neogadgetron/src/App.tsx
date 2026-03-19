import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth.provider";
import { CartProvider } from "./context/CartProvider";
import { ThemeProvider } from "./components/Theme/theme-provider";

import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Unauthorized from "./pages/unauthorzied/Unauthorized";
import NotFound from "./pages/unauthorzied/NotFound";
import OAuthRedirect from "./pages/Authentication/OAuthRedirect";
import OAuthSuccess from "./pages/Authentication/OAuthRedirect";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import Review from "./pages/Review";
import ProductDetailPage from "./pages/ProductDetails";
import CategoryPage from "./pages/Category";
import WishlistPage from "./pages/WishList";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster position="bottom-right" richColors />

          <Routes>
            {/* Public / Guest Routes */}
            <Route
              path="/login"
              element={
                <ProtectedRoute guestOnly>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute guestOnly>
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route path="/oauth-redirect" element={<OAuthRedirect />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />

            {/* Protected / Authenticated Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["customer", "seller", "admin"]}>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute allowedRoles={["customer", "seller", "admin"]}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRoles={["customer", "seller", "admin"]}>
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["customer", "seller", "admin"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/review"
              element={
                <ProtectedRoute allowedRoles={["customer", "seller", "admin"]}>
                  <Review />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute allowedRoles={["customer", "seller", "admin"]}>
                  <ProductDetailPage />
                </ProtectedRoute>
              }
            />

            {/* Open / Public Pages */}
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />

            {/* Unauthorized / 404 */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;