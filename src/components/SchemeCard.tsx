
import { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import Translated from '@/components/Translated';
import { useLanguage } from '@/contexts/LanguageContext';

interface SchemeCardProps {
  icon: ReactNode;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  benefits: string[];
  benefitsHi?: string[];
  eligibility: string;
  eligibilityHi?: string;
  className?: string;
  onViewDetails?: () => void;
}

const SchemeCard = ({
  icon,
  title,
  titleHi,
  description,
  descriptionHi,
  benefits,
  benefitsHi,
  eligibility,
  eligibilityHi,
  className,
  onViewDetails,
}: SchemeCardProps) => {
  const { translate } = useLanguage();
  return (
    <div className={`saheli-card animate-scale-in ${className}`}>
      <div className="mb-4 text-saheli-purple">
        {icon}
      </div>
      
  <h3 className="text-xl font-semibold mb-2 text-foreground">{translate(title, titleHi || title)}</h3>
      
  <p className="text-muted-foreground mb-4">
        {translate(description, descriptionHi || description)}
      </p>
      
      <div className="mb-4">
        <h4 className="text-saheli-purple font-medium mb-2"><Translated en="Benefits:" hi="लाभ:" /></h4>
        <ul className="list-disc pl-5 space-y-1">
          {benefits.map((benefit, index) => (
            <li key={index} className="text-muted-foreground">{translate(benefit, benefitsHi?.[index] || benefit)}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h4 className="text-saheli-purple font-medium mb-2"><Translated en="Eligibility:" hi="पात्रता:" /></h4>
  <p className="text-muted-foreground">{translate(eligibility, eligibilityHi || eligibility)}</p>
      </div>
      
      <Button 
        className="saheli-btn w-full flex items-center justify-center gap-2" 
        onClick={onViewDetails}
      >
        <span><Translated en="View Details" hi="विवरण देखें" /></span>
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SchemeCard;
