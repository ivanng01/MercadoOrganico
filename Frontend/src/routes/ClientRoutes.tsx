import CheckoutPage from "@/pages/client/checkout/CheckoutPage";
import ClientDashboard from "@/pages/client/dashboard/ClientDashboard";
import PurchaseSuccess from "@/pages/client/purchase/PurchaseSuccess";
import SettingsPageClient from "@/pages/client/settings/SettingsPageClient";
import HelpCenter from "@/pages/producer/help-center/HelpCenter";
import { Route, Routes } from "react-router-dom";

export default function ClientRoutes() {
  const simulatedOrderData = {
    orderId: "ORD123456789",
    totalAmount: 150.75,
    products: [
      { name: "Camiseta", price: 25.99, quantity: 2 },
      { name: "Pantalón", price: 49.99, quantity: 1 },
      { name: "Zapatillas", price: 74.77, quantity: 1 },
    ],
  };
  return (
    <Routes>
      <Route path="dashboard" element={<ClientDashboard />} />
      <Route path="settings" element={<SettingsPageClient />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="help" element={<HelpCenter />} />
      <Route
        path="checkout/success"
        element={
          <PurchaseSuccess orderId={simulatedOrderData.orderId} totalAmount={simulatedOrderData.totalAmount} products={simulatedOrderData.products} />
        }
      />

      {/* Aquí puedes añadir más rutas para clientes */}
    </Routes>
  );
}
