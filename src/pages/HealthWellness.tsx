import { useState } from 'react';
import { Heart, Activity, Shield, Brain, Zap, Phone, Smartphone, Download, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import Translated from '@/components/Translated';

const HealthWellness = () => {
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
        ? "Health and Wellness. Comprehensive health resources and support systems designed specifically for women's wellbeing. Maternal health, physical fitness, mental health, and preventive care."
        : "स्वास्थ्य और कल्याण। विशेष रूप से महिलाओं की भलाई के लिए डिज़ाइन किए गए व्यापक स्वास्थ्य संसाधन और सहायता प्रणाली। मातृ स्वास्थ्य, शारीरिक स्वास्थ्य, मानसिक स्वास्थ्य, और निवारक देखभाल।";
      
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

  const healthResources = [
    {
      icon: <Heart className="h-8 w-8 text-saheli-purple" />,
      title: "Maternal Health",
      titleHi: "मातृ स्वास्थ्य",
      description: "Comprehensive care and support for expectant and new mothers",
      descriptionHi: "गर्भवती और नई माताओं के लिए व्यापक देखभाल और सहायता",
      features: ["Pre and postnatal care", "Nutrition guidance", "Mental health support"],
      featuresHi: ["प्रसवपूर्व और प्रसवोत्तर देखभाल", "पोषण मार्गदर्शन", "मानसिक स्वास्थ्य सहायता"]
    },
    {
      icon: <Activity className="h-8 w-8 text-saheli-purple" />,
      title: "Physical Fitness",
      titleHi: "शारीरिक स्वास्थ्य",
      description: "Exercise programs and fitness guidance tailored for women",
      descriptionHi: "महिलाओं के लिए तैयार किए गए व्यायाम कार्यक्रम और फिटनेस मार्गदर्शन",
      features: ["Home workout routines", "Yoga and meditation", "Nutritional advice"],
      featuresHi: ["घरेलू व्यायाम दिनचर्या", "योग और ध्यान", "पोषण संबंधी सलाह"]
    },
    {
      icon: <Brain className="h-8 w-8 text-saheli-purple" />,
      title: "Mental Health",
      titleHi: "मानसिक स्वास्थ्य",
      description: "Support for emotional wellbeing and mental health challenges",
      descriptionHi: "भावनात्मक कल्याण और मानसिक स्वास्थ्य चुनौतियों के लिए सहायता",
      features: ["Counseling services", "Stress management", "Support groups"],
      featuresHi: ["परामर्श सेवाएं", "तनाव प्रबंधन", "सहायता समूह"]
    },
    {
      icon: <Shield className="h-8 w-8 text-saheli-purple" />,
      title: "Preventive Care",
      titleHi: "निवारक देखभाल",
      description: "Regular health checkups and preventive healthcare measures",
      descriptionHi: "नियमित स्वास्थ्य जांच और निवारक स्वास्थ्य देखभाल उपाय",
      features: ["Health screenings", "Vaccination schedules", "Early detection"],
      featuresHi: ["स्वास्थ्य जांच", "टीकाकरण कार्यक्रम", "प्रारंभिक पहचान"]
    }
  ];

  const emergencyContacts = [
    { name: "Women's Helpline", nameHi: "महिला हेल्पलाइन", number: "1091" },
    { name: "Medical Emergency", nameHi: "चिकित्सा आपातकाल", number: "102" },
    { name: "Mental Health Helpline", nameHi: "मानसिक स्वास्थ्य हेल्पलाइन", number: "9152987821" },
    { name: "Women's Health Helpline", nameHi: "महिला स्वास्थ्य हेल्पलाइन", number: "104" },
    { name: "Maternal Health Support", nameHi: "मातृ स्वास्थ्य सहायता", number: "9969002399" },
  ];

  const periodTrackingApps = [
    {
      name: "Clue",
      nameHi: "क्लू",
      description: "Science-based period and ovulation tracker",
      descriptionHi: "विज्ञान आधारित मासिक धर्म और ओव्यूलेशन ट्रैकर",
      features: ["Period prediction", "Symptom tracking", "Health insights"],
      featuresHi: ["मासिक धर्म की भविष्यवाणी", "लक्षण ट्रैकिंग", "स्वास्थ्य अंतर्दृष्टि"],
      url: "https://helloclue.com/"
    },
    {
      name: "Period Calendar",
      nameHi: "पीरियड कैलेंडर",
      description: "Simple and reliable period tracking app",
      descriptionHi: "सरल और विश्वसनीय मासिक धर्म ट्रैकिंग ऐप",
      features: ["Cycle calendar", "Fertility window", "Mood tracking"],
      featuresHi: ["चक्र कैलेंडर", "प्रजनन खिड़की", "मूड ट्रैकिंग"],
      url: "https://play.google.com/store/apps/details?id=com.popularapp.periodcalendar"
    },
    {
      name: "Flo",
      nameHi: "फ्लो",
      description: "Comprehensive women's health assistant",
      descriptionHi: "व्यापक महिला स्वास्थ्य सहायक",
      features: ["AI predictions", "Pregnancy mode", "Health articles"],
      featuresHi: ["एआई भविष्यवाणियां", "गर्भावस्था मोड", "स्वास्थ्य लेख"],
      url: "https://flo.health/"
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
              <Translated en="Health & Wellness" hi="स्वास्थ्य और कल्याण" />
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            <Translated 
              en="Comprehensive health resources and support systems designed specifically for women's wellbeing"
              hi="विशेष रूप से महिलाओं की भलाई के लिए डिज़ाइन किए गए व्यापक स्वास्थ्य संसाधन और सहायता प्रणाली"
            />
          </p>
        </div>
      </section>

      {/* Health Resources */}
      <section className="py-16 saheli-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            <Translated en="Our Health Services" hi="हमारी स्वास्थ्य सेवाएं" />
          </h2>
          <p className="text-muted-foreground">
            <Translated 
              en="Comprehensive healthcare support tailored for women at every stage of life"
              hi="जीवन के हर चरण में महिलाओं के लिए तैयार की गई व्यापक स्वास्थ्य देखभाल सहायता"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {healthResources.map((resource, index) => (
            <Card key={index} className="saheli-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {resource.icon}
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
                <ul className="space-y-2">
                  {resource.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <Zap className="h-4 w-4 text-saheli-purple" />
                      {translate(feature, resource.featuresHi[idx])}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Period Tracking Apps Section */}
      <section className="py-16 bg-muted/30">
        <div className="saheli-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Recommended Period Tracking Apps" hi="अनुशंसित मासिक धर्म ट्रैकिंग ऐप्स" />
            </h2>
            <p className="text-muted-foreground">
              <Translated 
                en="Track your menstrual cycle, predict fertile days, and monitor your reproductive health"
                hi="अपने मासिक धर्म चक्र को ट्रैक करें, उपजाऊ दिनों की भविष्यवाणी करें, और अपने प्रजनन स्वास्थ्य की निगरानी करें"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {periodTrackingApps.map((app, index) => (
              <Card key={index} className="saheli-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-8 w-8 text-saheli-purple" />
                    <div>
                      <CardTitle className="text-foreground">
                        {translate(app.name, app.nameHi)}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {translate(app.description, app.descriptionHi)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {app.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <Zap className="h-4 w-4 text-saheli-purple" />
                        {translate(feature, app.featuresHi[idx])}
                      </li>
                    ))}
                  </ul>
                    <a href={(app as any).url} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    <Translated en="Download App" hi="ऐप डाउनलोड करें" />
                      </Button>
                    </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-saheli-purple/10 to-saheli-accent/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                <Translated en="Why Track Your Menstrual Cycle?" hi="अपने मासिक धर्म चक्र को क्यों ट्रैक करें?" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Heart className="h-5 w-5 text-saheli-purple mt-1" />
                  <span>{translate("Better understanding of your body", "अपने शरीर की बेहतर समझ")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Brain className="h-5 w-5 text-saheli-purple mt-1" />
                  <span>{translate("Predict mood and energy changes", "मूड और ऊर्जा परिवर्तन की भविष्यवाणी")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Activity className="h-5 w-5 text-saheli-purple mt-1" />
                  <span>{translate("Plan exercise and nutrition", "व्यायाम और पोषण की योजना बनाएं")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-saheli-purple mt-1" />
                  <span>{translate("Early detection of irregularities", "अनियमितताओं की प्रारंभिक पहचान")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16">
        <div className="saheli-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Women's Health Helplines" hi="महिला स्वास्थ्य हेल्पलाइन" />
            </h2>
            <p className="text-muted-foreground">
              <Translated 
                en="24/7 support for women's health concerns and emergencies"
                hi="महिलाओं की स्वास्थ्य चिंताओं और आपातकालीन स्थितियों के लिए 24/7 सहायता"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Phone className="h-8 w-8 text-saheli-purple mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    {translate(contact.name, contact.nameHi)}
                  </h3>
                  <p className="text-2xl font-bold text-saheli-purple mb-4">{contact.number}</p>
                  <a href={`tel:${contact.number}`} className="block">
                    <Button className="w-full" variant="outline">
                    <Translated en="Call Now" hi="अभी कॉल करें" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                  <Translated en="When to Seek Immediate Help" hi="तत्काल सहायता कब लें" />
                </h3>
                <ul className="text-red-700 dark:text-red-400 space-y-1 text-sm">
                  <li>• {translate("Severe abdominal or pelvic pain", "गंभीर पेट या श्रोणि दर्द")}</li>
                  <li>• {translate("Heavy bleeding that soaks a pad every hour", "भारी रक्तस्राव जो हर घंटे एक पैड को भिगो देता है")}</li>
                  <li>• {translate("Signs of infection (fever, unusual discharge)", "संक्रमण के संकेत (बुखार, असामान्य स्राव)")}</li>
                  <li>• {translate("Pregnancy complications", "गर्भावस्था की जटिलताएं")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-muted/30">
        <div className="saheli-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              <Translated en="Emergency Contacts" hi="आपातकालीन संपर्क" />
            </h2>
            <p className="text-muted-foreground">
              <Translated 
                en="Important helpline numbers for immediate assistance"
                hi="तत्काल सहायता के लिए महत्वपूर्ण हेल्पलाइन नंबर"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Phone className="h-8 w-8 text-saheli-purple mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    {translate(contact.name, contact.nameHi)}
                  </h3>
                  <p className="text-2xl font-bold text-saheli-purple">{contact.number}</p>
                  <a href={`tel:${contact.number}`} className="block">
                    <Button className="mt-4 w-full" variant="outline">
                    <Translated en="Call Now" hi="अभी कॉल करें" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-saheli-deep to-saheli-purple/20">
        <div className="saheli-container text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            <Translated 
              en="Take charge of your health today"
              hi="आज ही अपने स्वास्थ्य की जिम्मेदारी लें"
            />
          </h2>
          <p className="text-muted-foreground mb-8">
            <Translated 
              en="Your health is your wealth. Start your wellness journey with us."
              hi="आपका स्वास्थ्य ही आपकी संपत्ति है। हमारे साथ अपनी कल्याण यात्रा शुरू करें।"
            />
          </p>
          <Button className="saheli-btn text-lg">
            <Translated en="Get Started" hi="शुरू करें" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HealthWellness;
