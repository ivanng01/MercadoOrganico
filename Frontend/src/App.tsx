import { Route, Routes } from "react-router-dom";
import { AdminRoutes, ClientRoutes, ProducerRoutes, PublicRoutes } from "./routes";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import PublicLayout from "./components/layout/PublicLayout";
import ProtectedRoute from "./components/custom/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/*"
          element={
            <PublicLayout>
              <PublicRoutes />
            </PublicLayout>
          }
        />

        {/* Rutas Privadas para Admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute redirectTo="/login">
              <ProtectedLayout>
                <AdminRoutes />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Rutas Privadas para Cliente */}
        <Route
          path="/client/*"
          element={
            <ProtectedRoute redirectTo="/login">
              <ProtectedLayout>
                <ClientRoutes />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Rutas Privadas para Productor */}
        <Route
          path="/producer/*"
          element={
            <ProtectedRoute redirectTo="/login">
              <ProtectedLayout>
                <ProducerRoutes />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
