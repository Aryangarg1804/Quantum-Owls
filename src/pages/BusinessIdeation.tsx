import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Users, 
  PieChart, 
  FileText, 
  CheckCircle,
  Volume2,
  VolumeX,
  ArrowRight,
  Search,
  Building2,
  Zap,
  BarChart3
} from "lucide-react";
import Translated from "@/components/Translated";

const BusinessIdeation = () => {
  const { translate, language } = useLanguage();
  const { toast } = useToast();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [businessIdea, setBusinessIdea] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const speakPageContent = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const speechText = language === 'en'
        ? "Business Ideation Hub. Turn your ideas into successful businesses with our comprehensive tools and guidance. Learn market research, feasibility analysis, and business planning."
        : "व्यावसायिक विचार केंद्र। हमारे व्यापक उपकरणों और मार्गदर्शन के साथ अपने विचारों को सफल व्यवसायों में बदलें। बाज़ार अनुसंधान, व्यवहार्यता विश्लेषण और व्यावसायिक योजना सीखें।";
      
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

  const ideationSteps = [
    {
      title: "Idea Generation",
      titleHi: "विचार उत्पादन",
      description: "Brainstorm and discover business opportunities",
      descriptionHi: "विचारमंथन और व्यावसायिक अवसरों की खोज करें",
      icon: <Lightbulb className="h-6 w-6" />,
      tools: [
        "Problem identification worksheets",
        "Opportunity mapping canvas",
        "Trend analysis guides",
        "Community needs assessment"
      ],
      toolsHi: [
        "समस्या पहचान कार्यपत्रक",
        "अवसर मानचित्रण कैनवास",
        "प्रवृत्ति विश्लेषण गाइड",
        "सामुदायिक आवश्यकता मूल्यांकन"
      ]
    },
    {
      title: "Market Research",
      titleHi: "बाज़ार अनुसंधान",
      description: "Understand your target market and customers",
      descriptionHi: "अपने लक्षित बाज़ार और ग्राहकों को समझें",
      icon: <Search className="h-6 w-6" />,
      tools: [
        "Customer survey templates",
        "Market size calculator",
        "Competitor analysis framework",
        "Local market research guide"
      ],
      toolsHi: [
        "ग्राहक सर्वेक्षण टेम्प्लेट",
        "बाज़ार आकार कैलकुलेटर",
        "प्रतियोगी विश्लेषण ढांचा",
        "स्थानीय बाज़ार अनुसंधान गाइड"
      ]
    },
    {
      title: "Feasibility Analysis",
      titleHi: "व्यवहार्यता विश्लेषण",
      description: "Evaluate the viability of your business idea",
      descriptionHi: "अपने व्यावसायिक विचार की व्यवहार्यता का मूल्यांकन करें",
      icon: <BarChart3 className="h-6 w-6" />,
      tools: [
        "Financial feasibility calculator",
        "SWOT analysis template",
        "Resource requirement checklist",
        "Risk assessment framework"
      ],
      toolsHi: [
        "वित्तीय व्यवहार्यता कैलकुलेटर",
        "SWOT विश्लेषण टेम्प्लेट",
        "संसाधन आवश्यकता चेकलिस्ट",
        "जोखिम मूल्यांकन ढांचा"
      ]
    },
    {
      title: "Business Model",
      titleHi: "व्यावसायिक मॉडल",
      description: "Design your business model and revenue streams",
      descriptionHi: "अपना व्यावसायिक मॉडल और राजस्व धाराओं को डिज़ाइन करें",
      icon: <Building2 className="h-6 w-6" />,
      tools: [
        "Business Model Canvas",
        "Revenue stream planner",
        "Value proposition designer",
        "Pricing strategy guide"
      ],
      toolsHi: [
        "व्यावसायिक मॉडल कैनवास",
        "राजस्व धारा योजनाकार",
        "मूल्य प्रस्ताव डिज़ाइनर",
        "मूल्य निर्धारण रणनीति गाइड"
      ]
    }
  ];

  const resources = [
    {
      title: "Idea Validation Toolkit",
      titleHi: "विचार सत्यापन टूलकिट",
      description: "Comprehensive tools to validate your business ideas",
      descriptionHi: "आपके व्यावसायिक विचारों को सत्यापित करने के लिए व्यापक उपकरण",
      icon: <CheckCircle className="h-8 w-8" />,
      features: [
        "Customer interview scripts",
        "Survey question banks",
        "Market validation metrics",
        "Feedback analysis tools"
      ],
      featuresHi: [
        "ग्राहक साक्षात्कार स्क्रिप्ट",
        "सर्वेक्षण प्रश्न बैंक",
        "बाज़ार सत्यापन मेट्रिक्स",
        "प्रतिक्रिया विश्लेषण उपकरण"
      ]
    },
    {
      title: "Market Analysis Platform",
      titleHi: "बाज़ार विश्लेषण प्लेटफॉर्म",
      description: "Deep dive into your market landscape",
      descriptionHi: "अपने बाज़ार परिदृश्य में गहराई से जाएं",
      icon: <TrendingUp className="h-8 w-8" />,
      features: [
        "Industry trend reports",
        "Competitor mapping tools",
        "Customer persona builder",
        "Market opportunity scanner"
      ],
      featuresHi: [
        "उद्योग प्रवृत्ति रिपोर्ट",
        "प्रतियोगी मानचित्रण उपकरण",
        "ग्राहक व्यक्तित्व निर्माता",
        "बाज़ार अवसर स्कैनर"
      ]
    },
    {
      title: "Business Plan Generator",
      titleHi: "व्यावसायिक योजना जेनरेटर",
      description: "Create professional business plans effortlessly",
      descriptionHi: "आसानी से पेशेवर व्यावसायिक योजनाएं बनाएं",
      icon: <FileText className="h-8 w-8" />,
      features: [
        "Step-by-step plan builder",
        "Financial projection templates",
        "Executive summary generator",
        "Investor presentation maker"
      ],
      featuresHi: [
        "चरणबद्ध योजना निर्माता",
        "वित्तीय प्रक्षेपण टेम्प्लेट",
        "कार्यकारी सारांश जेनरेटर",
        "निवेशक प्रस्तुति निर्माता"
      ]
    }
  ];

  const handleIdeaSubmit = () => {
    if (businessIdea.trim()) {
      toast({
        title: translate("Idea Submitted!", "विचार सबमिट किया गया!"),
        description: translate(
          "Your business idea has been saved for analysis",
          "आपका व्यावसायिक विचार विश्लेषण के लिए सहेजा गया है"
        ),
      });
      setBusinessIdea("");
      setTargetMarket("");
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-16">
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
                    : "border-blue-500 text-blue-500 hover:bg-blue-500/10"
                }`}
                title={translate("Read page aloud", "पेज को जोर से पढ़ें")}
              >
                {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <Translated en="Business Ideation Hub" hi="व्यावसायिक विचार केंद्र" />
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <Translated 
                en="Turn your ideas into successful businesses with our comprehensive tools and guidance. Learn market research, feasibility analysis, and business planning."
                hi="हमारे व्यापक उपकरणों और मार्गदर्शन के साथ अपने विचारों को सफल व्यवसायों में बदलें। बाज़ार अनुसंधान, व्यवहार्यता विश्लेषण और व्यावसायिक योजना सीखें।"
              />
            </p>
          </div>

          {/* Quick Idea Capture */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              <Translated en="Got a Business Idea?" hi="कोई व्यावसायिक विचार है?" />
            </h3>
            <div className="space-y-4">
              <Input
                placeholder={translate("Describe your business idea...", "अपना व्यावसायिक विचार वर्णित करें...")}
                value={businessIdea}
                onChange={(e) => setBusinessIdea(e.target.value)}
              />
              <Input
                placeholder={translate("Who is your target market?", "आपका लक्षित बाज़ार कौन है?")}
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
              />
              <Button 
                onClick={handleIdeaSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                <Translated en="Analyze My Idea" hi="मेरे विचार का विश्लेषण करें" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ideation Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Business Ideation Process" hi="व्यावसायिक विचार प्रक्रिया" />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <Translated 
                en="Follow our structured approach to develop and validate your business ideas"
                hi="अपने व्यावसायिक विचारों को विकसित और सत्यापित करने के लिए हमारे संरचित दृष्टिकोण का पालन करें"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ideationSteps.map((step, index) => (
              <Card 
                key={index} 
                className={`saheli-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  currentStep === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue-600">
                      {step.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {translate(step.title, step.titleHi)}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription>
                    {translate(step.description, step.descriptionHi)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.tools.map((tool, toolIndex) => (
                      <li key={toolIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-3 w-3 text-blue-500" />
                        {translate(tool, step.toolsHi[toolIndex])}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    <Translated en="Start Step" hi="चरण शुरू करें" />
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Ideation Resources" hi="विचार संसाधन" />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <Translated 
                en="Comprehensive tools and templates to support your business ideation journey"
                hi="आपकी व्यावसायिक विचार यात्रा का समर्थन करने के लिए व्यापक उपकरण और टेम्प्लेट"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="saheli-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue-600">
                      {resource.icon}
                    </div>
                    <div>
                      <CardTitle className="text-foreground">
                        {translate(resource.title, resource.titleHi)}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {translate(resource.description, resource.descriptionHi)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {resource.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {translate(feature, resource.featuresHi[idx])}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    <Translated en="Access Tools" hi="उपकरण एक्सेस करें" />
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            <Translated en="Ready to Launch Your Idea?" hi="अपना विचार लॉन्च करने के लिए तैयार हैं?" />
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            <Translated 
              en="Take the next step in your entrepreneurial journey with our comprehensive business development program."
              hi="हमारे व्यापक व्यावसायिक विकास कार्यक्रम के साथ अपनी उद्यमशीलता यात्रा में अगला कदम उठाएं।"
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-blue-600 hover:bg-white/90">
              <Target className="h-5 w-5 mr-2" />
              <Translated en="Start Business Plan" hi="व्यावसायिक योजना शुरू करें" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Users className="h-5 w-5 mr-2" />
              <Translated en="Join Community" hi="समुदाय में शामिल हों" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessIdeation;
