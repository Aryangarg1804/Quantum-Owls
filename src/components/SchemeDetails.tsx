
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, VolumeX, Languages } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface SchemeDetailsProps {
  title: string;
  description: string;
  benefits: string[];
  eligibility: string;
  documents: string[];
  applicationProcess: string[];
  imageUrl: string;
  contactInfo: string;
  onBack: () => void;
}

const SchemeDetails = ({
  title,
  description,
  benefits,
  eligibility,
  documents,
  applicationProcess,
  imageUrl,
  contactInfo,
  onBack
}: SchemeDetailsProps) => {
  const [isHindi, setIsHindi] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  
  // Simple translations (in a real app, this would use a translation API)
  const hindiContent = {
    title: `${title} (हिंदी)`,
    description: `${description} (हिंदी में विवरण)`,
    benefits: benefits.map(b => `${b} (हिंदी)`),
    eligibility: `${eligibility} (हिंदी में पात्रता)`,
    documents: documents.map(d => `${d} (हिंदी)`),
    applicationProcess: applicationProcess.map(p => `${p} (हिंदी)`),
    contactInfo: `${contactInfo} (हिंदी में संपर्क जानकारी)`
  };
  
  const contentToUse = isHindi ? hindiContent : {
    title,
    description,
    benefits,
    eligibility,
    documents,
    applicationProcess,
    contactInfo
  };

  const toggleLanguage = () => {
    setIsHindi(!isHindi);
    toast({
      title: isHindi ? "Switched to English" : "हिंदी में बदला गया",
      description: isHindi ? "Content is now in English" : "सामग्री अब हिंदी में है",
    });
  };
  
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
      const speechText = `${contentToUse.title}. ${contentToUse.description}. 
                         Benefits include: ${contentToUse.benefits.join(', ')}. 
                         Eligibility: ${contentToUse.eligibility}.`;
      const utterance = new SpeechSynthesisUtterance(speechText);
      
      // Set language based on current state
      utterance.lang = isHindi ? 'hi-IN' : 'en-US';
      
      // Set event handlers
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        toast({
          title: "Speech Error",
          description: "There was an error with the text-to-speech feature",
          variant: "destructive"
        });
      };
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Not Supported",
        description: "Text-to-speech is not supported in your browser",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-saheli-purple hover:text-saheli-purple/80"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Schemes</span>
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={toggleLanguage}
            className="flex items-center gap-2 border-saheli-purple text-saheli-purple hover:bg-saheli-purple/10"
          >
            <Languages className="h-5 w-5" />
            <span>{isHindi ? "EN" : "हिंदी"}</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={speakText}
            className={`flex items-center gap-2 ${
              isSpeaking 
                ? "border-red-500 text-red-500 hover:bg-red-500/10" 
                : "border-saheli-purple text-saheli-purple hover:bg-saheli-purple/10"
            }`}
          >
            {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            <span>{isSpeaking ? "Stop" : "Read Aloud"}</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="saheli-title mb-4">{contentToUse.title}</h1>
          
          <div className="bg-gradient-to-r from-saheli-purple/20 to-saheli-accent/20 p-6 rounded-xl mb-6 backdrop-blur-sm animate-fade-in">
            <p className="text-white/90 text-lg leading-relaxed">
              {contentToUse.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="saheli-card animate-scale-in" style={{animationDelay: '100ms'}}>
              <h3 className="text-xl font-semibold mb-4 text-saheli-purple">Benefits</h3>
              <ul className="space-y-2">
                {contentToUse.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/80">
                    <span className="inline-block h-6 w-6 bg-saheli-purple/20 text-saheli-purple rounded-full flex-shrink-0 flex items-center justify-center text-sm mt-0.5">{index + 1}</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="saheli-card animate-scale-in" style={{animationDelay: '200ms'}}>
              <h3 className="text-xl font-semibold mb-4 text-saheli-purple">Eligibility</h3>
              <p className="text-white/80">{contentToUse.eligibility}</p>
            </div>
          </div>
          
          <div className="saheli-card mb-8 animate-scale-in" style={{animationDelay: '300ms'}}>
            <h3 className="text-xl font-semibold mb-4 text-saheli-purple">Required Documents</h3>
            <ul className="space-y-2">
              {contentToUse.documents.map((doc, index) => (
                <li key={index} className="flex items-start gap-2 text-white/80">
                  <span className="text-saheli-purple">•</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="saheli-card animate-scale-in" style={{animationDelay: '400ms'}}>
            <h3 className="text-xl font-semibold mb-4 text-saheli-purple">Application Process</h3>
            <ol className="space-y-4">
              {contentToUse.applicationProcess.map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-white/80">
                  <span className="inline-block h-7 w-7 bg-saheli-purple/20 text-saheli-purple rounded-full flex-shrink-0 flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="saheli-card mb-6 animate-scale-in" style={{animationDelay: '500ms'}}>
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={imageUrl} 
                  alt={contentToUse.title} 
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <Button className="saheli-btn w-full mb-4">Apply Now</Button>
              
              <div className="p-4 bg-white/5 rounded-lg mb-4">
                <h4 className="font-medium text-saheli-purple mb-2">Contact Information</h4>
                <p className="text-white/80">{contentToUse.contactInfo}</p>
              </div>
              
              <div className="flex justify-center">
                <a 
                  href="#" 
                  target="_blank" 
                  className="text-saheli-purple hover:underline text-sm flex items-center gap-1"
                >
                  Download Information Brochure
                </a>
              </div>
            </div>
            
            <div className="saheli-card animate-scale-in" style={{animationDelay: '600ms'}}>
              <h4 className="font-medium text-saheli-purple mb-4">Related Schemes</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    Beti Bachao Beti Padhao Yojana
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    Pradhan Mantri Ujjwala Yojana
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    National Creche Scheme
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
