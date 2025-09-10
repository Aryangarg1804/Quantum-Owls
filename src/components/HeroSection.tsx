
import { ReactNode, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
  className?: string;
}

const HeroSection = ({ title, subtitle, children, className }: HeroSectionProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const speakText = () => {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      // If already speaking, stop
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      // Create a new speech synthesis utterance
      const speechText = `${title}. ${subtitle}`;
      const utterance = new SpeechSynthesisUtterance(speechText);
      
      // Set language based on current state
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      
      // Set event handlers
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        toast({
          title: language === 'en' ? "Speech Error" : "वाणी त्रुटि",
          description: language === 'en' 
            ? "There was an error with the text-to-speech feature"
            : "पाठ-से-वाणी सुविधा में कोई त्रुटि थी",
          variant: "destructive"
        });
      };
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: language === 'en' ? "Not Supported" : "समर्थित नहीं है",
        description: language === 'en'
          ? "Text-to-speech is not supported in your browser"
          : "पाठ-से-वाणी आपके ब्राउज़र में समर्थित नहीं है",
        variant: "destructive"
      });
    }
  };

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="saheli-container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in relative">
          <div className="absolute top-0 right-0 sm:right-4">
            <Button
              variant="outline"
              size="icon"
              onClick={speakText}
              className={`${
                isSpeaking 
                  ? "border-red-500 text-red-500 hover:bg-red-500/10" 
                  : "border-saheli-purple text-saheli-purple hover:bg-saheli-purple/10"
              }`}
            >
              {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </div>
          
          <h1 className="saheli-title mb-4">{title}</h1>
          <p className="saheli-subtitle">{subtitle}</p>
          {children}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
