import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Calculator, 
  PiggyBank, 
  TrendingUp, 
  Shield, 
  Target, 
  DollarSign,
  Volume2,
  VolumeX,
  ArrowRight,
  Wallet,
  CreditCard,
  BarChart3,
  FileText,
  Users,
  Lightbulb,
  Home,
  GraduationCap,
  Heart,
  Banknote,
  Coins,
  Gauge
} from "lucide-react";
import Translated from "@/components/Translated";

const FinancialPlanning = () => {
  const { translate, language } = useLanguage();
  const { toast } = useToast();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");

  const speakPageContent = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const speechText = language === 'en'
        ? "Financial Planning Hub. Learn smart money management. Create budgets, plan savings, build emergency funds, and secure your financial future."
        : "वित्तीय योजना हब। स्मार्ट धन प्रबंधन सीखें। बजट बनाएं, बचत की योजना बनाएं, आपातकालीन फंड बनाएं, और अपने वित्तीय भविष्य को सुरक्षित करें।";
      
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
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

  const financialGoals = [
    {
      title: "Emergency Fund",
      titleHi: "आपातकालीन फंड",
      description: "Build a safety net for unexpected expenses",
      descriptionHi: "अप्रत्याशित खर्चों के लिए एक सुरक्षा जाल बनाएं",
      icon: <Shield className="h-6 w-6" />,
      target: "3-6 months of expenses",
      targetHi: "3-6 महीने के खर्च",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Children's Education",
      titleHi: "बच्चों की शिक्षा",
      description: "Secure your children's educational future",
      descriptionHi: "अपने बच्चों के शैक्षिक भविष्य को सुरक्षित करें",
      icon: <GraduationCap className="h-6 w-6" />,
      target: "Start early for best results",
      targetHi: "सर्वोत्तम परिणामों के लिए जल्दी शुरू करें",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Home Purchase",
      titleHi: "घर खरीदना",
      description: "Plan for your dream home down payment",
      descriptionHi: "अपने सपनों के घर के डाउन पेमेंट की योजना बनाएं",
      icon: <Home className="h-6 w-6" />,
      target: "20% down payment ideal",
      targetHi: "20% डाउन पेमेंट आदर्श",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Retirement Planning",
      titleHi: "सेवानिवृत्ति योजना",
      description: "Ensure a comfortable retirement",
      descriptionHi: "एक आरामदायक सेवानिवृत्ति सुनिश्चित करें",
      icon: <PiggyBank className="h-6 w-6" />,
      target: "Start as early as possible",
      targetHi: "जितनी जल्दी हो सके शुरू करें",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const budgetingSteps = [
    {
      step: 1,
      title: "Track Your Income",
      titleHi: "अपनी आय को ट्रैक करें",
      description: "List all sources of income",
      descriptionHi: "आय के सभी स्रोतों की सूची बनाएं",
      icon: <Banknote className="h-8 w-8" />,
      details: [
        "Salary from job",
        "Business income",
        "Rental income",
        "Other earnings"
      ],
      detailsHi: [
        "नौकरी से वेतन",
        "व्यावसायिक आय",
        "किराया आय",
        "अन्य कमाई"
      ]
    },
    {
      step: 2,
      title: "List All Expenses",
      titleHi: "सभी खर्चों की सूची बनाएं",
      description: "Categorize fixed and variable expenses",
      descriptionHi: "निश्चित और परिवर्तनीय खर्चों को वर्गीकृत करें",
      icon: <CreditCard className="h-8 w-8" />,
      details: [
        "Housing costs",
        "Food and groceries",
        "Transportation",
        "Entertainment"
      ],
      detailsHi: [
        "आवास लागत",
        "भोजन और किराना",
        "परिवहन",
        "मनोरंजन"
      ]
    },
    {
      step: 3,
      title: "Set Savings Goals",
      titleHi: "बचत लक्ष्य निर्धारित करें",
      description: "Decide how much to save each month",
      descriptionHi: "तय करें कि हर महीने कितनी बचत करनी है",
      icon: <Target className="h-8 w-8" />,
      details: [
        "Emergency fund (20%)",
        "Long-term goals (10%)",
        "Short-term goals (10%)",
        "Investment (20%)"
      ],
      detailsHi: [
        "आपातकालीन फंड (20%)",
        "दीर्घकालिक लक्ष्य (10%)",
        "अल्पकालिक लक्ष्य (10%)",
        "निवेश (20%)"
      ]
    },
    {
      step: 4,
      title: "Monitor & Adjust",
      titleHi: "निगरानी और समायोजन",
      description: "Review and update your budget regularly",
      descriptionHi: "नियमित रूप से अपने बजट की समीक्षा और अपडेट करें",
      icon: <Gauge className="h-8 w-8" />,
      details: [
        "Monthly budget review",
        "Track spending patterns",
        "Adjust categories as needed",
        "Celebrate milestones"
      ],
      detailsHi: [
        "मासिक बजट समीक्षा",
        "खर्च के पैटर्न को ट्रैक करें",
        "आवश्यकतानुसार श्रेणियों को समायोजित करें",
        "मील के पत्थर मनाएं"
      ]
    }
  ];

  const financialTools = [
    {
      name: "Budget Calculator",
      nameHi: "बजट कैलकुलेटर",
      description: "Plan your monthly income and expenses",
      descriptionHi: "अपनी मासिक आय और खर्च की योजना बनाएं",
      icon: <Calculator className="h-6 w-6" />,
      features: [
        "Income tracking",
        "Expense categorization",
        "Savings goals",
        "Visual reports"
      ],
      featuresHi: [
        "आय ट्रैकिंग",
        "खर्च वर्गीकरण",
        "बचत लक्ष्य",
        "दृश्य रिपोर्ट"
      ]
    },
    {
      name: "SIP Calculator",
      nameHi: "SIP कैलकुलेटर",
      description: "Calculate mutual fund returns",
      descriptionHi: "म्यूचुअल फंड रिटर्न की गणना करें",
      icon: <TrendingUp className="h-6 w-6" />,
      features: [
        "Monthly investment",
        "Expected returns",
        "Time period",
        "Maturity amount"
      ],
      featuresHi: [
        "मासिक निवेश",
        "अपेक्षित रिटर्न",
        "समय अवधि",
        "परिपक्वता राशि"
      ]
    },
    {
      name: "EMI Calculator",
      nameHi: "EMI कैलकुलेटर",
      description: "Calculate loan EMIs and interest",
      descriptionHi: "लोन EMI और ब्याज की गणना करें",
      icon: <Coins className="h-6 w-6" />,
      features: [
        "Principal amount",
        "Interest rate",
        "Loan tenure",
        "Monthly EMI"
      ],
      featuresHi: [
        "मूल राशि",
        "ब्याज दर",
        "लोन अवधि",
        "मासिक EMI"
      ]
    },
    {
      name: "Goal Planner",
      nameHi: "लक्ष्य योजनाकार",
      description: "Plan for your financial goals",
      descriptionHi: "अपने वित्तीय लक्ष्यों की योजना बनाएं",
      icon: <Target className="h-6 w-6" />,
      features: [
        "Goal setting",
        "Timeline planning",
        "Progress tracking",
        "Achievement alerts"
      ],
      featuresHi: [
        "लक्ष्य निर्धारण",
        "समयसीमा योजना",
        "प्रगति ट्रैकिंग",
        "उपलब्धि अलर्ट"
      ]
    }
  ];

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
    toast({
      title: translate("Goal Selected!", "लक्ष्य चुना गया!"),
      description: translate(
        `You've selected ${goal} as your financial goal`,
        `आपने ${goal} को अपने वित्तीय लक्ष्य के रूप में चुना है`
      ),
    });
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 relative">
            {/* Text-to-Speech Button */}
            <div className="absolute top-0 right-0 sm:right-4">
              <Button
                variant="outline"
                size="icon"
                onClick={speakPageContent}
                className={`${
                  isSpeaking 
                    ? "border-red-500 text-red-500 hover:bg-red-500/10" 
                    : "border-green-500 text-green-500 hover:bg-green-500/10"
                }`}
                title={translate("Read page aloud", "पेज को जोर से पढ़ें")}
              >
                {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <Translated en="Financial Planning Hub" hi="वित्तीय योजना हब" />
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <Translated 
                en="Learn smart money management. Create budgets, plan savings, build emergency funds, and secure your financial future."
                hi="स्मार्ट धन प्रबंधन सीखें। बजट बनाएं, बचत की योजना बनाएं, आपातकालीन फंड बनाएं, और अपने वित्तीय भविष्य को सुरक्षित करें।"
              />
            </p>
          </div>

          {/* Quick Assessment */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              <Translated en="Financial Health Check" hi="वित्तीय स्वास्थ्य जांच" />
            </h3>
            <div className="space-y-4">
              <Input
                placeholder={translate("Monthly income (₹)...", "मासिक आय (₹)...")}
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                type="number"
              />
              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                <Translated en="Analyze My Finances" hi="मेरे वित्त का विश्लेषण करें" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Goals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Set Your Financial Goals" hi="अपने वित्तीय लक्ष्य निर्धारित करें" />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <Translated 
                en="Define clear financial objectives to guide your saving and investment decisions"
                hi="अपनी बचत और निवेश निर्णयों का मार्गदर्शन करने के लिए स्पष्ट वित्तीय उद्देश्य परिभाषित करें"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialGoals.map((goal, index) => (
              <Card 
                key={index} 
                className="saheli-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleGoalSelect(goal.title)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${goal.color} text-white`}>
                      {goal.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {translate(goal.title, goal.titleHi)}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription>
                    {translate(goal.description, goal.descriptionHi)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      <Translated en="Target:" hi="लक्ष्य:" />
                    </p>
                    <p className="text-sm text-foreground">
                      {translate(goal.target, goal.targetHi)}
                    </p>
                  </div>
                  <Button className={`w-full bg-gradient-to-r ${goal.color} hover:opacity-90 text-white`}>
                    <Translated en="Start Planning" hi="योजना शुरू करें" />
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Budgeting Steps */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="4-Step Budgeting Process" hi="4-चरणीय बजटिंग प्रक्रिया" />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <Translated 
                en="Follow this simple process to create and maintain a successful budget"
                hi="सफल बजट बनाने और बनाए रखने के लिए इस सरल प्रक्रिया का पालन करें"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {budgetingSteps.map((step, index) => (
              <Card key={index} className="saheli-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 text-white flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <CardTitle className="text-foreground">
                        {translate(step.title, step.titleHi)}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {translate(step.description, step.descriptionHi)}
                      </CardDescription>
                    </div>
                    <div className="flex-shrink-0 text-green-500">
                      {step.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        {translate(detail, step.detailsHi[idx])}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                    <Translated en="Learn More" hi="और जानें" />
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Financial Planning Tools" hi="वित्तीय योजना उपकरण" />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <Translated 
                en="Use these calculators and tools to make informed financial decisions"
                hi="सूचित वित्तीय निर्णय लेने के लिए इन कैलकुलेटरों और उपकरणों का उपयोग करें"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialTools.map((tool, index) => (
              <Card key={index} className="saheli-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 text-green-600">
                      {tool.icon}
                    </div>
                    <CardTitle className="text-lg">
                      {translate(tool.name, tool.nameHi)}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {translate(tool.description, tool.descriptionHi)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 mb-4">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {translate(feature, tool.featuresHi[idx])}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline">
                    <Calculator className="h-4 w-4 mr-2" />
                    <Translated en="Use Tool" hi="उपकरण का उपयोग करें" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            <Translated en="Take Control of Your Finances" hi="अपने वित्त पर नियंत्रण रखें" />
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            <Translated 
              en="Start your financial planning journey today and build a secure future for you and your family."
              hi="आज ही अपनी वित्तीय योजना की यात्रा शुरू करें और अपने और अपने परिवार के लिए एक सुरक्षित भविष्य बनाएं।"
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-green-600 hover:bg-white/90">
              <FileText className="h-5 w-5 mr-2" />
              <Translated en="Download Planning Guide" hi="योजना गाइड डाउनलोड करें" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Users className="h-5 w-5 mr-2" />
              <Translated en="Join Workshop" hi="कार्यशाला में शामिल हों" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialPlanning;
