
import { ReactNode, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calculator, Volume2, VolumeX } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from 'react-router-dom';

interface CalculatorCardProps {
  image: string;
  title: string;
  titleHi?: string;
  description?: string;
  descriptionHi?: string;
  icon?: ReactNode;
  onClick?: () => void;
  route?: string;
}

const CalculatorCard = ({ 
  image, 
  title, 
  titleHi,
  description,
  descriptionHi,
  icon,
  onClick,
  route
}: CalculatorCardProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const { language, translate } = useLanguage();
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (route) {
      navigate(route);
    } else if (onClick) {
      onClick();
    } else {
      toast({
        title: translate("Coming Soon", "जल्द आ रहा है"),
        description: translate(
          `The ${title} will be available soon`,
          `${titleHi || title} जल्द ही उपलब्ध होगा`
        ),
      });
    }
  };
  
  const speakText = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      // If already speaking, stop
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      // Create a new speech synthesis utterance
      const speechText = language === 'en'
        ? `${title}. ${description || "Use this calculator to plan your finances."}`
        : `${titleHi || title}। ${descriptionHi || "अपने वित्त की योजना बनाने के लिए इस कैलकुलेटर का उपयोग करें।"}`;
      
      const utterance = new SpeechSynthesisUtterance(speechText);
      
      // Set language based on current state
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      
      // Set event handlers
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        toast({
          title: translate("Speech Error", "वाणी त्रुटि"),
          description: translate(
            "There was an error with the text-to-speech feature",
            "पाठ-से-वाणी सुविधा में कोई त्रुटि थी"
          ),
          variant: "destructive"
        });
      };
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: translate("Not Supported", "समर्थित नहीं है"),
        description: translate(
          "Text-to-speech is not supported in your browser",
          "पाठ-से-वाणी आपके ब्राउज़र में समर्थित नहीं है"
        ),
        variant: "destructive"
      });
    }
  };

  return (
    <div className="saheli-card animate-scale-in">
      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
        <img 
          src={image} 
          alt={translate(title, titleHi || title)} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 text-white">
        {translate(title, titleHi || title)}
      </h3>
      
      <div className="flex gap-2">
        <Button 
          className="saheli-btn-secondary flex-grow flex items-center justify-center gap-2"
          onClick={handleClick}
        >
          <Calculator className="h-5 w-5" />
          <span>{translate("Calculate Now", "अभी गणना करें")}</span>
        </Button>
        
        <Button 
          variant="outline" 
          className={`flex-shrink-0 w-10 p-0 ${
            isSpeaking 
              ? "border-red-500 text-red-500 hover:bg-red-500/10" 
              : "border-saheli-purple text-saheli-purple hover:bg-saheli-purple/10"
          }`}
          onClick={speakText}
        >
          {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default CalculatorCard;
