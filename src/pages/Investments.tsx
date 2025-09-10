
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeroSection from "@/components/HeroSection";

const Investments = () => {
  const [formData, setFormData] = useState({
    mutualFunds: "",
    stocks: "",
    fixedDeposits: "",
    gold: "",
    realEstate: "",
    years: "10"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Calculate projected returns for chart
  const calculateReturns = () => {
    const years = Number(formData.years) || 10;
    const monthlyInvestment = 
      (Number(formData.mutualFunds) || 0) + 
      (Number(formData.stocks) || 0) + 
      (Number(formData.fixedDeposits) || 0) + 
      (Number(formData.gold) || 0) + 
      (Number(formData.realEstate) || 0);
    
    if (monthlyInvestment <= 0) return [];
    
    // Assume different annual returns for calculation
    const mutualFundReturn = 0.12; // 12% annual return
    const stockReturn = 0.15; // 15% annual return
    const fdReturn = 0.07; // 7% annual return
    const goldReturn = 0.08; // 8% annual return
    const realEstateReturn = 0.10; // 10% annual return
    
    const data = [];
    let total = 0;
    
    for (let i = 0; i <= years; i++) {
      const mutualFundValue = calculateCompoundInterest(Number(formData.mutualFunds) || 0, mutualFundReturn, i);
      const stockValue = calculateCompoundInterest(Number(formData.stocks) || 0, stockReturn, i);
      const fdValue = calculateCompoundInterest(Number(formData.fixedDeposits) || 0, fdReturn, i);
      const goldValue = calculateCompoundInterest(Number(formData.gold) || 0, goldReturn, i);
      const realEstateValue = calculateCompoundInterest(Number(formData.realEstate) || 0, realEstateReturn, i);
      
      total = mutualFundValue + stockValue + fdValue + goldValue + realEstateValue;
      
      data.push({
        name: i === 0 ? 'Start' : `${i}y`,
        value: Math.round(total)
      });
    }
    
    return data;
  };
  
  const calculateCompoundInterest = (monthlyInvestment: number, annualRate: number, years: number) => {
    if (years === 0) return 0;
    const monthlyRate = annualRate / 12;
    const months = years * 12;
    return monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  };
  
  const chartData = calculateReturns();
  const hasData = chartData.length > 0 && chartData[chartData.length - 1].value > 0;
  
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Investment Planner"
        subtitle="Plan your investments and visualize potential returns"
      />
      
      <section className="py-12 saheli-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="saheli-card">
            <h3 className="text-xl font-semibold mb-6">Investment Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 mb-2">Monthly Mutual Funds (₹)</label>
                <Input 
                  type="number" 
                  name="mutualFunds"
                  value={formData.mutualFunds}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Monthly Stocks (₹)</label>
                <Input 
                  type="number" 
                  name="stocks"
                  value={formData.stocks}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Monthly Fixed Deposits (₹)</label>
                <Input 
                  type="number" 
                  name="fixedDeposits"
                  value={formData.fixedDeposits}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Monthly Gold Investment (₹)</label>
                <Input 
                  type="number" 
                  name="gold"
                  value={formData.gold}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Monthly Real Estate (₹)</label>
                <Input 
                  type="number" 
                  name="realEstate"
                  value={formData.realEstate}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Investment Period (Years)</label>
                <Input 
                  type="number" 
                  name="years"
                  value={formData.years}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter years"
                  min="1"
                  max="30"
                />
              </div>
              
              <Button className="saheli-btn w-full mt-4">Calculate Returns</Button>
            </div>
          </div>
          
          <div className="saheli-card">
            <h3 className="text-xl font-semibold mb-6">Projected Returns</h3>
            
            {hasData ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#999" />
                    <YAxis 
                      stroke="#999" 
                      tickFormatter={(value) => `₹${value/1000}k`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${value}`, 'Portfolio Value']}
                      labelFormatter={(label) => `Year: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8B5CF6" 
                      activeDot={{ r: 8 }} 
                      dot={{ r: 4 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <p className="text-white/50 text-center">
                  Enter your investment details on the left to see projected returns
                </p>
              </div>
            )}
            
            {hasData && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Monthly Investment:</span>
                  <span className="text-white font-semibold">
                    ₹{
                      (Number(formData.mutualFunds) || 0) + 
                      (Number(formData.stocks) || 0) + 
                      (Number(formData.fixedDeposits) || 0) + 
                      (Number(formData.gold) || 0) + 
                      (Number(formData.realEstate) || 0)
                    }
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white/70">Total Invested (over {formData.years} years):</span>
                  <span className="text-white font-semibold">
                    ₹{(
                      ((Number(formData.mutualFunds) || 0) + 
                      (Number(formData.stocks) || 0) + 
                      (Number(formData.fixedDeposits) || 0) + 
                      (Number(formData.gold) || 0) + 
                      (Number(formData.realEstate) || 0)) * 12 * Number(formData.years)
                    ).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white/70">Projected Value:</span>
                  <span className="text-green-500 font-semibold">
                    ₹{chartData[chartData.length - 1].value.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white/70">Projected Growth:</span>
                  <span className="text-green-500 font-semibold">
                    {Math.round(
                      (chartData[chartData.length - 1].value / 
                      ((Number(formData.mutualFunds) || 0) + 
                       (Number(formData.stocks) || 0) + 
                       (Number(formData.fixedDeposits) || 0) + 
                       (Number(formData.gold) || 0) + 
                       (Number(formData.realEstate) || 0)) / 12 / Number(formData.years) - 1) * 100
                    )}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investments;
