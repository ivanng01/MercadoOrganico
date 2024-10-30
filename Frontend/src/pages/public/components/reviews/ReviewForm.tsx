import { Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, review });
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Agrega una reseña</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-gray-600 block">Califica este producto</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 rounded-sm"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-8 h-8 ${star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} transition-colors`}
                />
                <span className="sr-only">Rate {star} stars</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Escribe tu reseña"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-[200px] resize-none text-card-foreground"
          />
        </div>

        <Button type="submit" className="w-full sm:w-auto px-8">
          Enviar Reseña
        </Button>
      </form>
    </div>
  );
}
