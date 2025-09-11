import { useState } from 'react';
import { Scale, FileText, Users, Phone, AlertTriangle, Shield, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import Translated from '@/components/Translated';

const LegalSupport = () => {
  const { translate, language } = useLanguage();
  const { toast } = useToast();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakPageContent = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const speechText = language === 'en'
        ? "Legal Support. Comprehensive legal assistance and guidance to protect women's rights and ensure justice. Legal consultation, document assistance, domestic violence support, and workplace rights."
        : "कानूनी सहायता। महिलाओं के अधिकारों की सुरक्षा और न्याय सुनिश्चित करने के लिए व्यापक कानूनी सहायता और मार्गदर्शन। कानूनी परामर्श, दस्तावेज़ सहायता, घरेलू हिंसा सहायता, और कार्यक्षेत्र अधिकार।";
      
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

  const legalServices = [
    {
      icon: <Scale className="h-8 w-8 text-saheli-purple" />,
      title: "Legal Consultation",
      titleHi: "कानूनी परामर्श",
      description: "Free legal advice and consultation for women facing legal challenges",
      descriptionHi: "कानूनी चुनौतियों का सामना कर रही महिलाओं के लिए मुफत कानूनी सलाह और परामर्श",
      features: ["Family law matters", "Property rights", "Employment issues"],
      featuresHi: ["पारिवारिक कानून के मामले", "संपत्ति के अधिकार", "रोजगार के मुद्दे"]
    },
    {
      icon: <FileText className="h-8 w-8 text-saheli-purple" />,
      title: "Document Assistance",
      titleHi: "दस्तावेज़ सहायता",
      description: "Help with legal documentation and paperwork",
      descriptionHi: "कानूनी दस्तावेज़ीकरण और कागजी कार्रवाई में सहायता",
      features: ["Legal document preparation", "Application filing", "Court procedures"],
      featuresHi: ["कानूनी दस्तावेज़ तैयार करना", "आवेदन दाखिल करना", "अदालती प्रक्रियाएं"]
    },
    {
      icon: <Shield className="h-8 w-8 text-saheli-purple" />,
      title: "Domestic Violence Support",
      titleHi: "घरेलू हिंसा सहायता",
      description: "Legal protection and support for victims of domestic violence",
      descriptionHi: "घरेलू हिंसा के पीड़ितों के लिए कानूनी सुरक्षा और सहायता",
      features: ["Protection orders", "Legal remedies", "Safe shelter information"],
      featuresHi: ["सुरक्षा आदेश", "कानूनी उपाय", "सुरक्षित आश्रय की जानकारी"]
    },
    {
      icon: <Users className="h-8 w-8 text-saheli-purple" />,
      title: "Workplace Rights",
      titleHi: "कार्यक्षेत्र अधिकार",
      description: "Legal support for workplace harassment and discrimination issues",
      descriptionHi: "कार्यक्षेत्र में उत्पीड़न और भेदभाव के मुद्दों के लिए कानूनी सहायता",
      features: ["Sexual harassment cases", "Equal pay rights", "Maternity benefits"],
      featuresHi: ["यौन उत्पीड़न के मामले", "समान वेतन के अधिकार", "मातृत्व लाभ"]
    }
  ];

  const legalContacts = [
    { name: "Women's Legal Helpline", nameHi: "महिला कानूनी हेल्पलाइन", number: "7827170170" },
    { name: "Domestic Violence Helpline", nameHi: "घरेलू हिंसा हेल्पलाइन", number: "1091" },
    { name: "Legal Aid Services", nameHi: "कानूनी सहायता सेवाएं", number: "15100" },
  ];

  const commonLegalIssues = [
    {
      title: "Divorce and Separation",
      titleHi: "तलाक और अलगाव",
      description: "Legal guidance for divorce proceedings, custody, and alimony",
      descriptionHi: "तलाक की कार्यवाही, हिरासत और गुजारा भत्ता के लिए कानूनी मार्गदर्शन"
    },
    {
      title: "Property Rights",
      titleHi: "संपत्ति के अधिकार",
      description: "Understanding and claiming property rights and inheritance",
      descriptionHi: "संपत्ति के अधिकार और विरासत को समझना और दावा करना"
    },
    {
      title: "Consumer Protection",
      titleHi: "उपभोक्ता संरक्षण",
      description: "Legal support for consumer complaints and fraud cases",
      descriptionHi: "उपभोक्ता शिकायतों और धोखाधड़ी के मामलों के लिए कानूनी सहायता"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-saheli-purple/10 to-saheli-accent/10"></div>
        <div className="saheli-container relative z-10 text-center">
          <div className="relative">
            {/* Text-to-Speech Button */}
            <div className="absolute top-0 right-0 sm:right-4">
              <Button
                variant="outline"
                size="icon"
                onClick={speakPageContent}
                className={`${
                  isSpeaking 
                    ? "border-red-500 text-red-500 hover:bg-red-500/10" 
                    : "border-saheli-purple text-saheli-purple hover:bg-saheli-purple/10"
                }`}
                title={translate("Read page aloud", "पेज को जोर से पढ़ें")}
              >
                {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              <Translated en="Legal Support" hi="कानूनी सहायता" />
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            <Translated 
              en="Comprehensive legal assistance and guidance to protect women's rights and ensure justice"
              hi="महिलाओं के अधिकारों की सुरक्षा और न्याय सुनिश्चित करने के लिए व्यापक कानूनी सहायता और मार्गदर्शन"
            />
          </p>
        </div>
      </section>

      {/* Legal Services */}
      <section className="py-16 saheli-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            <Translated en="Our Legal Services" hi="हमारी कानूनी सेवाएं" />
          </h2>
          <p className="text-muted-foreground">
            <Translated 
              en="Professional legal support designed to empower and protect women"
              hi="महिलाओं को सशक्त बनाने और सुरक्षा प्रदान करने के लिए डिज़ाइन की गई पेशेवर कानूनी सहायता"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {legalServices.map((service, index) => (
            <Card key={index} className="saheli-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {service.icon}
                  <div>
                    <CardTitle className="text-foreground">
                      {translate(service.title, service.titleHi)}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {translate(service.description, service.descriptionHi)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <AlertTriangle className="h-4 w-4 text-saheli-purple" />
                      {translate(feature, service.featuresHi[idx])}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Common Legal Issues */}
      <section className="py-16 bg-muted/30">
        <div className="saheli-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Common Legal Issues" hi="सामान्य कानूनी मुद्दे" />
            </h2>
            <p className="text-muted-foreground">
              <Translated 
                en="Areas where we frequently provide legal assistance"
                hi="वे क्षेत्र जहाँ हम अक्सर कानूनी सहायता प्रदान करते हैं"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commonLegalIssues.map((issue, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    {translate(issue.title, issue.titleHi)}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {translate(issue.description, issue.descriptionHi)}
                  </p>
                  <Button variant="outline" className="w-full">
                    <Translated en="Learn More" hi="और जानें" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Helplines */}
      <section className="py-16 saheli-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            <Translated en="Legal Helplines" hi="कानूनी हेल्पलाइन" />
          </h2>
          <p className="text-muted-foreground">
            <Translated 
              en="24/7 legal assistance and emergency support"
              hi="24/7 कानूनी सहायता और आपातकालीन सहायता"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legalContacts.map((contact, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-saheli-purple mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  {translate(contact.name, contact.nameHi)}
                </h3>
                <p className="text-2xl font-bold text-saheli-purple">{contact.number}</p>
                <Button className="mt-4 w-full" variant="outline">
                  <Translated en="Call Now" hi="अभी कॉल करें" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-saheli-deep to-saheli-purple/20">
        <div className="saheli-container text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            <Translated 
              en="Know your rights, protect your future"
              hi="अपने अधिकारों को जानें, अपने भविष्य की सुरक्षा करें"
            />
          </h2>
          <p className="text-muted-foreground mb-8">
            <Translated 
              en="Legal knowledge is power. Get the support you deserve."
              hi="कानूनी ज्ञान शक्ति है। वह सहायता प्राप्त करें जिसके आप हकदार हैं।"
            />
          </p>
          <Button className="saheli-btn text-lg">
            <Translated en="Get Legal Help" hi="कानूनी सहायता प्राप्त करें" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LegalSupport;
