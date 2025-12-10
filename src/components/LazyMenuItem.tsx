import React, { useState, useEffect, useRef, memo } from 'react';
import { Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LazyMenuItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageKey: string;
    rating?: number;
    reviews?: number;
    tag?: string;
    unit?: string;
  };
  onAddToCart: (item: any) => void;
  getTagColor: (tag: string) => string;
  imageLoader: (key: string) => Promise<{ default: string }>;
}

const LazyMenuItem: React.FC<LazyMenuItemProps> = ({ item, onAddToCart, getTagColor, imageLoader }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px', threshold: 0 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && !imageSrc) {
      imageLoader(item.imageKey).then((module) => {
        setImageSrc(module.default);
      }).catch(() => {
        setImageSrc('/placeholder.svg');
      });
    }
  }, [isInView, item.imageKey, imageLoader, imageSrc]);

  return (
    <Card ref={cardRef} className="bg-gradient-card border-border hover:border-primary/50 transition-smooth group overflow-hidden contain-layout">
      <div className="relative h-40 bg-muted/30">
        {/* Skeleton placeholder while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 img-skeleton" />
        )}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={item.name}
            width={400}
            height={160}
            className={`w-full h-full object-cover group-hover:scale-105 transition-smooth ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            decoding="async"
          />
        )}
        {item.tag && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-montserrat font-bold ${getTagColor(item.tag)} shadow-lg`}>
            {item.tag}
          </div>
        )}
        {item.rating && item.rating > 0 && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-3 h-3 fill-primary text-primary" />
            <span className="text-foreground text-xs font-montserrat font-medium">
              {item.rating}
            </span>
          </div>
        )}
      </div>
      
      <CardContent className="p-3">
        <div className="mb-2">
          <h4 className="font-alata text-base font-bold text-foreground leading-tight mb-1">
            {item.name}
          </h4>
          <span className="font-alata text-lg font-bold text-primary">
            ₹{item.price}{item.unit ? ` (${item.unit})` : '/Kg'}
          </span>
        </div>
        
        <p className="font-montserrat text-muted-foreground mb-3 text-xs leading-relaxed line-clamp-2">
          {item.description}
        </p>
        
        {item.rating && item.rating > 0 && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-3 h-3 ${
                    star <= Math.floor(item.rating!) 
                      ? 'fill-primary text-primary' 
                      : 'text-muted-foreground'
                  }`} 
                />
              ))}
            </div>
          </div>
        )}
        
        <Button
          onClick={() => onAddToCart({ ...item, image: imageSrc })}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold transition-smooth glow-gold"
          size="sm"
        >
          <Plus className="mr-1 h-3 w-3" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default memo(LazyMenuItem);
