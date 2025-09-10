import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { translate } = useLanguage();
  return (
    <footer className="bg-background/95 border-t border-white/10 py-8">
      <div className="saheli-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold text-saheli-purple">
              Saheli
            </Link>
            <p className="mt-2 text-muted-foreground">
              {translate(
                'Empowering women through financial independence and skill development.',
                'वित्तीय स्वतंत्रता और कौशल विकास के माध्यम से महिलाओं को सशक्त बनाना।'
              )}
            </p>
          </div>
          
          <div>
      <h3 className="text-lg font-semibold mb-4">{translate('Quick Links','त्वरित लिंक')}</h3>
            <ul className="space-y-2">
              <li>
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translate('Home','होम')}
                </Link>
              </li>
              <li>
        <Link to="/calculators" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translate('Calculators','कैलकुलेटर')}
                </Link>
              </li>
              <li>
        <Link to="/entrepreneurship" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translate('Entrepreneurship','उद्यमिता')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
      <h3 className="text-lg font-semibold mb-4">{translate('Resources','संसाधन')}</h3>
            <ul className="space-y-2">
              <li>
        <Link to="/government-schemes" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translate('Government Schemes','सरकारी योजनाएं')}
                </Link>
              </li>
              <li>
        <Link to="/budget-planner" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translate('Budget Planner','बजट प्लानर')}
                </Link>
              </li>
              <li>
        <Link to="/investments" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translate('Investments','निवेश')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{translate('Contact','संपर्क')}</h3>
            <p className="text-muted-foreground">
              {translate('Have questions? Reach out to us.','कोई प्रश्न है? हमसे संपर्क करें।')}
            </p>
            <button className="saheli-btn mt-4 py-2">{translate('Contact Us','संपर्क करें')}</button>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Saheli. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center mt-4 sm:mt-0">
            {translate('Made with','बनाया गया')} <Heart className="h-4 w-4 text-saheli-purple mx-1" /> {translate('for women empowerment','महिला सशक्तिकरण के लिए')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
