
import HeroSection from "@/components/HeroSection";
import CalculatorCard from "@/components/CalculatorCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

const Calculators = () => {
  const { translate } = useLanguage();
  const { toast } = useToast();
  
  const handleCalculatorClick = (calculatorName: string) => {
    // In a real app, this would navigate to a calculator page
    toast({
      title: translate("Coming Soon", "जल्द आ रहा है"),
      description: translate(
        `The ${calculatorName} will be available soon`,
        `${calculatorName} जल्द ही उपलब्ध होगा`
      ),
    });
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        title={translate("Financial Calculators", "वित्तीय कैलकुलेटर")}
        subtitle={translate(
          "Plan your finances with our easy-to-use calculators",
          "हमारे आसान-से-उपयोग कैलकुलेटर के साथ अपने वित्त की योजना बनाएं"
        )}
      />
      
      <section className="py-12 saheli-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CalculatorCard
            image="https://i.pinimg.com/736x/57/5a/23/575a239f458f4c4e661db7a3e027542e.jpg"
            title="PPF Calculator"
            titleHi="पीपीएफ कैलकुलेटर"
            description="Calculate returns on your Public Provident Fund investments"
            descriptionHi="अपने सार्वजनिक भविष्य निधि निवेश पर रिटर्न की गणना करें"
            route="/calculators/ppf"
          />
          
          <CalculatorCard
            image="https://i.pinimg.com/736x/00/24/ff/0024fffa7ae7122bd34a9a990cd47bb7.jpg"
            title="Sukanya Samriddhi Yojana Calculator"
            titleHi="सुकन्या समृद्धि योजना कैलकुलेटर"
            description="Plan your daughter's future with this specialized calculator"
            descriptionHi="इस विशेष कैलकुलेटर के साथ अपनी बेटी के भविष्य की योजना बनाएं"
            route="/calculators/sukanya-samriddhi"

          />
          
          <CalculatorCard
            image="https://i.pinimg.com/736x/51/67/92/516792c61c763d041af2081b3324e850.jpg"
            title="Child Education Calculator"
            titleHi="बाल शिक्षा कैलकुलेटर"
            description="Estimate the cost of your child's education and plan accordingly"
            descriptionHi="अपने बच्चे की शिक्षा की लागत का अनुमान लगाएं और तदनुसार योजना बनाएं"
            route="/calculators/ChildEducation"
          />
          
          <CalculatorCard
            image="https://i.pinimg.com/736x/e6/a7/c3/e6a7c35f1bef21ca44ba61a753dcc6bd.jpg"
            title="SIP Calculator"
            titleHi="एसआईपी कैलकुलेटर"
            description="Calculate returns on your Systematic Investment Plan"
            descriptionHi="अपनी सिस्टमैटिक इन्वेस्टमेंट प्लान पर रिटर्न की गणना करें"
            route="/calculators/sipCalculater"
          />
          
          <CalculatorCard
            image="https://i.pinimg.com/736x/46/d9/86/46d986939432e39f9b2e26aef6a8824d.jpg"
            title="Loan EMI Calculator"
            titleHi="ऋण ईएमआई कैलकुलेटर"
            description="Calculate EMI for different loan amounts and tenures"
            descriptionHi="विभिन्न ऋण राशि और अवधि के लिए ईएमआई की गणना करें"
            route = "/calculators/loanCalculater"
          />
          
          <CalculatorCard
            image="https://i.pinimg.com/736x/c5/87/39/c587391a729a33b0e19f4d34fbb533df.jpg"
            title="Retirement Calculator"
            titleHi="सेवानिवृत्ति कैलकुलेटर"
            description="Plan for a comfortable retirement with this calculator"
            descriptionHi="इस कैलकुलेटर के साथ आरामदायक सेवानिवृत्ति की योजना बनाएं"
            route = "/calculators/retirementCalculater"
          />
        </div>
      </section>
    </div>
  );
};

export default Calculators;
