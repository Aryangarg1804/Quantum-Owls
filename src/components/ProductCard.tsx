
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  titleHi?: string;
  producer: string;
  producerHi?: string;
  description: string;
  descriptionHi?: string;
  priceRange: string;
  delay?: number;
}

const ProductCard = ({ 
  id,
  image, 
  title,
  titleHi,
  producer,
  producerHi, 
  description,
  descriptionHi, 
  priceRange,
  delay = 0 
}: ProductCardProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const { language, translate } = useLanguage();
  
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
        ? `${title} by ${producer}. ${description}. Price range: ${priceRange}.`
        : `${titleHi || title}, ${producerHi || producer} द्वारा। ${descriptionHi || description}। मूल्य सीमा: ${priceRange}।`;
      
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
    <div 
      className="saheli-card flex flex-col"
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="relative h-48 overflow-hidden rounded-lg mb-4">
        <img 
          src={image} 
          alt={translate(title, titleHi || title)} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <h3 className="text-xl font-semibold mb-1 text-white">
        {translate(title, titleHi || title)}
      </h3>
      <p className="text-saheli-purple font-medium mb-2">
        {translate(producer, producerHi || producer)}
      </p>
      
      <p className="text-white/70 mb-4 flex-grow">
        {translate(description, descriptionHi || description)}
      </p>
      
      <p className="text-white font-medium mb-4">{priceRange}</p>
      
      <div className="flex gap-2">
        <Link to={`/product/${id}`} className="flex-grow">
          <Button className="saheli-btn-secondary w-full">
            {translate("View Details", "विवरण देखें")}
          </Button>
        </Link>
        
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

export default ProductCard;
