import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginPromptDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPromptDialog = ({ isOpen, onClose }: LoginPromptDialogProps) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onClose();
    navigate('/', { state: { showLogin: true } }); // 👈 navigate with scroll intent
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background border-border">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="font-alata text-2xl font-bold text-foreground">
            Login Required
          </DialogTitle>
          <DialogDescription className="font-montserrat text-foreground/80 mt-2">
            Please log in to add items to your cart and enjoy exclusive offers!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={handleLoginClick}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold py-6 glow-gold"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Login Now
          </Button>

          <Button
            variant="outline"
            onClick={onClose}
            className="w-full font-montserrat border-border hover:bg-muted"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPromptDialog;
