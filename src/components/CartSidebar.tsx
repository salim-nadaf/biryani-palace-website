import { X, Plus, Minus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import LazyImage from './LazyImage';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    const orderDetails = items.map(item => 
      `${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const total = getTotalPrice();
    const message = `🍛 *Biryani Palace Order*\n\n${orderDetails}\n\n*Total: ₹${total.toFixed(2)}*\n\nPlease confirm my order and provide delivery details.`;
    
    const whatsappUrl = `https://wa.me/919167682582?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h2 className="text-xl font-alata font-bold">
                {user ? `${user.name.split(' ')[0]}'s Cart` : 'Your Cart'}
              </h2>
              {user && (
                <p className="text-sm text-muted-foreground font-montserrat">
                  Welcome, {user.name.split(' ')[0]}!
                </p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground font-montserrat">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-2">Add some delicious biryani!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gradient-card rounded-lg p-4 border border-border">
                    <div className="flex items-start space-x-3">
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-montserrat font-semibold text-sm">{item.name}</h3>
                        <p className="text-primary font-bold">₹{item.price}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-primary/50"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-montserrat font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-primary/50"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-alata text-lg font-bold">Total:</span>
                <span className="font-alata text-xl font-bold text-primary">
                  ₹{getTotalPrice().toFixed(2)}
                </span>
              </div>
              
              <Button
                onClick={handleWhatsAppOrder}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold"
                size="lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Order via WhatsApp
              </Button>
              
              <p className="text-xs text-muted-foreground text-center font-montserrat">
                You'll be redirected to WhatsApp to complete your order
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};