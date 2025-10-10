import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CategoryPage from "./pages/dashboard/CategoryPage";
import AdminLayout from "./layouts/AdminLayout";
import ProductsPage from "./pages/dashboard/ProductsPage";
import HomePage from "./pages/Home/HomePage";
import DashBoard from "./pages/dashboard/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />

        {/* Admin dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
