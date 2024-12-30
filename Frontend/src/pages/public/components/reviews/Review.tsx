import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReviewForm from "./ReviewForm";
import { useAuthStore } from "@/store/authStore";
import showDialog from "@/lib/showDialog";
import { useNavigate } from "react-router-dom";
import { handleUpClick } from "@/lib/utils";

export default function ReviewList() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuthStore((state) => state);

  const reviews = [
    {
      id: 1,
      name: "Carlos Robles",
      date: "18 Octubre del 2024",
      rating: 5,
      comment:
        "La mejor manzana que he probado en mucho tiempo. Me encanta saber que son cultivadas sin químicos y puedo disfrutar de cada bocado con tranquilidad. Definitivamente, una opción saludable y deliciosa.",
      avatar: "/review/1.png",
    },
    {
      id: 2,
      name: "Laura Martínez",
      date: "15 de Octubre del 2024",
      rating: 5,
      comment:
        "Estas manzanas son increíblemente frescas y jugosas. Se nota la diferencia al ser orgánicas; el sabor es mucho más auténtico y natural. ¡Perfectas para toda la familia!",
      avatar: "/review/2.png",
    },
  ];

  const handleAddReviewClick = async () => {
    if (token) {
      setIsFormVisible(true);
    } else {
      const confirmed = await showDialog({
        title: "Iniciar Sesión",
        text: "Por favor, inicia sesión para agregar una reseña.",
        icon: "warning",
        isConfirmation: true,
      });

      if (confirmed) {
        navigate("/login");
        handleUpClick();
      }
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">{reviews.length} valoraciones de este producto</h2>

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <img src={review.avatar} alt={review.name} className="w-24 h-24 rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{review.name}</h3>
                      <p className="text-primary">{review.date}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button className="px-8" onClick={handleAddReviewClick}>
          + Agregar reseña
        </Button>
      </div>

      {isFormVisible && <ReviewForm />}
    </div>
  );
}
