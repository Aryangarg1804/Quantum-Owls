
import { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, IndianRupee, Users, Tag } from 'lucide-react';
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
  category?: string;
  maxAmount?: string;
  targetGroup?: string;
  targetGroupHi?: string;
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
  category,
  maxAmount,
  targetGroup,
  targetGroupHi,
  className,
  onViewDetails,
}: SchemeCardProps) => {
  const { translate } = useLanguage();
  
  // Category colors and labels
  const getCategoryInfo = (cat?: string) => {
    switch (cat) {
      case 'financial':
        return { color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400', label: 'Financial', labelHi: 'वित्तीय' };
      case 'health':
        return { color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400', label: 'Health', labelHi: 'स्वास्थ्य' };
      case 'education':
        return { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400', label: 'Education', labelHi: 'शिक्षा' };
      case 'business':
        return { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400', label: 'Business', labelHi: 'व्यवसाय' };
      case 'housing':
        return { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400', label: 'Housing', labelHi: 'आवास' };
      default:
        return { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400', label: 'General', labelHi: 'सामान्य' };
    }
  };

  const categoryInfo = getCategoryInfo(category);

  return (
    <div className={`flip-card ${className}`}>
      <div className="flip-card-inner">
        {/* Front Side */}
        <div className="flip-card-front flex flex-col items-center justify-center rounded-xl border border-border bg-card text-card-foreground shadow-lg p-6">
          <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-saheli-purple/10 to-saheli-pink/10 text-saheli-purple mb-2">
            {icon}
          </div>
          <h3 className="text-lg font-bold mb-2 text-foreground leading-tight text-center">
            {translate(title, titleHi || title)}
          </h3>
        </div>
        {/* Back Side */}
        <div className="flip-card-back relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-lg p-6">
          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 right-4">
              <Badge className={`${categoryInfo.color} flex items-center gap-1 text-xs font-medium px-2 py-1`}>
                <Tag className="h-3 w-3" />
                {translate(categoryInfo.label, categoryInfo.labelHi)}
              </Badge>
            </div>
          )}
          <p className="text-sm text-muted-foreground mb-2">
            {translate(description, descriptionHi || description)}
          </p>
          <div className="grid grid-cols-1 gap-3 mb-4">
            {maxAmount && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-xs text-muted-foreground">{translate("Max Amount", "अधिकतम राशि")}</p>
                  <p className="font-semibold text-sm text-foreground">{maxAmount}</p>
                </div>
              </div>
            )}
            {targetGroup && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-xs text-muted-foreground">{translate("Target Group", "लक्षित समूह")}</p>
                  <p className="font-medium text-sm text-foreground line-clamp-1">
                    {translate(targetGroup, targetGroupHi || targetGroup)}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h4 className="text-saheli-purple font-semibold mb-2 text-sm flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-saheli-purple"></span>
              <Translated en="Key Benefits" hi="मुख्य लाभ" />
            </h4>
            <ul className="space-y-1">
              {benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-saheli-purple/60 mt-2 flex-shrink-0"></span>
                  <span className="line-clamp-1">{translate(benefit, benefitsHi?.[index] || benefit)}</span>
                </li>
              ))}
              {benefits.length > 3 && (
                <li className="text-xs text-saheli-purple font-medium">
                  +{benefits.length - 3} {translate("more benefits", "और लाभ")}
                </li>
              )}
            </ul>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-saheli-purple to-saheli-pink hover:from-saheli-purple/90 hover:to-saheli-pink/90 text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 h-10" 
            onClick={onViewDetails}
          >
            <span><Translated en="View Details" hi="विवरण देखें" /></span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;
