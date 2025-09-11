
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useProducts } from "@/contexts/ProductContext";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  Award, 
  Star, 
  Lightbulb, 
  BookOpen, 
  Target, 
  Zap,
  ArrowRight,
  ExternalLink,
  Heart,
  Share2,
  MessageCircle,
  Volume2,
  VolumeX
} from "lucide-react";
import Translated from "@/components/Translated";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Entrepreneurship = () => {
  const { translate, language } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Categories for filtering
  const categories = [
    { value: "all", label: "All Products", labelHi: "सभी उत्पाद" },
    { value: "textiles", label: "Textiles & Handloom", labelHi: "वस्त्र और हथकरघा" },
    { value: "food", label: "Food & Spices", labelHi: "भोजन और मसाले" },
    { value: "handicrafts", label: "Handicrafts", labelHi: "हस्तशिल्प" },
    { value: "beauty", label: "Beauty & Wellness", labelHi: "सौंदर्य और कल्याण" },
    { value: "agriculture", label: "Agriculture", labelHi: "कृषि" }
  ];
  // Dynamic products via context
  const { products } = useProducts();

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.titleHi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.producerHi.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Statistics data
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Women Entrepreneurs",
      titleHi: "महिला उद्यमी",
      value: "12,500+",
      description: "Registered on platform",
      descriptionHi: "प्लेटफॉर्म पर पंजीकृत"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Monthly Revenue",
      titleHi: "मासिक आय",
      value: "₹50L+",
      description: "Generated collectively",
      descriptionHi: "सामूहिक रूप से उत्पन्न"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Success Rate",
      titleHi: "सफलता दर",
      value: "78%",
      description: "Business sustainability",
      descriptionHi: "व्यवसाय स्थिरता"
    }
  ];

  // Resources for entrepreneurs
  const resources = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Business Ideation",
      titleHi: "व्यवसाय विचार",
      description: "Workshops to help generate and validate business ideas",
      descriptionHi: "व्यवसाय विचारों को उत्पन्न और सत्यापित करने में मदद के लिए कार्यशालाएं",
      features: [
        "Market research guidance",
        "Feasibility analysis",
        "Competitor analysis",
        "Business model canvas"
      ],
      featuresHi: [
        "बाज़ार अनुसंधान मार्गदर्शन",
        "व्यवहार्यता विश्लेषण",
        "प्रतियोगी विश्लेषण",
        "व्यवसाय मॉडल कैनवास"
      ]
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Digital Marketing",
      titleHi: "डिजिटल मार्केटिंग",
      description: "Learn online marketing strategies to reach customers",
      descriptionHi: "ग्राहकों तक पहुंचने के लिए ऑनलाइन मार्केटिंग रणनीतियां सीखें",
      features: [
        "Social media marketing",
        "E-commerce platforms",
        "Content creation",
        "Customer engagement"
      ],
      featuresHi: [
        "सोशल मीडिया मार्केटिंग",
        "ई-कॉमर्स प्लेटफॉर्म",
        "सामग्री निर्माण",
        "ग्राहक जुड़ाव"
      ]
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Financial Planning",
      titleHi: "वित्तीय योजना",
      description: "Business financial management and funding guidance",
      descriptionHi: "व्यवसाय वित्तीय प्रबंधन और फंडिंग मार्गदर्शन",
      features: [
        "Cash flow management",
        "Loan application assistance",
        "Investment planning",
        "Tax compliance"
      ],
      featuresHi: [
        "नकदी प्रवाह प्रबंधन",
        "ऋण आवेदन सहायता",
        "निवेश योजना",
        "कर अनुपालन"
      ]
    }
  ];

  const speakPageContent = () => {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      // If already speaking, stop
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      // Create a new speech synthesis utterance
      const speechText = language === 'en'
        ? `Women Entrepreneurs Showcase. Discover amazing businesses started by rural women entrepreneurs. Support local artisans and empower communities. We have ${filteredProducts.length} products available for you.`
        : `महिला उद्यमी शोकेस। ग्रामीण महिला उद्यमियों द्वारा शुरू किए गए अद्भुत व्यवसायों की खोज करें। स्थानीय कारीगरों का समर्थन करें और समुदायों को सशक्त बनाएं। हमारे पास आपके लिए ${filteredProducts.length} उत्पाद उपलब्ध हैं।`;
      
      const utterance = new SpeechSynthesisUtterance(speechText);
      
      // Set language based on current state
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      
      // Set event handlers
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
      
      // Speak the text
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

  return (
    <div className="min-h-screen pt-16">
      {/* Enhanced Hero Section with Search */}
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
              {translate("Women Entrepreneurs Showcase", "महिला उद्यमी शोकेस")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {translate(
                "Discover amazing businesses started by rural women entrepreneurs. Support local artisans and empower communities.",
                "ग्रामीण महिला उद्यमियों द्वारा शुरू किए गए अद्भुत व्यवसायों की खोज करें। स्थानीय कारीगरों का समर्थन करें और समुदायों को सशक्त बनाएं।"
              )}
            </p>
            <div className="mt-6 flex justify-center">
              <a href="/add-product">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <Translated en="Add your product" hi="अपना उत्पाद जोड़ें" />
                </Button>
              </a>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={translate("Search products...", "उत्पाद खोजें...")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12">
                  <Filter className="h-5 w-5 mr-2" />
                  <SelectValue placeholder={translate("Select Category", "श्रेणी चुनें")} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {translate(category.label, category.labelHi)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                  <div className="flex justify-center mb-2 text-purple-600 dark:text-purple-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {translate(stat.title, stat.titleHi)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {translate(stat.description, stat.descriptionHi)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                {translate("No products found", "कोई उत्पाद नहीं मिला")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {translate(
                  "Please try adjusting your search or filters",
                  "कृपया अपनी खोज या फ़िल्टर बदलें"
                )}
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {translate("Featured Products", "विशेष उत्पाद")}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredProducts.length} {translate("products found", "उत्पाद मिले")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    titleHi={product.titleHi}
                    producer={product.producer}
                    producerHi={product.producerHi}
                    description={product.description}
                    descriptionHi={product.descriptionHi}
                    priceRange={product.priceRange}
                    delay={index * 100}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Entrepreneurship Resources Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Entrepreneurship Resources" hi="उद्यमिता संसाधन" />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <Translated 
                en="Essential tools and guidance to help you start and grow your business"
                hi="आपके व्यवसाय को शुरू करने और बढ़ाने में मदद के लिए आवश्यक उपकरण और मार्गदर्शन" 
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="saheli-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-saheli-purple/10 to-saheli-pink/10 text-saheli-purple">
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
                        <Zap className="h-4 w-4 text-saheli-purple" />
                        {translate(feature, resource.featuresHi[idx])}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-saheli-purple to-saheli-pink hover:from-saheli-purple/90 hover:to-saheli-pink/90 text-white">
                    <Translated en="Learn More" hi="और जानें" />
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Success Stories Section */}
      <section className="py-16 bg-saheli-deep/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              {translate("Success Stories", "सफलता की कहानियां")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {translate(
                "Stories of women who transformed their lives through entrepreneurship",
                "ऐसी महिलाओं की कहानियां जिन्होंने उद्यमिता के माध्यम से अपना जीवन बदला"
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="saheli-card animate-scale-in hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-saheli-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-saheli-purple text-xl font-bold">R</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {translate("Rekha's Spice Business", "रेखा का मसाला व्यवसाय")}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {translate(
                        `"Starting my own spice business allowed me to support my family and send my daughters to college. The government schemes and Saheli's guidance helped me expand from a small home operation to a collective that now employs 15 women from my village."`,
                        `"अपना खुद का मसाला व्यवसाय शुरू करने से मुझे अपने परिवार का समर्थन करने और अपनी बेटियों को कॉलेज भेजने की अनुमति मिली। सरकारी योजनाओं और साहेली के मार्गदर्शन ने मुझे एक छोटे घरेलू संचालन से एक सामूहिक संगठन तक विस्तार करने में मदद की, जो अब मेरे गांव की 15 महिलाओं को रोजगार देता है।"`
                      )}
                    </p>
                    <p className="text-saheli-purple font-medium text-sm">
                      {translate(
                        "Rekha Devi, Founder of Rural Spice Collective",
                        "रेखा देवी, ग्रामीण मसाला सामूहिक की संस्थापक"
                      )}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-muted-foreground">4.9 rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-saheli-purple" />
                        <span className="text-sm text-muted-foreground">328 orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="saheli-card animate-scale-in hover:shadow-xl transition-all duration-300" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-saheli-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-saheli-purple text-xl font-bold">S</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {translate("Sunita's Handloom Journey", "सुनीता की हथकरघा यात्रा")}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {translate(
                        `"I learned weaving from my mother, but never thought it could be a profitable business. With a small loan from Mahila Udyam Nidhi and digital marketing skills from Saheli workshops, my handloom products now reach customers across the country."`,
                        `"मैंने अपनी मां से बुनाई सीखी, लेकिन कभी नहीं सोचा था कि यह एक लाभदायक व्यवसाय हो सकता है। महिला उद्यम निधि से एक छोटे ऋण और साहेली कार्यशालाओं से डिजिटल मार्केटिंग कौशल के साथ, मेरे हथकरघा उत्पाद अब पूरे देश के ग्राहकों तक पहुंचते हैं।"`
                      )}
                    </p>
                    <p className="text-saheli-purple font-medium text-sm">
                      {translate(
                        "Sunita Sharma, Owner of Heritage Handlooms",
                        "सुनीता शर्मा, हेरिटेज हैंडलूम्स की मालिक"
                      )}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-muted-foreground">4.8 rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-saheli-purple" />
                        <span className="text-sm text-muted-foreground">145 orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-saheli-purple to-saheli-pink text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {translate("Ready to Start Your Entrepreneurial Journey?", "अपनी उद्यमिता यात्रा शुरू करने के लिए तैयार हैं?")}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {translate(
              "Join thousands of successful women entrepreneurs who have transformed their communities and lives.",
              "हजारों सफल महिला उद्यमियों से जुड़ें जिन्होंने अपने समुदायों और जीवन को बदला है।"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-saheli-purple hover:bg-white/90">
              <Users className="h-5 w-5 mr-2" />
              <Translated en="Join Community" hi="समुदाय में शामिल हों" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-saheli-purple">
              <ExternalLink className="h-5 w-5 mr-2" />
              <Translated en="Start Selling" hi="बेचना शुरू करें" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Entrepreneurship;
