import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Calculator, 
  Baby,
  InfoIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const SukanyaSamriddhiCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState<number>(5000);
  const [annualDeposit, setAnnualDeposit] = useState<number>(60000);
  const [childAge, setChildAge] = useState<number>(2);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [chartData, setChartData] = useState<any[]>([]);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  const calculateSukanyaSamriddhi = () => {
    const depositYears = Math.min(21 - childAge, 15); // Deposits allowed until 15 years from opening
    const maturityYear = 21;
    const termYears = maturityYear - childAge;
    
    let totalDeposited = initialDeposit;
    let balance = initialDeposit;
    const data = [];
    
    for (let year = 1; year <= termYears; year++) {
      if (year <= depositYears) {
        totalDeposited += annualDeposit;
        balance += annualDeposit;
      }
      
      const interestEarned = balance * (interestRate / 100);
      balance += interestEarned;
      
      data.push({
        year: year,
        age: childAge + year,
        investment: totalDeposited,
        interest: balance - totalDeposited,
        balance: balance
      });
    }
    
    setChartData(data);
    setMaturityAmount(balance);
    setTotalInvestment(totalDeposited);
    setTotalInterest(balance - totalDeposited);
  };

  useEffect(() => {
    calculateSukanyaSamriddhi();
  }, [initialDeposit, annualDeposit, childAge, interestRate]);

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  return (
    <div className="calculator-container">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center">
          <Baby className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-2xl font-bold">Sukanya Samriddhi Yojana Calculator</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="p-6 bg-card border border-border/50">
          <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <Label htmlFor="childAge" className="calculator-label">
                  Child's Age (years)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Scheme is available for girls under 10 years of age</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="childAge"
                type="number"
                className="calculator-input"
                value={childAge}
                onChange={(e) => setChildAge(Number(e.target.value))}
                min={0}
                max={10}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="initialDeposit" className="calculator-label">
                  Initial Deposit (₹)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Minimum ₹250 and Maximum ₹1.5 Lakh per year</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="initialDeposit"
                type="number"
                className="calculator-input"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                min={250}
                max={150000}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="annualDeposit" className="calculator-label">
                  Annual Deposit (₹)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Deposits continue for 15 years</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="annualDeposit"
                type="number"
                className="calculator-input"
                value={annualDeposit}
                onChange={(e) => setAnnualDeposit(Number(e.target.value))}
                min={250}
                max={150000}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="interestRate" className="calculator-label">
                  Interest Rate (%)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Current interest rate is 8.2% (changes quarterly)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                className="calculator-input"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={0}
                max={15}
              />
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={calculateSukanyaSamriddhi}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate
            </Button>
          </div>
        </Card>
        
        <Card className="lg:col-span-2 p-6 bg-card border border-border/50">
          <h2 className="text-xl font-semibold mb-6">Sukanya Samriddhi Growth</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <motion.div 
              className="calculator-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="calculator-label">Maturity Amount</span>
              <span className="calculator-value text-finance-total">
                {formatter.format(maturityAmount)}
              </span>
            </motion.div>
            
            <motion.div 
              className="calculator-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="calculator-label">Total Investment</span>
              <span className="calculator-value text-finance-investment">
                {formatter.format(totalInvestment)}
              </span>
            </motion.div>
            
            <motion.div 
              className="calculator-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <span className="calculator-label">Interest Earned</span>
              <span className="calculator-value text-finance-interest">
                {formatter.format(totalInterest)}
              </span>
            </motion.div>
          </div>
          
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis 
                  dataKey="age" 
                  label={{ value: 'Age (years)', position: 'insideBottom', offset: -10 }} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => 
                    new Intl.NumberFormat('en-IN', {
                      notation: 'compact',
                      compactDisplay: 'short',
                      maximumFractionDigits: 1
                    }).format(Number(value))
                  }
                  tick={{ fontSize: 12 }}
                />
                <RechartsTooltip 
                  formatter={(value: any) => formatter.format(Number(value))}
                  labelFormatter={(label) => `Age: ${label} years`}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="investment" 
                  stackId="1" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf680" 
                  name="Investment" 
                />
                <Area 
                  type="monotone" 
                  dataKey="interest" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="#10b98180" 
                  name="Interest" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SukanyaSamriddhiCalculator;
