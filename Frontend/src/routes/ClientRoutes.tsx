import CheckoutPage from "@/pages/client/checkout/CheckoutPage";
import ClientDashboard from "@/pages/client/dashboard/ClientDashboard";
import PurchaseSuccess from "@/pages/client/purchase/PurchaseSuccess";
import SettingsPageClient from "@/pages/client/settings/SettingsPageClient";
import HelpCenter from "@/pages/producer/help-center/HelpCenter";
import { Route, Routes } from "react-router-dom";

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<ClientDashboard />} />
      <Route path="settings" element={<SettingsPageClient />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="help" element={<HelpCenter />} />
      <Route path="checkout/success" element={<PurchaseSuccess />} />

      {/* Aquí puedes añadir más rutas para clientes */}
    </Routes>
  );
}
