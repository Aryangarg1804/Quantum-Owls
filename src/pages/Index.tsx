import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import Translated from "@/components/Translated";

const Index = () => {
  const { translate, language } = useLanguage();
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const handleGetStarted = () => {
    navigate("/entrepreneurship");
  };

  const textToSpeak = translate(
    "Empowering Women Through Financial Independence. Your trusted companion for financial growth and skill development.",
    "महिलाओं को वित्तीय स्वतंत्रता के माध्यम से सशक्त बनाना। वित्तीय विकास और कौशल विकास के लिए आपका विश्वसनीय साथी।"
  );

  const toggleSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support voice playback.");
      return;
    }

    if (isSpeaking && !paused) {
      window.speechSynthesis.pause();
      setPaused(true);
    } else if (isSpeaking && paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      if (utterance) {
        window.speechSynthesis.cancel();
      }

      const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
      newUtterance.lang = language === "hi" ? "hi-IN" : "en-US";
      newUtterance.onend = () => {
        setIsSpeaking(false);
        setPaused(false);
      };

      window.speechSynthesis.speak(newUtterance);
      setUtterance(newUtterance);
      setIsSpeaking(true);
      setPaused(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/db/14/20/db142005750e89471904d48a003ef5e6.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#9b87f5,transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#6E59A5,transparent_30%)]"></div>

        <div className="saheli-container relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="animate-slide-in text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
              <Translated en="Empowering Women Through" hi="महिलाओं को सशक्त बनाना" />{" "}
              <span className="text-saheli-purple">
                <Translated en="Financial Independence" hi="वित्तीय स्वतंत्रता के माध्यम से" />
              </span>
            </h1>

            <p
              className="animate-slide-in text-lg md:text-xl text-muted-foreground mb-8"
              style={{ animationDelay: "100ms" }}
            >
              <Translated
                en="Your trusted companion for financial growth and skill development"
                hi="वित्तीय विकास और कौशल विकास के लिए आपका विश्वसनीय साथी"
              />
            </p>

            <div className="flex justify-center gap-4">
              <Button
                className="saheli-btn text-lg animate-slide-in"
                style={{ animationDelay: "200ms" }}
                onClick={handleGetStarted}
              >
                <Translated en="Get Started" hi="शुरू करें" />
              </Button>

              {/* Voice Button */}
              <Button
                className="animate-slide-in"
                style={{ animationDelay: "300ms" }}
                onClick={toggleSpeech}
                aria-label={translate("Play/Pause intro", "प्रस्तावना चलाएं/रोकें")}
              >
                {isSpeaking ? (
                  paused ? (
                    <Volume2 className="h-5 w-5" />
                  ) : (
                    <VolumeX className="h-5 w-5" />
                  )
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 saheli-container">
        <div className="text-center mb-16">
          <h2 className="saheli-section-title">
            {translate("Empowering Features", "सशक्तिकरण विशेषताएँ")}
          </h2>
          <p className="saheli-section-subtitle">
            {translate(
              "Tools and resources designed to support your journey towards financial independence",
              "वित्तीय स्वतंत्रता की ओर आपकी यात्रा का समर्थन करने के लिए डिज़ाइन किए गए उपकरण और संसाधन"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Financial Calculators",
              titleHi: "वित्तीय कैलकुलेटर",
              desc: "Easy-to-use calculators to help you make informed financial decisions and plan for your future.",
              descHi:
                "आसान-से-उपयोग कैलकुलेटर जो आपको सूचित वित्तीय निर्णय लेने और अपने भविष्य की योजना बनाने में मदद करते हैं।",
              link: "/calculators",
              linkText: "Explore calculators",
              linkTextHi: "कैलकुलेटर का अन्वेषण करें",
            },
            {
              title: "Entrepreneurship Resources",
              titleHi: "उद्यमिता संसाधन",
              desc: "Discover resources, success stories, and marketplace for women entrepreneurs to showcase products.",
              descHi:
                "महिला उद्यमियों के लिए संसाधन, सफलता की कहानियां और उत्पादों को प्रदर्शित करने के लिए बाज़ार की खोज करें।",
              link: "/entrepreneurship",
              linkText: "Explore resources",
              linkTextHi: "संसाधनों का अन्वेषण करें",
            },
            {
              title: "Government Schemes",
              titleHi: "सरकारी योजनाएं",
              desc: "Comprehensive information about government initiatives designed to support women's empowerment.",
              descHi:
                "महिलाओं के सशक्तिकरण का समर्थन करने के लिए डिज़ाइन की गई सरकारी पहलों के बारे में व्यापक जानकारी।",
              link: "/government-schemes",
              linkText: "Explore schemes",
              linkTextHi: "योजनाओं का अन्वेषण करें",
            },
          ].map((feature, index) => (
            <div
              className="saheli-card animate-scale-in"
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {translate(feature.title, feature.titleHi)}
              </h3>
              <p className="text-muted-foreground mb-4">
                {translate(feature.desc, feature.descHi)}
              </p>
              <Link
                to={feature.link}
                className="text-saheli-purple hover:underline flex items-center gap-1"
              >
                {translate(feature.linkText, feature.linkTextHi)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-saheli-deep to-saheli-purple/20">
        <div className="saheli-container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            {translate(
              "Ready to take control of your financial future?",
              "अपने वित्तीय भविष्य का नियंत्रण लेने के लिए तैयार हैं?"
            )}
          </h2>
          <Button className="saheli-btn text-lg" onClick={handleGetStarted}>
            {translate("Get Started Today", "आज ही शुरू करें")}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
