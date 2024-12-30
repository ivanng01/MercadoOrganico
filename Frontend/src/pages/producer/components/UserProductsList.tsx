import { useEffect } from "react";
import useUserProductStore from "@/store/userProductStore";
import ProductCardProducer from "./ProductCardProducer";
import SpinnerProducts from "@/components/custom/SpinnerProducts";

export interface UserProductsListProps {
  user_id: number;
}

export default function UserProductsList({ user_id }: UserProductsListProps) {
  const { userProducts, loading, fetchUserProducts } = useUserProductStore();

  useEffect(() => {
    fetchUserProducts(user_id);
  }, [fetchUserProducts, user_id]);

  if (loading) {
    return (
      <div>
        <SpinnerProducts />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userProducts.map((product) => (
          <div key={product.id} className="md:basis-1/2 lg:basis-1/4">
            <ProductCardProducer product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
