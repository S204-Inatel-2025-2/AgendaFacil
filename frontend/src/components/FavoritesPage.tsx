import { motion } from "framer-motion";
import { ArrowLeft, Heart, MapPin, Star, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useState } from "react";

interface Company {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  services: string[];
  availability: string;
  price: string;
  phone: string;
  verified: boolean;
}

export function FavoritesPage({ onBack, onSelect }: { onBack: () => void; onSelect: (c: Company) => void }) {
  const [favorites, setFavorites] = useState<Company[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favoritos");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    localStorage.setItem("favoritos", JSON.stringify(updated));
  };

  return (
    <motion.div
      className="min-h-screen bg-background pt-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <h1 className="text-lg font-semibold">Meus Favoritos</h1>

          <div className="w-10" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {favorites.length === 0 && (
          <div className="text-center text-muted-foreground py-24">
            <Heart className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <p className="text-lg">Você ainda não favoritou nenhum profissional.</p>
            <p className="text-sm mt-1">Adicione favoritos para vê-los aqui!</p>
          </div>
        )}

        {favorites.map(company => (
          <Card key={company.id} className="overflow-hidden hover:shadow-lg transition cursor-pointer">
            <div className="flex gap-4 p-4">
              <div
                onClick={() => onSelect(company)}
                className="w-28 h-28 rounded-xl overflow-hidden"
              >
                <ImageWithFallback
                  src={company.image}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2
                    className="font-semibold text-lg hover:underline"
                    onClick={() => onSelect(company)}
                  >
                    {company.name}
                  </h2>

                  <button
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => removeFavorite(company.id)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {company.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{company.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({company.reviews})
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {company.location}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
