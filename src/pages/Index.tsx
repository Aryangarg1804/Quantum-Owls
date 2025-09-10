
// import { ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import HeroSection from "@/components/HeroSection";
// import { useLanguage } from "@/contexts/LanguageContext";

// const Index = () => {
//   const { translate } = useLanguage();
//   const navigate = useNavigate();
  
//   const handleGetStarted = () => {
//     navigate('/entrepreneurship');
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative py-20 md:py-32 overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#9b87f5,transparent_40%)]"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#6E59A5,transparent_30%)]"></div>
        
//         <div className="saheli-container relative z-10">
//           <div className="max-w-2xl">
//             <h1 className="animate-slide-in text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
//               {translate(
//                 "Empowering Women Through ",
//                 "महिलाओं को सशक्त बनाना "
//               )}
//               <span className="text-saheli-purple">
//                 {translate("Financial Independence", "वित्तीय स्वतंत्रता के माध्यम से")}
//               </span>
//             </h1>
            
//             <p className="animate-slide-in text-lg md:text-xl text-white/70 mb-8" style={{ animationDelay: '100ms' }}>
//               {translate(
//                 "Your trusted companion for financial growth and skill development",
//                 "वित्तीय विकास और कौशल विकास के लिए आपका विश्वसनीय साथी"
//               )}
//             </p>
            
//             <Button 
//               className="saheli-btn text-lg animate-slide-in" 
//               style={{ animationDelay: '200ms' }}
//               onClick={handleGetStarted}
//             >
//               {translate("Get Started", "शुरू करें")}
//             </Button>
//           </div>
//         </div>
//       </section>
      
//       {/* Features Section */}
//       <section className="py-16 saheli-container">
//         <div className="text-center mb-16">
//           <h2 className="saheli-section-title">
//             {translate("Empowering Features", "सशक्तिकरण विशेषताएँ")}
//           </h2>
//           <p className="saheli-section-subtitle">
//             {translate(
//               "Tools and resources designed to support your journey towards financial independence",
//               "वित्तीय स्वतंत्रता की ओर आपकी यात्रा का समर्थन करने के लिए डिज़ाइन किए गए उपकरण और संसाधन"
//             )}
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="saheli-card animate-scale-in">
//             <div className="h-16 w-16 bg-saheli-purple/20 rounded-full flex items-center justify-center mb-6">
//               <svg className="h-8 w-8 text-saheli-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
            
//             <h3 className="text-xl font-bold mb-3">
//               {translate("Financial Calculators", "वित्तीय कैलकुलेटर")}
//             </h3>
//             <p className="text-white/70 mb-4">
//               {translate(
//                 "Easy-to-use calculators to help you make informed financial decisions and plan for your future.",
//                 "आसान-से-उपयोग कैलकुलेटर जो आपको सूचित वित्तीय निर्णय लेने और अपने भविष्य की योजना बनाने में मदद करते हैं।"
//               )}
//             </p>
            
//             <Link to="/calculators" className="text-saheli-purple hover:underline flex items-center gap-1">
//               {translate("Explore calculators", "कैलकुलेटर का अन्वेषण करें")} <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
          
//           <div className="saheli-card animate-scale-in" style={{ animationDelay: '100ms' }}>
//             <div className="h-16 w-16 bg-saheli-purple/20 rounded-full flex items-center justify-center mb-6">
//               <svg className="h-8 w-8 text-saheli-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
            
//             <h3 className="text-xl font-bold mb-3">
//               {translate("Entrepreneurship Resources", "उद्यमिता संसाधन")}
//             </h3>
//             <p className="text-white/70 mb-4">
//               {translate(
//                 "Discover resources, success stories, and marketplace for women entrepreneurs to showcase products.",
//                 "महिला उद्यमियों के लिए संसाधन, सफलता की कहानियां और उत्पादों को प्रदर्शित करने के लिए बाज़ार की खोज करें।"
//               )}
//             </p>
            
//             <Link to="/entrepreneurship" className="text-saheli-purple hover:underline flex items-center gap-1">
//               {translate("Explore resources", "संसाधनों का अन्वेषण करें")} <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
          
//           <div className="saheli-card animate-scale-in" style={{ animationDelay: '200ms' }}>
//             <div className="h-16 w-16 bg-saheli-purple/20 rounded-full flex items-center justify-center mb-6">
//               <svg className="h-8 w-8 text-saheli-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//             </div>
            
//             <h3 className="text-xl font-bold mb-3">
//               {translate("Government Schemes", "सरकारी योजनाएं")}
//             </h3>
//             <p className="text-white/70 mb-4">
//               {translate(
//                 "Comprehensive information about government initiatives designed to support women's empowerment.",
//                 "महिलाओं के सशक्तिकरण का समर्थन करने के लिए डिज़ाइन की गई सरकारी पहलों के बारे में व्यापक जानकारी।"
//               )}
//             </p>
            
