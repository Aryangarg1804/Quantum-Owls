import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background/95 border-t border-white/10 py-8">
      <div className="saheli-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold text-saheli-purple">
              Saheli
            </Link>
            <p className="mt-2 text-white/70">
              Empowering women through financial independence and skill development.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="text-white/70 hover:text-white transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link to="/entrepreneurship" className="text-white/70 hover:text-white transition-colors">
                  Entrepreneurship
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/government-schemes" className="text-white/70 hover:text-white transition-colors">
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link to="/budget-planner" className="text-white/70 hover:text-white transition-colors">
                  Budget Planner
                </Link>
              </li>
              <li>
                <Link to="/investments" className="text-white/70 hover:text-white transition-colors">
                  Investments
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-white/70">
              Have questions? Reach out to us.
            </p>
            <button className="saheli-btn mt-4 py-2">Contact Us</button>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Saheli. All rights reserved.
          </p>
          <p className="text-white/50 text-sm flex items-center mt-4 sm:mt-0">
            Made with <Heart className="h-4 w-4 text-saheli-purple mx-1" /> for women empowerment
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
