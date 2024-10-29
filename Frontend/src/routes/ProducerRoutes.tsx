import NewProductForm from "@/pages/producer/components/NewProductForm";
import ProducerDashboard from "@/pages/producer/dashboard/ProducerDashboard";
import HelpCenter from "@/pages/producer/help-center/HelpCenter";
import ProductCatalog from "@/pages/producer/product/ProductCatalog";
import { Route, Routes } from "react-router-dom";

export default function ProducerRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<ProducerDashboard />} />
      <Route path="products" element={<ProductCatalog />} />
      <Route path="products/new" element={<NewProductForm />} />
      <Route path="help" element={<HelpCenter />} />

      {/* Aquí puedes añadir más rutas para el productor */}

    </Routes>
  );
}
