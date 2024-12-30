import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { handleUpClick } from "@/lib/utils";

export default function CartEmpty() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <ShoppingCart className="w-16 h-16 mx-auto text-card-foreground" />
        <CardTitle className="mt-4 text-2xl font-bold">Tu carrito está vacío</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-card-foreground">
          Parece que aún no has añadido ningún producto a tu carrito. ¡Explora nuestra tienda y encuentra algo que te encante!
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link to="/store">
          <Button className="mt-4" onClick={handleUpClick}>
            Ir a comprar <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
