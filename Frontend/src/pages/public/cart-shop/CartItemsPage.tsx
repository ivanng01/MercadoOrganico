import ShoppingCart from "../components/cart/ShoppingCart";
import Header from "../components/header/Header";

export default function CartItemsPage() {
  return (
    <>
      <Header title="Carrito de Compras" />
      <section className="px-4 lg:px-[120px]">
        <div className="min-h-screen py-6 max-w-screen-2xl mx-auto">
          <ShoppingCart />
        </div>
      </section>
    </>
  );
}
