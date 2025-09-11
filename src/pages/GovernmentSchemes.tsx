
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import SchemeCard from "@/components/SchemeCard";
import SchemeDetails from "@/components/SchemeDetails";
import { Shield, Award, Coins, Trophy, Search, Filter, Users, TrendingUp, Heart, BookOpen, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Translated from "@/components/Translated";

const GovernmentSchemes = () => {
  const { language, translate } = useLanguage();
  const { toast } = useToast();
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Categories for filtering
  const categories = [
    { value: "all", label: "All Schemes", labelHi: "सभी योजनाएं" },
    { value: "business", label: "Business & Entrepreneurship", labelHi: "व्यवसाय और उद्यमिता" },
    { value: "education", label: "Education & Child Welfare", labelHi: "शिक्षा और बाल कल्याण" },
    { value: "financial", label: "Financial Support", labelHi: "वित्तीय सहायता" },
    { value: "health", label: "Health & Wellness", labelHi: "स्वास्थ्य और कल्याण" }
  ];

  // Schema data with extended information
  const schemes = [
    {
      id: "pmmy",
      category: "business",
      icon: <Shield className="h-10 w-10" />,
      title: "Pradhan Mantri Mahila Shakti Yojana",
      titleHi: "प्रधान मंत्री महिला शक्ति योजना",
      description: "Comprehensive program for women empowerment through skill development and financial support",
      descriptionHi: "कौशल विकास और वित्तीय सहायता के माध्यम से महिला सशक्तिकरण के लिए व्यापक कार्यक्रम",
      maxAmount: "₹2,00,000",
      targetGroup: "Women entrepreneurs",
      targetGroupHi: "महिला उद्यमी",
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
      category: "business",
      icon: <Award className="h-10 w-10" />,
      title: "Mahila Udyam Nidhi Scheme",
      titleHi: "महिला उद्यम निधि योजना",
      description: "Financial assistance for women entrepreneurs to start or expand their business",
      descriptionHi: "महिला उद्यमियों के लिए व्यवसाय शुरू करने या बढ़ाने हेतु वित्तीय सहायता",
      maxAmount: "₹10,00,000",
      targetGroup: "Women entrepreneurs",
      targetGroupHi: "महिला उद्यमी",
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
      category: "financial",
      icon: <Coins className="h-10 w-10" />,
      title: "Mahila Samriddhi Yojana",
      titleHi: "महिला समृद्धि योजना",
      description: "Savings and micro-credit program for women's economic empowerment",
      descriptionHi: "महिलाओं के आर्थिक सशक्तिकरण के लिए बचत और सूक्ष्म-ऋण कार्यक्रम",
      maxAmount: "₹50,000",
      targetGroup: "All women",
      targetGroupHi: "सभी महिलाएं",
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
      category: "education",
      icon: <Trophy className="h-10 w-10" />,
      title: "Sukanya Samriddhi Yojana",
      titleHi: "सुकन्या समृद्धि योजना",
      description: "Government savings scheme for girl child education and marriage expenses",
      descriptionHi: "बालिका की शिक्षा और विवाह खर्चों के लिए सरकारी बचत योजना",
      maxAmount: "₹1,50,000/year",
      targetGroup: "Parents with girl child",
      targetGroupHi: "बालिका के माता-पिता",
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
    },
    {
      id: "jsy",
      category: "health",
      icon: <Heart className="h-10 w-10" />,
      title: "Janani Suraksha Yojana",
      titleHi: "जननी सुरक्षा योजना",
      description: "Maternal health support scheme providing financial assistance for safe delivery",
      descriptionHi: "सुरक्षित प्रसव के लिए वित्तीय सहायता प्रदान करने वाली मातृ स्वास्थ्य सहायता योजना",
      maxAmount: "₹1,400",
      targetGroup: "Pregnant women",
      targetGroupHi: "गर्भवती महिलाएं",
      benefits: [
        "Financial assistance for institutional delivery",
        "Free antenatal and postnatal care",
        "Cash incentives for ASHA workers",
        "Transportation support",
        "Emergency obstetric care"
      ],
      benefitsHi: [
        "संस्थागत प्रसव के लिए वित्तीय सहायता",
        "मुफ्त प्रसवपूर्व और प्रसवोत्तर देखभाल",
        "आशा कार्यकर्ताओं के लिए नकद प्रोत्साहन",
        "परिवहन सहायता",
        "आपातकालीन प्रसूति देखभाल"
      ],
      eligibility: "All pregnant women belonging to BPL families and pregnant women above 19 years of age",
      eligibilityHi: "बीपीएल परिवारों की सभी गर्भवती महिलाएं और 19 वर्ष से अधिक आयु की गर्भवती महिलाएं",
      documents: [
        "BPL card or income certificate",
        "Mother and Child Protection card",
        "Aadhaar card",
        "Bank account details",
        "Pregnancy certificate"
      ],
      documentsHi: [
        "बीपीएल कार्ड या आय प्रमाण पत्र",
        "मातृ एवं शिशु सुरक्षा कार्ड",
        "आधार कार्ड",
        "बैंक खाते का विवरण",
        "गर्भावस्था प्रमाण पत्र"
      ],
      applicationProcess: [
        "Register with ASHA worker during pregnancy",
        "Get enrolled at nearest health center",
        "Attend regular antenatal checkups",
        "Deliver at registered government facility",
        "Receive financial assistance after delivery"
      ],
      applicationProcessHi: [
        "गर्भावस्था के दौरान आशा कार्यकर्ता के साथ पंजीकरण कराएं",
        "निकटतम स्वास्थ्य केंद्र में नामांकन कराएं",
        "नियमित प्रसवपूर्व जांच में भाग लें",
        "पंजीकृत सरकारी सुविधा में प्रसव कराएं",
        "प्रसव के बाद वित्तीय सहायता प्राप्त करें"
      ],
      imageUrl: "https://i.pinimg.com/736x/e4/d3/32/e4d332f45c7b7a6e4e3c8f9b2a1d7e6f.jpg",
      contactInfo: "Contact your nearest ASHA worker or health center or call 104 for more information",
      contactInfoHi: "अपने निकटतम आशा कार्यकर्ता या स्वास्थ्य केंद्र से संपर्क करें या अधिक जानकारी के लिए 104 पर कॉल करें"
    },
    {
      id: "bbb",
      category: "education",
      icon: <BookOpen className="h-10 w-10" />,
      title: "Beti Bachao Beti Padhao",
      titleHi: "बेटी बचाओ बेटी पढ़ाओ",
      description: "Initiative to improve child sex ratio and promote education of girl children",
      descriptionHi: "बालिका लिंगानुपात में सुधार और बालिकाओं की शिक्षा को बढ़ावा देने की पहल",
      maxAmount: "Varies by component",
      targetGroup: "Girl children & families",
      targetGroupHi: "बालिकाएं और परिवार",
      benefits: [
        "Educational scholarships for girls",
        "Awareness campaigns on gender equality",
        "Support for girls' education infrastructure",
        "Skill development programs",
        "Health and nutrition support"
      ],
      benefitsHi: [
        "लड़कियों के लिए शैक्षिक छात्रवृत्ति",
        "लैंगिक समानता पर जागरूकता अभियान",
        "लड़कियों की शिक्षा के बुनियादी ढांचे के लिए सहायता",
        "कौशल विकास कार्यक्रम",
        "स्वास्थ्य और पोषण सहायता"
      ],
      eligibility: "All girl children and their families, with special focus on districts with adverse child sex ratio",
      eligibilityHi: "सभी बालिकाएं और उनके परिवार, विशेष रूप से प्रतिकूल बाल लिंगानुपात वाले जिलों पर ध्यान",
      documents: [
        "Birth certificate of girl child",
        "School enrollment certificate",
        "Aadhaar card",
        "Family income proof",
        "Residence proof"
      ],
      documentsHi: [
        "बालिका का जन्म प्रमाण पत्र",
        "स्कूल नामांकन प्रमाण पत्र",
        "आधार कार्ड",
        "पारिवारिक आय प्रमाण",
        "निवास प्रमाण"
      ],
      applicationProcess: [
        "Contact local education department",
        "Apply through school or district education office",
        "Submit required documents",
        "Participate in awareness programs",
        "Avail benefits as per scheme guidelines"
      ],
      applicationProcessHi: [
        "स्थानीय शिक्षा विभाग से संपर्क करें",
        "स्कूल या जिला शिक्षा कार्यालय के माध्यम से आवेदन करें",
        "आवश्यक दस्तावेज़ जमा करें",
        "जागरूकता कार्यक्रमों में भाग लें",
        "योजना दिशानिर्देशों के अनुसार लाभ उठाएं"
      ],
      imageUrl: "https://i.pinimg.com/736x/c2/4a/8b/c24a8b9f5e2d1a7c6b3f8e9d0a5c4b7e.jpg",
      contactInfo: "Contact your district education office or visit www.wcd.nic.in for more information",
      contactInfoHi: "अपने जिला शिक्षा कार्यालय से संपर्क करें या अधिक जानकारी के लिए www.wcd.nic.in पर जाएं"
    },
    {
      id: "mahila-shakti-kendra",
      icon: <Trophy className="h-8 w-8" />,
      title: "Mahila Shakti Kendra",
      titleHi: "महिला शक्ति केंद्र",
      description: "Convergence platform for empowering rural women through skill development and employment",
      descriptionHi: "कौशल विकास और रोजगार के माध्यम से ग्रामीण महिलाओं को सशक्त बनाने के लिए अभिसरण मंच",
      category: "business",
      maxAmount: "Varies by program",
      targetGroup: "Rural women (14-50 years)",
      targetGroupHi: "ग्रामीण महिलाएं (14-50 वर्ष)",
      benefits: [
        "Skill development training programs",
        "Employment opportunities",
        "Digital literacy programs",
        "Health and nutrition awareness",
        "Legal awareness and support",
        "Community participation in development"
      ],
      benefitsHi: [
        "कौशल विकास प्रशिक्षण कार्यक्रम",
        "रोजगार के अवसर",
        "डिजिटल साक्षरता कार्यक्रम",
        "स्वास्थ्य और पोषण जागरूकता",
        "कानूनी जागरूकता और समर्थन",
        "विकास में सामुदायिक भागीदारी"
      ],
      eligibility: "Rural women aged 14-50 years with willingness to participate in community development",
      eligibilityHi: "14-50 वर्ष की आयु की ग्रामीण महिलाएं जो सामुदायिक विकास में भाग लेने को इच्छुक हैं",
      documents: [
        "Identity proof (Aadhaar/Voter ID)",
        "Address proof",
        "Age proof",
        "Income certificate (if applicable)",
        "Passport size photographs"
      ],
      documentsHi: [
        "पहचान प्रमाण (आधार/वोटर आईडी)",
        "पता प्रमाण",
        "आयु प्रमाण",
        "आय प्रमाण पत्र (यदि लागू हो)",
        "पासपोर्ट साइज़ फोटो"
      ],
      applicationProcess: [
        "Contact nearest Mahila Shakti Kendra",
        "Register for desired training program",
        "Submit required documents",
        "Attend orientation session",
        "Participate in training modules",
        "Complete assessment and certification"
      ],
      applicationProcessHi: [
        "निकटतम महिला शक्ति केंद्र से संपर्क करें",
        "वांछित प्रशिक्षण कार्यक्रम के लिए पंजीकरण करें",
        "आवश्यक दस्तावेज जमा करें",
        "अभिविन्यास सत्र में भाग लें",
        "प्रशिक्षण मॉड्यूल में भाग लें",
        "मूल्यांकन और प्रमाणन पूरा करें"
      ],
      imageUrl: "/lovable-uploads/f7ad498b-82d4-48b0-9e4a-cefcb01c09d6.png",
      contactInfo: "Ministry of Women and Child Development, Helpline: 1800-121-3333, Email: mahilashakti@gov.in",
      contactInfoHi: "महिला एवं बाल विकास मंत्रालय, हेल्पलाइन: 1800-121-3333, ईमेल: mahilashakti@gov.in"
    },
    {
      id: "pradhan-mantri-matru-vandana",
      icon: <Heart className="h-8 w-8" />,
      title: "Pradhan Mantri Matru Vandana Yojana",
      titleHi: "प्रधानमंत्री मातृ वंदना योजना",
      description: "Maternity benefit program providing financial assistance to pregnant and lactating mothers",
      descriptionHi: "गर्भवती और स्तनपान कराने वाली माताओं को वित्तीय सहायता प्रदान करने वाला मातृत्व लाभ कार्यक्रम",
      category: "health",
      maxAmount: "₹5,000",
      targetGroup: "Pregnant and lactating mothers",
      targetGroupHi: "गर्भवती और स्तनपान कराने वाली माताएं",
      benefits: [
        "Financial assistance of ₹5,000 in three installments",
        "Compensation for wage loss during pregnancy",
        "Improved nutrition for mother and child",
        "Better maternal and child health outcomes",
        "Reduced infant and maternal mortality"
      ],
      benefitsHi: [
        "तीन किस्तों में ₹5,000 की वित्तीय सहायता",
        "गर्भावस्था के दौरान मजदूरी हानि के लिए मुआवजा",
        "माता और बच्चे के लिए बेहतर पोषण",
        "बेहतर मातृ एवं शिशु स्वास्थ्य परिणाम",
        "कम शिशु और मातृ मृत्यु दर"
      ],
      eligibility: "Pregnant and lactating mothers (19 years and above) for first living child only",
      eligibilityHi: "गर्भवती और स्तनपान कराने वाली माताएं (19 वर्ष और अधिक) केवल पहले जीवित बच्चे के लिए",
      documents: [
        "Identity proof (Aadhaar card)",
        "Bank account details",
        "Pregnancy registration card",
        "Delivery certificate",
        "Mother and Child Protection (MCP) card"
      ],
      documentsHi: [
        "पहचान प्रमाण (आधार कार्ड)",
        "बैंक खाता विवरण",
        "गर्भावस्था पंजीकरण कार्ड",
        "प्रसव प्रमाण पत्र",
        "मातृ एवं शिशु सुरक्षा (एमसीपी) कार्ड"
      ],
      applicationProcess: [
        "Register pregnancy at nearest Anganwadi center",
        "Fill application form",
        "Submit required documents",
        "Complete immunization schedule",
        "Attend health and nutrition counseling",
        "Receive payments in three installments"
      ],
      applicationProcessHi: [
        "निकटतम आंगनवाड़ी केंद्र में गर्भावस्था पंजीकरण कराएं",
        "आवेदन फॉर्म भरें",
        "आवश्यक दस्तावेज जमा करें",
        "टीकाकरण कार्यक्रम पूरा करें",
        "स्वास्थ्य और पोषण परामर्श में भाग लें",
        "तीन किस्तों में भुगतान प्राप्त करें"
      ],
      imageUrl: "/lovable-uploads/3b1154fc-a9e5-4df6-9312-7784e0521bd9.png",
      contactInfo: "Nearest Anganwadi center, District Collector office, Helpline: 104, Website: www.pmmvy.nic.in",
      contactInfoHi: "निकटतम आंगनवाड़ी केंद्र, जिला कलेक्टर कार्यालय, हेल्पलाइन: 104, वेबसाइट: www.pmmvy.nic.in"
    }
  ];

  // Filter schemes based on search term and category
  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = searchTerm === "" || 
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.titleHi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.descriptionHi.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Find the selected scheme details
  const schemeDetails = selectedScheme 
    ? schemes.find(scheme => scheme.id === selectedScheme) 
    : null;

  // Statistics data
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Beneficiaries Reached",
      titleHi: "लाभार्थी पहुंचे",
      value: "2.5M+",
      description: "Women empowered",
      descriptionHi: "महिलाएं सशक्त"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Financial Support",
      titleHi: "वित्तीय सहायता",
      value: "₹15,000Cr",
      description: "Disbursed annually",
      descriptionHi: "वार्षिक वितरित"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Success Rate",
      titleHi: "सफलता दर",
      value: "85%",
      description: "Application approval",
      descriptionHi: "आवेदन अनुमोदन"
    }
  ];

  const handleViewDetails = (id: string) => {
    setSelectedScheme(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedScheme(null);
  };

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
        ? `Government Schemes for Women. Discover and access government schemes for women. From financial assistance to skill development programs. We have ${filteredSchemes.length} schemes available for you.`
        : `महिलाओं के लिए सरकारी योजनाएं। महिलाओं के लिए सरकारी योजनाओं का खोजें और उनका लाभ उठाएं। आर्थिक सहायता से लेकर कौशल विकास तक। हमारे पास आपके लिए ${filteredSchemes.length} योजनाएं उपलब्ध हैं।`;
      
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
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 py-16">
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
                    : "border-pink-500 text-pink-500 hover:bg-pink-500/10"
                }`}
                title={translate("Read page aloud", "पेज को जोर से पढ़ें")}
              >
                {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {translate("Government Schemes", "सरकारी योजनाएं")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {translate(
                "Discover and access government schemes for women. From financial assistance to skill development programs.",
                "महिलाओं के लिए सरकारी योजनाओं का खोजें और उनका लाभ उठाएं। आर्थिक सहायता से लेकर कौशल विकास तक।"
              )}
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={translate("Search schemes...", "योजना खोजें...")}
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
                  <SelectItem value="all">{translate("All Schemes", "सभी योजनाएं")}</SelectItem>
                  <SelectItem value="financial">{translate("Financial Support", "वित्तीय सहायता")}</SelectItem>
                  <SelectItem value="health">{translate("Health", "स्वास्थ्य")}</SelectItem>
                  <SelectItem value="education">{translate("Education", "शिक्षा")}</SelectItem>
                  <SelectItem value="business">{translate("Business", "व्यवसाय")}</SelectItem>
                  <SelectItem value="housing">{translate("Housing", "आवास")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
                  <div className="flex justify-center mb-2 text-pink-600 dark:text-pink-400">
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

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
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
            <>
              {filteredSchemes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    {translate("No schemes found", "कोई योजना नहीं मिली")}
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
                      {translate("Available Schemes", "उपलब्ध योजनाएं")}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {filteredSchemes.length} {translate("schemes found", "योजनाएं मिलीं")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSchemes.map((scheme, index) => (
                      <SchemeCard
                        key={scheme.id}
                        icon={scheme.icon}
                        title={scheme.title}
                        titleHi={scheme.titleHi}
                        description={scheme.description}
                        descriptionHi={scheme.descriptionHi}
                        benefits={scheme.benefits.slice(0, 3)}
                        benefitsHi={scheme.benefitsHi?.slice(0, 3)}
                        eligibility={scheme.eligibility}
                        eligibilityHi={scheme.eligibilityHi}
                        category={scheme.category}
                        maxAmount={scheme.maxAmount}
                        targetGroup={scheme.targetGroup}
                        targetGroupHi={scheme.targetGroupHi}
                        className={`animate-delay-${index * 100}`}
                        onViewDetails={() => handleViewDetails(scheme.id)}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default GovernmentSchemes;
