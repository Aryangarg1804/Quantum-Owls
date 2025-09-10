
import { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

interface SchemeCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  benefits: string[];
  eligibility: string;
  className?: string;
  onViewDetails?: () => void;
}

const SchemeCard = ({
  icon,
  title,
  description,
  benefits,
  eligibility,
  className,
  onViewDetails,
}: SchemeCardProps) => {
  return (
    <div className={`saheli-card animate-scale-in ${className}`}>
      <div className="mb-4 text-saheli-purple">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      
      <p className="text-white/70 mb-4">
        {description}
      </p>
      
      <div className="mb-4">
        <h4 className="text-saheli-purple font-medium mb-2">Benefits:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {benefits.map((benefit, index) => (
            <li key={index} className="text-white/70">{benefit}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h4 className="text-saheli-purple font-medium mb-2">Eligibility:</h4>
        <p className="text-white/70">{eligibility}</p>
      </div>
      
      <Button 
        className="saheli-btn w-full flex items-center justify-center gap-2" 
        onClick={onViewDetails}
      >
        <span>View Details</span>
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SchemeCard;