//             <Link to="/government-schemes" className="text-saheli-purple hover:underline flex items-center gap-1">
//               {translate("Explore schemes", "योजनाओं का अन्वेषण करें")} <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//         </div>
//       </section>
      
//       {/* Call to Action */}
//       <section className="py-16 bg-gradient-to-r from-saheli-deep to-saheli-purple/20">
//         <div className="saheli-container">
//           <div className="text-center max-w-2xl mx-auto">
//             <h2 className="text-3xl font-bold mb-4">
//               {translate(
//                 "Ready to take control of your financial future?",
//                 "अपने वित्तीय भविष्य का नियंत्रण लेने के लिए तैयार हैं?"
//               )}
//             </h2>
//             <p className="text-white/70 mb-8">
//               {translate(
//                 "Join thousands of women who are using Saheli to achieve financial independence and empowerment.",
//                 "हजारों महिलाओं के साथ जुड़ें जो वित्तीय स्वतंत्रता और सशक्तिकरण प्राप्त करने के लिए साहेली का उपयोग कर रही हैं।"
//               )}
//             </p>
//             <Button 
//               className="saheli-btn text-lg"
//               onClick={handleGetStarted}
//             >
//               {translate("Get Started Today", "आज ही शुरू करें")}
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Index;

import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const Index = () => {
  const { translate, language } = useLanguage();
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  const handleGetStarted = () => {
    navigate("/entrepreneurship");
  };

  // Text content for speech synthesis
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
            <h1 className="animate-slide-in text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              {translate("Empowering Women Through ", "महिलाओं को सशक्त बनाना ")}
              <span className="text-saheli-purple">
                {translate("Financial Independence", "वित्तीय स्वतंत्रता के माध्यम से")}
              </span>
            </h1>

            <p
              className="animate-slide-in text-lg md:text-xl text-white/90 mb-8"
              style={{ animationDelay: "100ms" }}
            >
              {translate(
                "Your trusted companion for financial growth and skill development",
                "वित्तीय विकास और कौशल विकास के लिए आपका विश्वसनीय साथी"
              )}
            </p>

            <div className="flex justify-center gap-4">
              <Button
                className="saheli-btn text-lg animate-slide-in"
                style={{ animationDelay: "200ms" }}
                onClick={handleGetStarted}
              >
                {translate("Get Started", "शुरू करें")}
              </Button>

              {/* Voice Button */}
              <Button className="animate-slide-in" style={{ animationDelay: "300ms" }} onClick={toggleSpeech}>
                {isSpeaking ? (paused ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />) : <Volume2 className="h-5 w-5" />}
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
          {/* Feature Cards */}
          {[
            {
              title: "Financial Calculators",
              titleHi: "वित्तीय कैलकुलेटर",
              desc: "Easy-to-use calculators to help you make informed financial decisions and plan for your future.",
              descHi: "आसान-से-उपयोग कैलकुलेटर जो आपको सूचित वित्तीय निर्णय लेने और अपने भविष्य की योजना बनाने में मदद करते हैं।",
              link: "/calculators",
              linkText: "Explore calculators",
              linkTextHi: "कैलकुलेटर का अन्वेषण करें",
            },
            {
              title: "Entrepreneurship Resources",
              titleHi: "उद्यमिता संसाधन",
              desc: "Discover resources, success stories, and marketplace for women entrepreneurs to showcase products.",
              descHi: "महिला उद्यमियों के लिए संसाधन, सफलता की कहानियां और उत्पादों को प्रदर्शित करने के लिए बाज़ार की खोज करें।",
              link: "/entrepreneurship",
              linkText: "Explore resources",
              linkTextHi: "संसाधनों का अन्वेषण करें",
            },
            {
              title: "Government Schemes",
              titleHi: "सरकारी योजनाएं",
              desc: "Comprehensive information about government initiatives designed to support women's empowerment.",
              descHi: "महिलाओं के सशक्तिकरण का समर्थन करने के लिए डिज़ाइन की गई सरकारी पहलों के बारे में व्यापक जानकारी।",
              link: "/government-schemes",
              linkText: "Explore schemes",
              linkTextHi: "योजनाओं का अन्वेषण करें",
            },
          ].map((feature, index) => (
            <div className="saheli-card animate-scale-in" key={index} style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="text-xl font-bold mb-3">
                {translate(feature.title, feature.titleHi)}
              </h3>
              <p className="text-white/70 mb-4">
                {translate(feature.desc, feature.descHi)}
              </p>
              <Link to={feature.link} className="text-saheli-purple hover:underline flex items-center gap-1">
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
          <h2 className="text-3xl font-bold mb-4 text-white">
            {translate("Ready to take control of your financial future?", "अपने वित्तीय भविष्य का नियंत्रण लेने के लिए तैयार हैं?")}
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
