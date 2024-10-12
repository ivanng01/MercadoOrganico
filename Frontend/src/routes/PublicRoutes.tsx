import NotFound from "@/pages/public/error/NotFound";
import Home from "@/pages/public/home/Home";
import Login from "@/pages/public/login/Login";
import ProductList from "@/pages/public/product/ProductList";
import Register from "@/pages/public/register/Register";
import { Route, Routes } from "react-router-dom";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="store" element={<ProductList />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Ruta para manejar errores 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
