import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  BookOpen, 
  Smartphone, 
  Camera, 
  TrendingUp, 
  Users, 
  Share2, 
  MessageCircle,
  Volume2,
  VolumeX,
  ArrowRight,
  Globe,
  ShoppingCart,
  Mail,
  Video,
  Image as ImageIcon,
  BarChart3,
  Target,
  Zap
} from "lucide-react";
import Translated from "@/components/Translated";

const DigitalMarketing = () => {
  const { translate, language } = useLanguage();
  const { toast } = useToast();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");

  const speakPageContent = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const speechText = language === 'en'
        ? "Digital Marketing Academy. Learn online marketing strategies to reach customers. Master social media, e-commerce, content creation, and customer engagement."
        : "डिजिटल मार्केटिंग अकादमी। ग्राहकों तक पहुंचने के लिए ऑनलाइन मार्केटिंग रणनीतियां सीखें। सोशल मीडिया, ई-कॉमर्स, सामग्री निर्माण और ग्राहक जुड़ाव में महारत हासिल करें।";
      
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

  const marketingChannels = [
    {
      title: "Social Media Marketing",
      titleHi: "सोशल मीडिया मार्केटिंग",
      description: "Build your brand presence on social platforms",
      descriptionHi: "सामाजिक प्लेटफॉर्म पर अपनी ब्रांड उपस्थिति बनाएं",
      icon: <Share2 className="h-6 w-6" />,
      platforms: ["Facebook", "Instagram", "WhatsApp Business", "YouTube"],
      color: "from-pink-500 to-red-500"
    },
    {
      title: "E-commerce Platforms",
      titleHi: "ई-कॉमर्स प्लेटफॉर्म",
      description: "Sell your products online effectively",
      descriptionHi: "अपने उत्पादों को ऑनलाइन प्रभावी रूप से बेचें",
      icon: <ShoppingCart className="h-6 w-6" />,
      platforms: ["Amazon", "Flipkart", "Meesho", "Your own website"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Content Creation",
      titleHi: "सामग्री निर्माण",
      description: "Create engaging content for your audience",
      descriptionHi: "अपने दर्शकों के लिए आकर्षक सामग्री बनाएं",
      icon: <Camera className="h-6 w-6" />,
      platforms: ["Blog posts", "Videos", "Photos", "Stories"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Email Marketing",
      titleHi: "ईमेल मार्केटिंग",
      description: "Connect directly with your customers",
      descriptionHi: "अपने ग्राहकों से सीधे जुड़ें",
      icon: <Mail className="h-6 w-6" />,
      platforms: ["Newsletter", "Promotions", "Updates", "Customer care"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  const digitalSkills = [
    {
      title: "Photography & Video",
      titleHi: "फोटोग्राफी और वीडियो",
      description: "Learn to create stunning visual content",
      descriptionHi: "आश्चर्यजनक दृश्य सामग्री बनाना सीखें",
      icon: <Video className="h-8 w-8" />,
      skills: [
        "Product photography basics",
        "Video shooting techniques",
        "Editing with free tools",
        "Lighting and composition"
      ],
      skillsHi: [
        "उत्पाद फोटोग्राफी मूल बातें",
        "वीडियो शूटिंग तकनीक",
        "मुफ्त उपकरणों के साथ संपादन",
        "प्रकाश और संरचना"
      ]
    },
    {
      title: "Social Media Strategy",
      titleHi: "सोशल मीडिया रणनीति",
      description: "Build an effective social media presence",
      descriptionHi: "एक प्रभावी सोशल मीडिया उपस्थिति बनाएं",
      icon: <TrendingUp className="h-8 w-8" />,
      skills: [
        "Content planning calendar",
        "Audience engagement tactics",
        "Hashtag strategies",
        "Community building"
      ],
      skillsHi: [
        "सामग्री योजना कैलेंडर",
        "दर्शक जुड़ाव रणनीति",
        "हैशटैग रणनीतियां",
        "समुदाय निर्माण"
      ]
    },
    {
      title: "Online Store Setup",
      titleHi: "ऑनलाइन स्टोर सेटअप",
      description: "Create your own e-commerce presence",
      descriptionHi: "अपनी खुद की ई-कॉमर्स उपस्थिति बनाएं",
      icon: <Globe className="h-8 w-8" />,
      skills: [
        "Platform selection guide",
        "Product listing optimization",
        "Payment gateway setup",
        "Order management"
      ],
      skillsHi: [
        "प्लेटफॉर्म चयन गाइड",
        "उत्पाद सूची अनुकूलन",
        "भुगतान गेटवे सेटअप",
        "ऑर्डर प्रबंधन"
      ]
    }
  ];

  const marketingTools = [
    {
      name: "Canva",
      type: "Design",
      typeHi: "डिज़ाइन",
      description: "Create beautiful graphics and posts",
      descriptionHi: "सुंदर ग्राफिक्स और पोस्ट बनाएं",
      features: ["Templates", "Photo editing", "Brand kit", "Free version"],
      featuresHi: ["टेम्प्लेट", "फोटो संपादन", "ब्रांड किट", "मुफ्त संस्करण"]
    },
    {
      name: "WhatsApp Business",
      type: "Communication",
      typeHi: "संचार",
      description: "Professional customer communication",
      descriptionHi: "पेशेवर ग्राहक संचार",
      features: ["Business profile", "Catalog", "Labels", "Quick replies"],
      featuresHi: ["व्यावसायिक प्रोफ़ाइल", "कैटलॉग", "लेबल", "त्वरित उत्तर"]
    },
    {
      name: "Google My Business",
      type: "Local SEO",
      typeHi: "स्थानीय SEO",
      description: "Improve local search visibility",
      descriptionHi: "स्थानीय खोज दृश्यता में सुधार करें",
      features: ["Business listing", "Reviews", "Photos", "Posts"],
      featuresHi: ["व्यावसायिक सूची", "समीक्षाएं", "फोटो", "पोस्ट"]
    },
    {
      name: "Facebook Page",
      type: "Social Media",
      typeHi: "सोशल मीडिया",
      description: "Build community and showcase products",
      descriptionHi: "समुदाय बनाएं और उत्पादों को प्रदर्शित करें",
      features: ["Page insights", "Events", "Shop section", "Messenger"],
      featuresHi: ["पेज अंतर्दृष्टि", "इवेंट्स", "शॉप सेक्शन", "मैसेंजर"]
    }
  ];

  const handleChannelSelect = (channel: string) => {
    setSelectedChannel(channel);
    toast({
      title: translate("Channel Selected!", "चैनल चुना गया!"),
      description: translate(
        `You've selected ${channel} for your marketing strategy`,
        `आपने अपनी मार्केटिंग रणनीति के लिए ${channel} चुना है`
      ),
    });
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 py-16">
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
                    : "border-purple-500 text-purple-500 hover:bg-purple-500/10"
                }`}
                title={translate("Read page aloud", "पेज को जोर से पढ़ें")}
              >
                {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <Translated en="Digital Marketing Academy" hi="डिजिटल मार्केटिंग अकादमी" />
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <Translated 
                en="Learn online marketing strategies to reach customers. Master social media, e-commerce, content creation, and customer engagement."
                hi="ग्राहकों तक पहुंचने के लिए ऑनलाइन मार्केटिंग रणनीतियां सीखें। सोशल मीडिया, ई-कॉमर्स, सामग्री निर्माण और ग्राहक जुड़ाव में महारत हासिल करें।"
              />
            </p>
          </div>

          {/* Quick Setup */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              <Translated en="Get Started with Digital Marketing" hi="डिजिटल मार्केटिंग के साथ शुरुआत करें" />
            </h3>
            <div className="space-y-4">
              <Input
                placeholder={translate("Your business name...", "आपका व्यावसायिक नाम...")}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <BookOpen className="h-4 w-4 mr-2" />
                <Translated en="Create Marketing Plan" hi="मार्केटिंग योजना बनाएं" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Channels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Marketing Channels" hi="मार्केटिंग चैनल" />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <Translated 
                en="Choose the right platforms to connect with your customers"
                hi="अपने ग्राहकों से जुड़ने के लिए सही प्लेटफॉर्म चुनें"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingChannels.map((channel, index) => (
              <Card 
                key={index} 
                className="saheli-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleChannelSelect(channel.title)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${channel.color} text-white`}>
                      {channel.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {translate(channel.title, channel.titleHi)}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription>
                    {translate(channel.description, channel.descriptionHi)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {channel.platforms.map((platform, platformIndex) => (
                      <li key={platformIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-3 w-3 text-purple-500" />
                        {platform}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full bg-gradient-to-r ${channel.color} hover:opacity-90 text-white`}>
                    <Translated en="Learn More" hi="और जानें" />
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Skills */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Essential Digital Skills" hi="आवश्यक डिजिटल कौशल" />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <Translated 
                en="Master the fundamental skills needed for digital marketing success"
                hi="डिजिटल मार्केटिंग सफलता के लिए आवश्यक मौलिक कौशल में महारत हासिल करें"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {digitalSkills.map((skill, index) => (
              <Card key={index} className="saheli-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-600">
                      {skill.icon}
                    </div>
                    <div>
                      <CardTitle className="text-foreground">
                        {translate(skill.title, skill.titleHi)}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {translate(skill.description, skill.descriptionHi)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {skill.skills.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Target className="h-4 w-4 text-green-500" />
                        {translate(item, skill.skillsHi[idx])}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <Translated en="Start Learning" hi="सीखना शुरू करें" />
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Recommended Tools" hi="अनुशंसित उपकरण" />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <Translated 
                en="Free and affordable tools to help you market your business effectively"
                hi="आपके व्यवसाय को प्रभावी रूप से मार्केट करने में मदद के लिए मुफ्त और किफायती उपकरण"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingTools.map((tool, index) => (
              <Card key={index} className="saheli-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>
                    {translate(tool.type, tool.typeHi)} • {translate(tool.description, tool.descriptionHi)}
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
                    <Translated en="Try Tool" hi="उपकरण आज़माएं" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            <Translated en="Start Your Digital Journey Today" hi="आज ही अपनी डिजिटल यात्रा शुरू करें" />
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            <Translated 
              en="Join our comprehensive digital marketing program and transform your business reach."
              hi="हमारे व्यापक डिजिटल मार्केटिंग कार्यक्रम में शामिल हों और अपने व्यावसायिक पहुंच को बदलें।"
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-purple-600 hover:bg-white/90">
              <BarChart3 className="h-5 w-5 mr-2" />
              <Translated en="View Course Outline" hi="कोर्स रूपरेखा देखें" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Users className="h-5 w-5 mr-2" />
              <Translated en="Join Workshop" hi="कार्यशाला में शामिल हों" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;
