import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CategoryPage from "./pages/dashboard/CategoryPage";
import AdminLayout from "./layouts/AdminLayout"
import type { JSX } from "@emotion/react/jsx-runtime";
import ProductsPage from "./pages/dashboard/ProductsPage";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard có bảo vệ */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<h1>Trang thống kê</h1>} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
