import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth.provider";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ThemeProvider } from "./components/Theme/theme-provider";
import Homepage from "./pages/Homepage";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Unauthorized from "./pages/unauthorzied/Unauthorized";
import NotFound from "./pages/unauthorzied/NotFound";
import { CartProvider } from "./context/CartProvider";
import Cart from "./pages/Cart";
import OAuthRedirect from "./pages/Authentication/OAuthRedirect";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import Review from "./pages/Review";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster position="bottom-right" richColors />
          <Routes>
            {/* Public Routes  */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />

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

            
            {/* Authenticated Route  */}
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
            {/* Admin Route  */}
            {/* <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          /> */}

            {/* System Route  */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>{" "}
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
