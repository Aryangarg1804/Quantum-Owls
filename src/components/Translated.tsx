import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type Props = {
  en: string;
  hi: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  childrenBefore?: React.ReactNode; // icons etc
  childrenAfter?: React.ReactNode;
};

const Translated: React.FC<Props> = ({ en, hi, as = 'span', className, childrenBefore, childrenAfter }) => {
  const { language, translate } = useLanguage();

  const Tag: any = as;
  return (
    <Tag className={className} data-tts={language}>
      {childrenBefore}
      {translate(en, hi)}
      {childrenAfter}
    </Tag>
  );
};

export default Translated;
