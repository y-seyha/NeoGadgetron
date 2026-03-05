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
import OAuthRedirect from "./pages/Authentication/OAuthRedirect";
import Cart from "./pages/Cart";
import { CartItemProvider } from "./context/CartItem.provider";

const App = () => {
  return (
    <AuthProvider>
      <CartItemProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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

          <Toaster position="bottom-right" richColors />
        </ThemeProvider>{" "}
      </CartItemProvider>
    </AuthProvider>
  );
};

export default App;
