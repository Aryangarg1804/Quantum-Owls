
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowLeft, TrendingUp, DollarSign, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [calculationData, setCalculationData] = useState<any[]>([]);

  // Format currency amounts with Indian Rupee format
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    
    const calculationData = [];
    
    for (let year = 1; year <= timePeriod; year++) {
      const yearMonths = year * 12;
      const investedAmount = monthlyInvestment * yearMonths;
      const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      const wealthGained = futureValue - investedAmount;
      
      calculationData.push({
        year,
        investedAmount,
        wealthGained,
        futureValue,
      });
    }
    
    return calculationData;
  };

  useEffect(() => {
    const data = calculateSIP();
    setCalculationData(data);
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const totalInvestment = calculationData[calculationData.length - 1]?.investedAmount || 0;
  const estimatedReturns = calculationData[calculationData.length - 1]?.wealthGained || 0;
  const totalValue = calculationData[calculationData.length - 1]?.futureValue || 0;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-8 border-b border-border/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">FinanceCalc</h1>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="calculator-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">SIP Calculator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate how your monthly investments can grow over time with the power of compounding
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-8 p-6 bg-card rounded-xl border border-border/50 shadow-lg"
            >
              <div>
                <div className="flex justify-between mb-2">
                  <label className="calculator-label">Monthly Investment</label>
                  <span className="text-sm font-semibold">{formatCurrency(monthlyInvestment)}</span>
                </div>
                <div className="space-y-4">
                  <Slider
                    value={[monthlyInvestment]}
                    min={500}
                    max={100000}
                    step={500}
                    onValueChange={(value) => setMonthlyInvestment(value[0])}
                    className="mb-2"
                  />
                  <div className="flex">
                    <span className="calculator-input flex items-center justify-center px-3 rounded-l-lg rounded-r-none border-r-0 bg-secondary text-muted-foreground">₹</span>
                    <Input
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      className="rounded-l-none"
                      min={500}
                      max={100000}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="calculator-label">Expected Annual Return (%)</label>
                  <span className="text-sm font-semibold">{expectedReturn}%</span>
                </div>
                <div className="space-y-4">
                  <Slider
                    value={[expectedReturn]}
                    min={1}
                    max={30}
                    step={0.1}
                    onValueChange={(value) => setExpectedReturn(value[0])}
                    className="mb-2"
                  />
                  <div className="flex">
                    <Input
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="rounded-r-none"
                      min={1}
                      max={30}
                      step={0.1}
                    />
                    <span className="calculator-input flex items-center justify-center px-3 rounded-r-lg rounded-l-none border-l-0 bg-secondary text-muted-foreground">%</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="calculator-label">Time Period (Years)</label>
                  <span className="text-sm font-semibold">{timePeriod} years</span>
                </div>
                <div className="space-y-4">
                  <Slider
                    value={[timePeriod]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => setTimePeriod(value[0])}
                    className="mb-2"
                  />
                  <div className="flex">
                    <Input
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="rounded-r-none"
                      min={1}
                      max={30}
                    />
                    <span className="calculator-input flex items-center justify-center px-3 rounded-r-lg rounded-l-none border-l-0 bg-secondary text-muted-foreground">Yrs</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3 space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div 
                  className="calculator-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-finance-investment" />
                    <span className="calculator-label">Invested Amount</span>
                  </div>
                  <span className="calculator-value text-finance-investment">{formatCurrency(totalInvestment)}</span>
                </motion.div>

                <motion.div 
                  className="calculator-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-finance-interest" />
                    <span className="calculator-label">Estimated Returns</span>
                  </div>
                  <span className="calculator-value text-finance-interest">{formatCurrency(estimatedReturns)}</span>
                </motion.div>

                <motion.div 
                  className="calculator-results border-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <LineChart className="w-4 h-4 text-finance-total" />
                    <span className="calculator-label">Total Value</span>
                  </div>
                  <span className="calculator-value text-finance-total">{formatCurrency(totalValue)}</span>
                </motion.div>
              </div>

              <motion.div 
                className="calculator-results h-80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart
                    data={calculationData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis 
                      dataKey="year" 
                      label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} 
                      stroke="#666"
                    />
                    <YAxis 
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} 
                      stroke="#666"
                    />
                    <Tooltip 
                      formatter={(value: any) => [formatCurrency(value), ""]}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{ backgroundColor: '#1a1b1e', border: '1px solid #333', borderRadius: '8px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="investedAmount" 
                      name="Investment" 
                      stroke="#8b5cf6" 
                      strokeWidth={2} 
                      dot={{ r: 3 }} 
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="wealthGained" 
                      name="Returns" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      dot={{ r: 3 }} 
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="futureValue" 
                      name="Total" 
                      stroke="#f97316" 
                      strokeWidth={2} 
                      dot={{ r: 3 }} 
                      activeDot={{ r: 5 }}
                    />
                  </ReLineChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div 
                className="calculator-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold mb-4">Yearly Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-3 px-4 text-left text-muted-foreground">Year</th>
                        <th className="py-3 px-4 text-right text-muted-foreground">Invested Amount</th>
                        <th className="py-3 px-4 text-right text-muted-foreground">Wealth Gained</th>
                        <th className="py-3 px-4 text-right text-muted-foreground">Future Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculationData.map((row) => (
                        <tr key={row.year} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="py-3 px-4 text-left">{row.year}</td>
                          <td className="py-3 px-4 text-right text-finance-investment">{formatCurrency(row.investedAmount)}</td>
                          <td className="py-3 px-4 text-right text-finance-interest">{formatCurrency(row.wealthGained)}</td>
                          <td className="py-3 px-4 text-right text-finance-total">{formatCurrency(row.futureValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-8 border-t border-border/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
          FinanceCalc — Calculate with confidence
        </div>
      </footer>
    </div>
  );
};

export default SipCalculator;
