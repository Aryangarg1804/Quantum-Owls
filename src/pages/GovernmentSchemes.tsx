
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import SchemeCard from "@/components/SchemeCard";
import SchemeDetails from "@/components/SchemeDetails";
import { Shield, Award, Coins, Trophy } from "lucide-react";

const GovernmentSchemes = () => {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);

  // Schema data with extended information
  const schemes = [
    {
      id: "pmmy",
      icon: <Shield className="h-10 w-10" />,
      title: "Pradhan Mantri Mahila Shakti Yojana",
      description: "Comprehensive program for women empowerment through skill development and financial support",
      benefits: [
        "Skill training in various sectors",
        "Financial assistance up to ₹2,00,000",
        "Business mentoring and support",
        "Access to market linkages",
        "Interest subsidy on loans"
      ],
      eligibility: "Women aged 18-60 years with a viable business plan and basic educational qualification",
      documents: [
        "Aadhaar card",
        "PAN card",
        "Passport size photographs",
        "Address proof",
        "Age proof",
        "Business plan proposal"
      ],
      applicationProcess: [
        "Register online on the official portal",
        "Fill out the application form with personal and business details",
        "Upload required documents",
        "Attend the in-person interview/verification",
        "Receive approval and disbursement of funds"
      ],
      imageUrl: "https://i.pinimg.com/736x/bf/1e/90/bf1e90076ee2ca8a264d79cfc36f3f7d.jpg",
      contactInfo: "Toll-free helpline: 1800-XXX-XXXX, Email: pmmy@gov.in, Website: www.pmmy.gov.in"
    },
    {
      id: "muns",
      icon: <Award className="h-10 w-10" />,
      title: "Mahila Udyam Nidhi Scheme",
      description: "Financial assistance for women entrepreneurs to start or expand their business",
      benefits: [
        "Low interest loans up to ₹10,00,000",
        "Easy repayment terms of 5-10 years",
        "Business mentoring from industry experts",
        "Marketing assistance and network building",
        "Technology adoption support"
      ],
      eligibility: "Women entrepreneurs with viable business plans, both for new ventures and existing businesses looking to expand",
      documents: [
        "Identity proof (Aadhaar/Voter ID)",
        "Business registration documents",
        "Project report",
        "Collateral documents where applicable",
        "Previous business experience proof (for expansion)"
      ],
      applicationProcess: [
        "Apply through any nationalized bank or direct on MUDRA portal",
        "Submit business proposal with financial projections",
        "Document verification by the bank",
        "Site visit and business viability assessment",
        "Loan sanctioning and disbursement"
      ],
      imageUrl: "https://i.pinimg.com/736x/da/0a/ca/da0aca7a3d5ada50f2c41bf2c239ce75.jpg",
      contactInfo: "Contact your nearest nationalized bank or visit www.mudra.org.in"
    },
    {
      id: "msy",
      icon: <Coins className="h-10 w-10" />,
      title: "Mahila Samriddhi Yojana",
      description: "Savings and micro-credit program for women's economic empowerment",
      benefits: [
        "Affordable micro-loans starting from ₹10,000",
        "Financial literacy training sessions",
        "Savings incentives with higher interest rates",
        "Flexible repayment schedules",
        "No collateral for smaller loan amounts"
      ],
      eligibility: "All women citizens with a valid bank account and verifiable address proof",
      documents: [
        "Aadhaar card",
        "Bank account details",
        "Residential proof",
        "2 passport size photographs",
        "Income certificate (if applicable)"
      ],
      applicationProcess: [
        "Open a savings account under the scheme at any participating bank",
        "Maintain regular savings for a minimum of 6 months",
        "Apply for micro-credit after the initial savings period",
        "Attend financial literacy sessions",
        "Utilize the loan amount for income generation activities"
      ],
      imageUrl: "https://i.pinimg.com/736x/58/c6/d0/58c6d07e3f885c7ccb7c817f38f3f4b5.jpg",
      contactInfo: "Visit your nearest government bank or call 1800-XXX-XXXX for more information"
    },
    {
      id: "ssy",
      icon: <Trophy className="h-10 w-10" />,
      title: "Sukanya Samriddhi Yojana",
      description: "Government savings scheme for girl child education and marriage expenses",
      benefits: [
        "High interest rate (currently 8.2% annually)",
        "Tax benefits under Section 80C",
        "Long-term savings account for 21 years",
        "Partial withdrawal allowed for education after 18 years",
        "Security for daughter's future needs"
      ],
      eligibility: "Parents or legal guardians of girl child below 10 years of age",
      documents: [
        "Birth certificate of the girl child",
        "Identity proof of parents/guardian",
        "Address proof",
        "Photograph of parent/guardian and child",
        "Initial deposit amount (minimum ₹250)"
      ],
      applicationProcess: [
        "Visit any authorized bank or post office",
        "Fill out the Sukanya Samriddhi Account application form",
        "Submit required documents and initial deposit",
        "Receive account passbook and details",
        "Make regular deposits (minimum ₹250 per year)"
      ],
      imageUrl: "https://i.pinimg.com/736x/4f/35/37/4f3537127cd2f41097c71eed51fdcb32.jpg",
      contactInfo: "Visit any post office or authorized banks or call 1800-XXX-XXXX for more information"
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
        title="Government Schemes"
        subtitle="Explore government initiatives designed to support women's empowerment"
        className="bg-gradient-to-r from-saheli-purple/20 to-transparent"
      />
      
      <section className="py-12 saheli-container">
        {selectedScheme && schemeDetails ? (
          <SchemeDetails
            title={schemeDetails.title}
            description={schemeDetails.description}
            benefits={schemeDetails.benefits}
            eligibility={schemeDetails.eligibility}
            documents={schemeDetails.documents}
            applicationProcess={schemeDetails.applicationProcess}
            imageUrl={schemeDetails.imageUrl}
            contactInfo={schemeDetails.contactInfo}
            onBack={handleBack}
          />
        ) : (
          <div className="space-y-8">
            <div className="animate-fade-in">
              <h2 className="saheli-section-title text-center mb-2">Available Schemes</h2>
              <p className="saheli-section-subtitle text-center">
                Discover financial assistance and support programs designed for women's growth and independence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {schemes.map((scheme, index) => (
                <SchemeCard
                  key={scheme.id}
                  icon={scheme.icon}
                  title={scheme.title}
                  description={scheme.description}
                  benefits={scheme.benefits.slice(0, 3)}
                  eligibility={scheme.eligibility}
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
