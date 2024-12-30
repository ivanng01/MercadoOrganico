import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Event } from "@/types/types";

export default function EventCard({ date, title, description, image }: Event) {
  return (
    <Card className="shadow-md flex-grow">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-md">
          <div className="text-sm font-bold text-center">{date.day}</div>
          <div className="text-xs text-center">{date.month}</div>
        </div>
      </div>
      <CardContent>
        <CardHeader>
          <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
          <CardDescription className="text-card-foreground text-sm">{description}</CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  );
}
