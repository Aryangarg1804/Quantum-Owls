
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const PPFCalculator = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  
  const [formData, setFormData] = useState({
    initialInvestment: 500,
    monthlyContribution: 1000,
    tenure: 15,
  });
  
  const [results, setResults] = useState({
    totalInvestment: 0,
    maturityAmount: 0,
    interestEarned: 0,
    yearlyData: [] as any[]
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numericValue = parseInt(value);
    
    // Apply min/max constraints
    if (name === 'initialInvestment') {
      numericValue = Math.max(500, Math.min(numericValue, 150000));
    } else if (name === 'monthlyContribution') {
      numericValue = Math.max(500, Math.min(numericValue, 12500));
    } else if (name === 'tenure') {
      numericValue = Math.max(15, Math.min(numericValue, 50));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(numericValue) ? '' : numericValue
    }));
  };
  
  const calculatePPF = () => {
    const { initialInvestment, monthlyContribution, tenure } = formData;
    const interestRate = 0.071; // 7.1% per annum
    
    let yearlyData = [];
    let totalAmount = initialInvestment;
    let totalInvestment = initialInvestment;
    let yearlyContribution = monthlyContribution * 12;
    
    for (let year = 1; year <= tenure; year++) {
      // Add yearly contribution
      totalAmount += yearlyContribution;
      totalInvestment += yearlyContribution;
      
      // Calculate interest for the year
      const interestForYear = totalAmount * interestRate;
      
      // Add interest to total
      totalAmount += interestForYear;
      
      yearlyData.push({
        year,
        investment: Math.round(totalInvestment),
        interest: Math.round(totalAmount - totalInvestment),
        balance: Math.round(totalAmount)
      });
    }
    
    setResults({
      totalInvestment,
      maturityAmount: totalAmount,
      interestEarned: totalAmount - totalInvestment,
      yearlyData
    });
  };
  
  // Calculate on mount and when form data changes
  useEffect(() => {
    calculatePPF();
  }, [formData]);
  
  return (
    <div className="min-h-screen py-12">
      <div className="saheli-container">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/calculators')}
            className="flex items-center gap-2 text-saheli-purple hover:text-saheli-purple/80"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{translate("Back to Calculators", "कैलकुलेटर पर वापस जाएं")}</span>
          </Button>
        </div>
        
        <h1 className="saheli-title mb-8 flex items-center gap-2">
          <Calculator className="h-8 w-8" />
          <span>{translate("PPF Calculator", "पीपीएफ कैलकुलेटर")}</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="saheli-card">
              <h3 className="text-xl font-semibold mb-6">{translate("Enter Details", "विवरण दर्ज करें")}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 mb-2">
                    {translate("Initial Investment (₹)", "प्रारंभिक निवेश (₹)")}
                  </label>
                  <Input 
                    type="number" 
                    name="initialInvestment"
                    value={formData.initialInvestment}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    min="500"
                    max="150000"
                  />
                  <p className="text-xs text-white/50 mt-1">
                    {translate("Min: ₹500, Max: ₹1,50,000", "न्यूनतम: ₹500, अधिकतम: ₹1,50,000")}
                  </p>
                </div>
                
                <div>
                  <label className="block text-white/70 mb-2">
                    {translate("Monthly Contribution (₹)", "मासिक योगदान (₹)")}
                  </label>
                  <Input 
                    type="number" 
                    name="monthlyContribution"
                    value={formData.monthlyContribution}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    min="500"
                    max="12500"
                  />
                  <p className="text-xs text-white/50 mt-1">
                    {translate("Min: ₹500, Max: ₹12,500 per month", "न्यूनतम: ₹500, अधिकतम: ₹12,500 प्रति माह")}
                  </p>
                </div>
                
                <div>
                  <label className="block text-white/70 mb-2">
                    {translate("Tenure (Years)", "अवधि (वर्ष)")}
                  </label>
                  <Input 
                    type="number" 
                    name="tenure"
                    value={formData.tenure}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    min="15"
                    max="50"
                  />
                  <p className="text-xs text-white/50 mt-1">
                    {translate("Min: 15 years, Max: 50 years", "न्यूनतम: 15 वर्ष, अधिकतम: 50 वर्ष")}
                  </p>
                </div>
                
                <div className="pt-4">
                  <p className="text-white/70 mb-2">
                    {translate("Interest Rate", "ब्याज दर")}
                  </p>
                  <p className="text-saheli-purple font-semibold text-xl">7.1% p.a.</p>
                  <p className="text-xs text-white/50 mt-1">
                    {translate(
                      "Current PPF interest rate (updated quarterly)", 
                      "वर्तमान पीपीएफ ब्याज दर (त्रैमासिक अपडेट)"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="saheli-card mb-6">
              <h3 className="text-xl font-semibold mb-6">{translate("PPF Results", "पीपीएफ परिणाम")}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white/70 mb-1">{translate("Total Investment", "कुल निवेश")}</p>
                  <p className="text-xl font-semibold">₹{results.totalInvestment.toLocaleString()}</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white/70 mb-1">{translate("Interest Earned", "अर्जित ब्याज")}</p>
                  <p className="text-xl font-semibold text-green-500">₹{results.interestEarned.toLocaleString()}</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white/70 mb-1">{translate("Maturity Amount", "परिपक्वता राशि")}</p>
                  <p className="text-xl font-semibold text-saheli-purple">₹{results.maturityAmount.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={results.yearlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#999"
                      label={{ 
                        value: translate("Years", "वर्ष"), 
                        position: 'insideBottomRight', 
                        offset: -10,
                        fill: '#999' 
                      }}
                    />
                    <YAxis 
                      stroke="#999" 
                      tickFormatter={(value) => `₹${value/1000}k`}
                      label={{ 
                        value: translate("Amount (₹)", "राशि (₹)"), 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: '#999' 
                      }}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']}
                      labelFormatter={(label) => `${translate("Year", "वर्ष")}: ${label}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="investment" 
                      name={translate("Investment", "निवेश")} 
                      stroke="#8B5CF6" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="interest" 
                      name={translate("Interest", "ब्याज")} 
                      stroke="#10B981" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      name={translate("Total", "कुल")} 
                      stroke="#F97316" 
                      activeDot={{ r: 8 }}
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="saheli-card">
              <h3 className="text-xl font-semibold mb-6">{translate("Yearly Breakdown", "वार्षिक विश्लेषण")}</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">{translate("Year", "वर्ष")}</th>
                      <th className="text-right py-3 px-4">{translate("Investment", "निवेश")}</th>
                      <th className="text-right py-3 px-4">{translate("Interest", "ब्याज")}</th>
                      <th className="text-right py-3 px-4">{translate("Balance", "शेष राशि")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlyData.map((data, index) => (
                      <tr key={index} className="border-b border-white/10">
                        <td className="py-3 px-4">{data.year}</td>
                        <td className="py-3 px-4 text-right">₹{data.investment.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-green-500">₹{data.interest.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-medium">₹{data.balance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPFCalculator;
