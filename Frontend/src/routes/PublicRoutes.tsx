import NotFound from "@/pages/public/error/NotFound";
import Home from "@/pages/public/home/Home";
import Login from "@/pages/public/login/Login";
import ProductList from "@/pages/public/store/ProductList";
import Register from "@/pages/public/register/Register";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "@/pages/public/components/product/ProductDetail";
import About from "@/pages/public/about/About";
import EventsPage from "@/pages/public/events/EventsPage";
import ContactPage from "@/pages/public/contact/ContactPage";
import CartItemsPage from "@/pages/public/cart-shop/CartItemsPage";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="store" element={<ProductList />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="about" element={<About />} />
      <Route path="product/:id" element={<ProductDetail />} />
      <Route path="events" element={<EventsPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="cart" element={<CartItemsPage />} />

      {/* Ruta para manejar errores 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
