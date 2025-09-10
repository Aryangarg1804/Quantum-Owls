
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import SchemeCard from "@/components/SchemeCard";
import SchemeDetails from "@/components/SchemeDetails";
import { Shield, Award, Coins, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GovernmentSchemes = () => {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  const { translate } = useLanguage();

  // Schema data with extended information
  const schemes = [
    {
      id: "pmmy",
      icon: <Shield className="h-10 w-10" />,
      title: "Pradhan Mantri Mahila Shakti Yojana",
      titleHi: "प्रधान मंत्री महिला शक्ति योजना",
      description: "Comprehensive program for women empowerment through skill development and financial support",
      descriptionHi: "कौशल विकास और वित्तीय सहायता के माध्यम से महिला सशक्तिकरण के लिए व्यापक कार्यक्रम",
      benefits: [
        "Skill training in various sectors",
        "Financial assistance up to ₹2,00,000",
        "Business mentoring and support",
        "Access to market linkages",
        "Interest subsidy on loans"
      ],
      benefitsHi: [
        "विभिन्न क्षेत्रों में कौशल प्रशिक्षण",
        "₹2,00,000 तक वित्तीय सहायता",
        "व्यवसाय मार्गदर्शन और समर्थन",
        "बाज़ार कड़ियों तक पहुँच",
        "ऋण पर ब्याज सब्सिडी"
      ],
      eligibility: "Women aged 18-60 years with a viable business plan and basic educational qualification",
      eligibilityHi: "18-60 वर्ष की महिलाएं जिनके पास व्यवहार्य व्यवसाय योजना और मूल शैक्षिक योग्यता हो",
      documents: [
        "Aadhaar card",
        "PAN card",
        "Passport size photographs",
        "Address proof",
        "Age proof",
        "Business plan proposal"
      ],
      documentsHi: [
        "आधार कार्ड",
        "पैन कार्ड",
        "पासपोर्ट आकार के फोटो",
        "पते का प्रमाण",
        "आयु प्रमाण",
        "व्यवसाय योजना प्रस्ताव"
      ],
      applicationProcess: [
        "Register online on the official portal",
        "Fill out the application form with personal and business details",
        "Upload required documents",
        "Attend the in-person interview/verification",
        "Receive approval and disbursement of funds"
      ],
      applicationProcessHi: [
        "आधिकारिक पोर्टल पर ऑनलाइन पंजीकरण करें",
        "व्यक्तिगत और व्यवसाय विवरण के साथ आवेदन फॉर्म भरें",
        "आवश्यक दस्तावेज़ अपलोड करें",
        "साक्षात्कार/सत्यापन में भाग लें",
        "मंजूरी और धन का वितरण प्राप्त करें"
      ],
      imageUrl: "https://i.pinimg.com/736x/bf/1e/90/bf1e90076ee2ca8a264d79cfc36f3f7d.jpg",
      contactInfo: "Toll-free helpline: 1800-XXX-XXXX, Email: pmmy@gov.in, Website: www.pmmy.gov.in",
      contactInfoHi: "टोल-फ्री हेल्पलाइन: 1800-XXX-XXXX, ईमेल: pmmy@gov.in, वेबसाइट: www.pmmy.gov.in"
    },
    {
      id: "muns",
      icon: <Award className="h-10 w-10" />,
      title: "Mahila Udyam Nidhi Scheme",
      titleHi: "महिला उद्यम निधि योजना",
      description: "Financial assistance for women entrepreneurs to start or expand their business",
      descriptionHi: "महिला उद्यमियों के लिए व्यवसाय शुरू करने या बढ़ाने हेतु वित्तीय सहायता",
      benefits: [
        "Low interest loans up to ₹10,00,000",
        "Easy repayment terms of 5-10 years",
        "Business mentoring from industry experts",
        "Marketing assistance and network building",
        "Technology adoption support"
      ],
      benefitsHi: [
        "₹10,00,000 तक कम ब्याज दर पर ऋण",
        "5-10 वर्षों की आसान पुनर्भुगतान शर्तें",
        "उद्योग विशेषज्ञों से व्यवसाय मार्गदर्शन",
        "विपणन सहायता और नेटवर्क निर्माण",
        "प्रौद्योगिकी अपनाने में सहायता"
      ],
      eligibility: "Women entrepreneurs with viable business plans, both for new ventures and existing businesses looking to expand",
      eligibilityHi: "व्यवहार्य व्यवसाय योजना वाली महिला उद्यमी, नए उद्यम और विस्तार चाहने वाले मौजूदा व्यवसाय दोनों",
      documents: [
        "Identity proof (Aadhaar/Voter ID)",
        "Business registration documents",
        "Project report",
        "Collateral documents where applicable",
        "Previous business experience proof (for expansion)"
      ],
      documentsHi: [
        "पहचान प्रमाण (आधार/वोटर आईडी)",
        "व्यवसाय पंजीकरण दस्तावेज",
        "प्रोजेक्ट रिपोर्ट",
        "जहाँ लागू हो, संपार्श्विक दस्तावेज",
        "पिछले व्यवसाय अनुभव का प्रमाण (विस्तार हेतु)"
      ],
      applicationProcess: [
        "Apply through any nationalized bank or direct on MUDRA portal",
        "Submit business proposal with financial projections",
        "Document verification by the bank",
        "Site visit and business viability assessment",
        "Loan sanctioning and disbursement"
      ],
      applicationProcessHi: [
        "किसी भी राष्ट्रीयकृत बैंक के माध्यम से या सीधे मुद्रा पोर्टल पर आवेदन करें",
        "वित्तीय प्रक्षेपण के साथ व्यवसाय प्रस्ताव जमा करें",
        "बैंक द्वारा दस्तावेज़ सत्यापन",
        "साइट विजिट और व्यवसाय व्यवहार्यता आकलन",
        "ऋण स्वीकृति और वितरण"
      ],
      imageUrl: "https://i.pinimg.com/736x/da/0a/ca/da0aca7a3d5ada50f2c41bf2c239ce75.jpg",
      contactInfo: "Contact your nearest nationalized bank or visit www.mudra.org.in",
      contactInfoHi: "अपने निकटतम राष्ट्रीयकृत बैंक से संपर्क करें या www.mudra.org.in पर जाएं"
    },
    {
      id: "msy",
      icon: <Coins className="h-10 w-10" />,
      title: "Mahila Samriddhi Yojana",
      titleHi: "महिला समृद्धि योजना",
      description: "Savings and micro-credit program for women's economic empowerment",
      descriptionHi: "महिलाओं के आर्थिक सशक्तिकरण के लिए बचत और सूक्ष्म-ऋण कार्यक्रम",
      benefits: [
        "Affordable micro-loans starting from ₹10,000",
        "Financial literacy training sessions",
        "Savings incentives with higher interest rates",
        "Flexible repayment schedules",
        "No collateral for smaller loan amounts"
      ],
      benefitsHi: [
        "₹10,000 से शुरू होने वाले किफायती सूक्ष्म ऋण",
        "वित्तीय साक्षरता प्रशिक्षण सत्र",
        "उच्च ब्याज दरों के साथ बचत प्रोत्साहन",
        "लचीली पुनर्भुगतान समय-सारणी",
        "छोटे ऋण राशि के लिए कोई संपार्श्विक नहीं"
      ],
      eligibility: "All women citizens with a valid bank account and verifiable address proof",
      eligibilityHi: "सभी महिला नागरिक जिनके पास वैध बैंक खाता और सत्यापन योग्य पता प्रमाण हो",
      documents: [
        "Aadhaar card",
        "Bank account details",
        "Residential proof",
        "2 passport size photographs",
        "Income certificate (if applicable)"
      ],
      documentsHi: [
        "आधार कार्ड",
        "बैंक खाते का विवरण",
        "निवास प्रमाण",
        "2 पासपोर्ट आकार के फोटो",
        "आय प्रमाण पत्र (यदि लागू हो)"
      ],
      applicationProcess: [
        "Open a savings account under the scheme at any participating bank",
        "Maintain regular savings for a minimum of 6 months",
        "Apply for micro-credit after the initial savings period",
        "Attend financial literacy sessions",
        "Utilize the loan amount for income generation activities"
      ],
      applicationProcessHi: [
        "किसी भी सहभागी बैंक में योजना के तहत बचत खाता खोलें",
        "कम से कम 6 महीनों तक नियमित बचत बनाए रखें",
        "प्रारंभिक बचत अवधि के बाद माइक्रो-क्रेडिट के लिए आवेदन करें",
        "वित्तीय साक्षरता सत्रों में भाग लें",
        "ऋण राशि का उपयोग आय-सृजन गतिविधियों के लिए करें"
      ],
      imageUrl: "https://i.pinimg.com/736x/58/c6/d0/58c6d07e3f885c7ccb7c817f38f3f4b5.jpg",
      contactInfo: "Visit your nearest government bank or call 1800-XXX-XXXX for more information",
      contactInfoHi: "अपने निकटतम सरकारी बैंक में जाएं या अधिक जानकारी के लिए 1800-XXX-XXXX पर कॉल करें"
    },
    {
      id: "ssy",
      icon: <Trophy className="h-10 w-10" />,
      title: "Sukanya Samriddhi Yojana",
      titleHi: "सुकन्या समृद्धि योजना",
      description: "Government savings scheme for girl child education and marriage expenses",
      descriptionHi: "बालिका की शिक्षा और विवाह खर्चों के लिए सरकारी बचत योजना",
      benefits: [
        "High interest rate (currently 8.2% annually)",
        "Tax benefits under Section 80C",
        "Long-term savings account for 21 years",
        "Partial withdrawal allowed for education after 18 years",
        "Security for daughter's future needs"
      ],
      benefitsHi: [
        "उच्च ब्याज दर (वर्तमान में वार्षिक 8.2%)",
        "धारा 80C के तहत कर लाभ",
        "21 वर्षों के लिए दीर्घकालिक बचत खाता",
        "18 वर्ष बाद शिक्षा के लिए आंशिक निकासी की अनुमति",
        "बेटी की भविष्य की आवश्यकताओं के लिए सुरक्षा"
      ],
      eligibility: "Parents or legal guardians of girl child below 10 years of age",
      eligibilityHi: "10 वर्ष से कम आयु की बालिका के माता-पिता या कानूनी अभिभावक",
      documents: [
        "Birth certificate of the girl child",
        "Identity proof of parents/guardian",
        "Address proof",
        "Photograph of parent/guardian and child",
        "Initial deposit amount (minimum ₹250)"
      ],
      documentsHi: [
        "बालिका का जन्म प्रमाण पत्र",
        "माता-पिता/अभिभावक का पहचान प्रमाण",
        "पते का प्रमाण",
        "अभिभावक और बालिका की फोटो",
        "प्रारंभिक जमा राशि (न्यूनतम ₹250)"
      ],
      applicationProcess: [
        "Visit any authorized bank or post office",
        "Fill out the Sukanya Samriddhi Account application form",
        "Submit required documents and initial deposit",
        "Receive account passbook and details",
        "Make regular deposits (minimum ₹250 per year)"
      ],
      applicationProcessHi: [
        "किसी भी अधिकृत बैंक या डाकघर जाएँ",
        "सुकन्या समृद्धि खाता आवेदन पत्र भरें",
        "आवश्यक दस्तावेज़ और प्रारंभिक जमा राशि जमा करें",
        "खाता पासबुक और विवरण प्राप्त करें",
        "नियमित जमा करें (न्यूनतम ₹250 प्रति वर्ष)"
      ],
      imageUrl: "https://i.pinimg.com/736x/4f/35/37/4f3537127cd2f41097c71eed51fdcb32.jpg",
      contactInfo: "Visit any post office or authorized banks or call 1800-XXX-XXXX for more information",
      contactInfoHi: "किसी भी डाकघर या अधिकृत बैंक में जाएँ या अधिक जानकारी के लिए 1800-XXX-XXXX पर कॉल करें"
    }
  ];

  // Find the selected scheme details
  const schemeDetails = selectedScheme 
    ? schemes.find(scheme => scheme.id === selectedScheme) 
    : null;

  const handleViewDetails = (id: string) => {
    setSelectedScheme(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedScheme(null);
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        title={translate('Government Schemes','सरकारी योजनाएं')}
        subtitle={translate(
          "Explore government initiatives designed to support women's empowerment",
          'महिला सशक्तिकरण के लिए बनाई गई सरकारी पहल का अन्वेषण करें'
        )}
        className="bg-gradient-to-r from-saheli-purple/20 to-transparent"
      />
      
      <section className="py-12 saheli-container">
    {selectedScheme && schemeDetails ? (
          <SchemeDetails
      title={schemeDetails.title}
      titleHi={schemeDetails.titleHi}
      description={schemeDetails.description}
      descriptionHi={schemeDetails.descriptionHi}
      benefits={schemeDetails.benefits}
      benefitsHi={schemeDetails.benefitsHi}
      eligibility={schemeDetails.eligibility}
      eligibilityHi={schemeDetails.eligibilityHi}
      documents={schemeDetails.documents}
      documentsHi={schemeDetails.documentsHi}
      applicationProcess={schemeDetails.applicationProcess}
      applicationProcessHi={schemeDetails.applicationProcessHi}
            imageUrl={schemeDetails.imageUrl}
      contactInfo={schemeDetails.contactInfo}
      contactInfoHi={schemeDetails.contactInfoHi}
            onBack={handleBack}
          />
        ) : (
          <div className="space-y-8">
            <div className="animate-fade-in">
              <h2 className="saheli-section-title text-center mb-2">{translate('Available Schemes','उपलब्ध योजनाएं')}</h2>
              <p className="saheli-section-subtitle text-center">
                {translate(
                  "Discover financial assistance and support programs designed for women's growth and independence",
                  'महिलाओं की वृद्धि और स्वतंत्रता के लिए बनाई गई वित्तीय सहायता और समर्थन कार्यक्रम खोजें'
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {schemes.map((scheme, index) => (
                <SchemeCard
                  key={scheme.id}
                  icon={scheme.icon}
          title={scheme.title}
          titleHi={scheme.titleHi}
          description={scheme.description}
          descriptionHi={scheme.descriptionHi}
          benefits={scheme.benefits.slice(0, 3)}
          benefitsHi={scheme.benefitsHi?.slice(0,3)}
          eligibility={scheme.eligibility}
          eligibilityHi={scheme.eligibilityHi}
                  className={`animate-delay-${index * 100}`}
                  onViewDetails={() => handleViewDetails(scheme.id)}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default GovernmentSchemes;
