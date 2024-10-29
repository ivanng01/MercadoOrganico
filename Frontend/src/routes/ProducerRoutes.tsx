import NewDiscountForm from "@/pages/producer/components/NewDiscountForm";
import NewProductForm from "@/pages/producer/components/NewProductForm";
import OrderDetail from "@/pages/producer/components/OrderDetail";
import ProducerDashboard from "@/pages/producer/dashboard/ProducerDashboard";
import DiscountCatalog from "@/pages/producer/discount/DiscountCatalog";
import HelpCenter from "@/pages/producer/help-center/HelpCenter";
import ComingSoon from "@/pages/producer/inventory/Inventory";
import OrderList from "@/pages/producer/order/OrderList";
import ProductCatalog from "@/pages/producer/product/ProductCatalog";
import SettingsPage from "@/pages/producer/settings/SettingsPage";
import { Route, Routes } from "react-router-dom";

export default function ProducerRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<ProducerDashboard />} />
      <Route path="products" element={<ProductCatalog />} />
      <Route path="discounts" element={<DiscountCatalog />} />
      <Route path="products/new" element={<NewProductForm />} />
      <Route path="discounts/new" element={<NewDiscountForm />} />
      <Route path="orders" element={<OrderList />} />
      <Route path="orders/:id" element={<OrderDetail />} />
      <Route path="help" element={<HelpCenter />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="inventory" element={<ComingSoon />} />


      {/* Aquí puedes añadir más rutas para el productor */}
    </Routes>
  );
}
