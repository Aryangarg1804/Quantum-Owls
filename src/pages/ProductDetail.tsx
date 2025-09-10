
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, VolumeX, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailProps {}

const ProductDetail = ({}: ProductDetailProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { language, translate } = useLanguage();
  const { addItem } = useCart();
  
  // Product data map - in a real app, this would come from an API
  const products = {
    "handloom-sarees": {
      title: "Handloom Sarees",
      titleHi: "हथकरघा साड़ियां",
      producer: "Lakshmi's Weaves",
      producerHi: "लक्ष्मी की बुनाई",
      description: "Traditional handwoven sarees made by skilled artisans from rural India. Each piece is unique with intricate patterns that represent the rich cultural heritage of different regions. These sarees are made using traditional techniques passed down through generations.",
      descriptionHi: "ग्रामीण भारत के कुशल कारीगरों द्वारा बनाई गई पारंपरिक हथकरघा साड़ियां। प्रत्येक टुकड़ा विभिन्न क्षेत्रों की समृद्ध सांस्कृतिक विरासत का प्रतिनिधित्व करने वाले जटिल पैटर्न के साथ अद्वितीय है। ये साड़ियां पीढ़ियों से चली आ रही पारंपरिक तकनीकों का उपयोग करके बनाई जाती हैं।",
      priceRange: "₹2,500 - ₹15,000",
      images: [
        "https://i.pinimg.com/736x/21/aa/d6/21aad68ea6ffbcadc1478237b2f8ad75.jpg",
        "https://i.pinimg.com/736x/03/b8/15/03b8150f83b1e44653a3c7cbe122b4b9.jpg"
      ],
      features: [
        "100% handwoven cotton or silk",
        "Natural dyes",
        "Unique designs",
        "Direct from artisans"
      ],
      featuresHi: [
        "100% हथकरघा सूती या रेशमी",
        "प्राकृतिक रंग",
        "अनूठे डिज़ाइन",
        "कारीगरों से सीधे"
      ],
      story: "These sarees are crafted by women artisans from rural villages who have been practicing this craft for generations. By purchasing these sarees, you are directly supporting these women and their communities, helping them preserve their traditional art forms while gaining financial independence.",
      storyHi: "ये साड़ियां ग्रामीण गांवों की महिला कारीगरों द्वारा बनाई जाती हैं जो पीढ़ियों से इस शिल्प का अभ्यास कर रही हैं। इन साड़ियों को खरीदकर, आप सीधे इन महिलाओं और उनके समुदायों का समर्थन कर रहे हैं, उन्हें अपने पारंपरिक कला रूपों को संरक्षित करने में मदद कर रहे हैं जबकि वित्तीय स्वतंत्रता प्राप्त कर रहे हैं।"
    },
    "organic-spices": {
      title: "Organic Spices",
      titleHi: "जैविक मसाले",
      producer: "Rural Women's Collective",
      producerHi: "ग्रामीण महिला संघ",
      description: "Pure and authentic spices sourced directly from farmers across India. These spices are grown using organic farming methods without any harmful chemicals or pesticides. Each product is carefully processed to retain maximum flavor and aroma.",
      descriptionHi: "पूरे भारत के किसानों से सीधे प्राप्त शुद्ध और प्रामाणिक मसाले। ये मसाले किसी भी हानिकारक रसायन या कीटनाशकों के बिना जैविक खेती के तरीकों का उपयोग करके उगाए जाते हैं। प्रत्येक उत्पाद अधिकतम स्वाद और सुगंध बनाए रखने के लिए सावधानीपूर्वक संसाधित किया जाता है।",
      priceRange: "₹200 - ₹1,000",
      images: [
        "https://i.pinimg.com/736x/9e/2f/8d/9e2f8d1d97af425fd0086b181d77e9ee.jpg",
        "https://i.pinimg.com/736x/1c/e6/19/1ce619f3f969a90d10c3cc3eef15483f.jpg"
      ],
      features: [
        "100% organic",
        "No preservatives",
        "Sustainable packaging",
        "Fair trade certified"
      ],
      featuresHi: [
        "100% जैविक",
        "कोई परिरक्षक नहीं",
        "टिकाऊ पैकेजिंग",
        "फेयर ट्रेड प्रमाणित"
      ],
      story: "These spices are cultivated and processed by a collective of rural women who have formed a cooperative to market their products directly to consumers, eliminating middlemen and ensuring fair compensation for their labor. The collective also provides training in organic farming practices and financial literacy to its members.",
      storyHi: "ये मसाले ग्रामीण महिलाओं के एक समूह द्वारा उगाए और संसाधित किए जाते हैं, जिन्होंने अपने उत्पादों को सीधे उपभोक्ताओं को बेचने के लिए एक सहकारी समिति बनाई है, जिससे बिचौलियों को खत्म किया जा सके और उनके श्रम के लिए उचित मुआवजा सुनिश्चित किया जा सके। सामूहिक रूप से अपने सदस्यों को जैविक खेती प्रथाओं और वित्तीय साक्षरता में प्रशिक्षण भी प्रदान करता है।"
    },
    "handicraft-items": {
      title: "Handicraft Items",
      titleHi: "हस्तशिल्प वस्तुएं",
      producer: "Artisan Circle",
      producerHi: "कारीगर मंडल",
      description: "Handmade decorative items and home accessories created by skilled craftswomen. These pieces blend traditional techniques with contemporary designs to create unique items that add character to any space. Each product reflects the cultural heritage of its creator.",
      descriptionHi: "कुशल महिला शिल्पकारों द्वारा बनाई गई हस्तनिर्मित सजावटी वस्तुएं और घरेलू सामान। ये टुकड़े पारंपरिक तकनीकों को समकालीन डिजाइनों के साथ मिलाते हैं ताकि अनूठी वस्तुएं बनाई जा सकें जो किसी भी स्थान पर चरित्र जोड़ती हैं। प्रत्येक उत्पाद अपने निर्माता की सांस्कृतिक विरासत को दर्शाता है।",
      priceRange: "₹500 - ₹5,000",
      images: [
        "https://i.pinimg.com/736x/32/ba/95/32ba959188b404fe65c042563c400994.jpg",
        "https://i.pinimg.com/736x/bc/91/88/bc918872220656ff68553287ac5546f4.jpg"
      ],
      features: [
        "Handcrafted",
        "Eco-friendly materials",
        "Traditional designs",
        "Supports local artisans"
      ],
      featuresHi: [
        "हस्तनिर्मित",
        "पर्यावरण अनुकूल सामग्री",
        "पारंपरिक डिजाइन",
        "स्थानीय कारीगरों का समर्थन"
      ],
      story: "Each piece in this collection is made by women artisans who are preserving traditional crafts while supporting their families. Many of these women are the sole breadwinners in their households, and their craft provides them with a sustainable source of income. The Artisan Circle collective provides them with design inputs, quality control guidance, and market access.",
      storyHi: "इस संग्रह का प्रत्येक टुकड़ा ऐसी महिला कारीगरों द्वारा बनाया जाता है जो अपने परिवारों का समर्थन करते हुए पारंपरिक शिल्प को संरक्षित कर रही हैं। इनमें से कई महिलाएं अपने घरों में अकेली कमाने वाली हैं, और उनका शिल्प उन्हें आय का एक टिकाऊ स्रोत प्रदान करता है। कारीगर मंडल समूह उन्हें डिजाइन इनपुट, गुणवत्ता नियंत्रण मार्गदर्शन और बाजार तक पहुंच प्रदान करता है।"
    },
    "organic-beauty": {
      title: "Organic Beauty Products",
      titleHi: "जैविक सौंदर्य उत्पाद",
      producer: "Nature's Touch",
      producerHi: "प्रकृति का स्पर्श",
      description: "Natural skincare products made from traditional recipes using organic ingredients. These products harness the power of ancient Ayurvedic formulations combined with modern research to create effective, gentle skincare solutions. All ingredients are locally sourced and sustainably harvested.",
      descriptionHi: "जैविक सामग्री का उपयोग करके पारंपरिक व्यंजनों से बने प्राकृतिक स्किनकेयर उत्पाद। ये उत्पाद प्रभावी, सौम्य स्किनकेयर समाधान बनाने के लिए आधुनिक अनुसंधान के साथ संयुक्त प्राचीन आयुर्वेदिक सूत्रों की शक्ति का उपयोग करते हैं। सभी सामग्री स्थानीय रूप से प्राप्त की जाती है और टिकाऊ रूप से काटी जाती है।",
      priceRange: "₹150 - ₹1,200",
      images: [
        "https://i.pinimg.com/736x/f9/47/d8/f947d80e154238a8327d7bfbfa1c1d90.jpg",
        "https://i.pinimg.com/736x/4a/96/76/4a9676bf4df18d0172e4c5bedc2d4d10.jpg"
      ],
      features: [
        "100% natural ingredients",
        "No harmful chemicals",
        "Cruelty-free",
        "Eco-friendly packaging"
      ],
      featuresHi: [
        "100% प्राकृतिक सामग्री",
        "कोई हानिकारक रसायन नहीं",
        "क्रूरता मुक्त",
        "पर्यावरण अनुकूल पैकेजिंग"
      ],
      story: "Nature's Touch was founded by a group of women from rural areas who wanted to revive traditional beauty recipes passed down through generations. What started as a small initiative has grown into a thriving business that empowers rural women by providing them with employment opportunities and a platform to showcase their knowledge of natural ingredients and traditional formulations.",
      storyHi: "प्रकृति का स्पर्श की स्थापना ग्रामीण क्षेत्रों की महिलाओं के एक समूह द्वारा की गई थी जो पीढ़ियों से चली आ रही पारंपरिक सौंदर्य व्यंजनों को पुनर्जीवित करना चाहती थीं। जो एक छोटी पहल के रूप में शुरू हुआ, वह ग्रामीण महिलाओं को रोजगार के अवसर और प्राकृतिक सामग्री और पारंपरिक सूत्रों के अपने ज्ञान को प्रदर्शित करने के लिए एक मंच प्रदान करके सशक्त बनाने वाले एक फलते-फूलते व्यवसाय में विकसित हो गया है।"
    }
  };
  
  const product = products[id as keyof typeof products];
  
  if (!product) {
    return (
      <div className="saheli-container py-12">
        <h1 className="saheli-title mb-4">Product Not Found</h1>
        <Button className="saheli-btn" onClick={() => navigate('/entrepreneurship')}>
          Back to Products
        </Button>
      </div>
    );
  }
  
  const handleBack = () => {
    navigate('/entrepreneurship');
  };
  
  const handleBuy = () => {
    addItem({
      id: id as string,
      title: product.title,
      titleHi: product.titleHi,
      price: product.priceRange.split('-')[0].trim(), // Use the lower price range
      quantity: 1,
      image: product.images[0]
    });
  };
  
  const speakText = () => {
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
        ? `${product.title} by ${product.producer}. ${product.description}. Price range: ${product.priceRange}.` 
        : `${product.titleHi}, ${product.producerHi} द्वारा। ${product.descriptionHi}। मूल्य सीमा: ${product.priceRange}।`;
      
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
    <div className="min-h-screen py-12">
      <div className="saheli-container animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2 text-saheli-purple hover:text-saheli-purple/80"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{translate("Back to Products", "उत्पादों पर वापस जाएं")}</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={speakText}
            className={`flex items-center gap-2 ${
              isSpeaking 
                ? "border-red-500 text-red-500 hover:bg-red-500/10" 
                : "border-saheli-purple text-saheli-purple hover:bg-saheli-purple/10"
            }`}
          >
            {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            <span>{isSpeaking ? translate("Stop", "रोकें") : translate("Read Aloud", "ज़ोर से पढ़ें")}</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="saheli-title mb-4">{translate(product.title, product.titleHi)}</h1>
            <p className="text-saheli-purple font-medium text-xl mb-6">{translate(product.producer, product.producerHi)}</p>
            
            <div className="bg-gradient-to-r from-saheli-purple/20 to-saheli-accent/20 p-6 rounded-xl mb-6 backdrop-blur-sm animate-fade-in">
              <p className="text-white/90 text-lg leading-relaxed">
                {translate(product.description, product.descriptionHi)}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div className="saheli-card animate-scale-in" style={{animationDelay: '100ms'}}>
                <h3 className="text-xl font-semibold mb-4 text-saheli-purple">
                  {translate("Features", "विशेषताएँ")}
                </h3>
                <ul className="space-y-2">
                  {(language === 'en' ? product.features : product.featuresHi).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/80">
                      <span className="inline-block h-6 w-6 bg-saheli-purple/20 text-saheli-purple rounded-full flex-shrink-0 flex items-center justify-center text-sm mt-0.5">{index + 1}</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="saheli-card animate-scale-in" style={{animationDelay: '200ms'}}>
              <h3 className="text-xl font-semibold mb-4 text-saheli-purple">
                {translate("Our Story", "हमारी कहानी")}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {translate(product.story, product.storyHi)}
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="saheli-card mb-6 animate-scale-in" style={{animationDelay: '300ms'}}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {product.images.map((img, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <img 
                        src={img} 
                        alt={translate(product.title, product.titleHi)} 
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg mb-4">
                  <h4 className="font-medium text-saheli-purple mb-2">
                    {translate("Price Range", "मूल्य सीमा")}
                  </h4>
                  <p className="text-white/80 text-xl font-bold">{product.priceRange}</p>
                </div>
                
                <Button 
                  className="saheli-btn w-full mb-4 flex items-center justify-center gap-2"
                  onClick={handleBuy}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{translate("Add to Cart", "कार्ट में जोड़ें")}</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-saheli-purple text-saheli-purple hover:bg-saheli-purple/10"
                  onClick={() => toast({
                    title: translate("Coming Soon", "जल्द आ रहा है"),
                    description: translate(
                      "Contact seller functionality will be available soon",
                      "विक्रेता से संपर्क सुविधा जल्द ही उपलब्ध होगी"
                    ),
                  })}
                >
                  {translate("Contact Seller", "विक्रेता से संपर्क करें")}
                </Button>
              </div>
              
              <div className="saheli-card animate-scale-in" style={{animationDelay: '400ms'}}>
                <h4 className="font-medium text-saheli-purple mb-4">
                  {translate("You May Also Like", "आपको यह भी पसंद आ सकता है")}
                </h4>
                <ul className="space-y-3">
                  {Object.entries(products)
                    .filter(([key]) => key !== id)
                    .slice(0, 3)
                    .map(([key, p]) => (
                      <li key={key}>
                        <a 
                          href={`/product/${key}`} 
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          {translate(p.title, p.titleHi)}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
