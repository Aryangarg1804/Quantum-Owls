import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Calculator, 
  GraduationCap,
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

const ChildEducationCalculator = () => {
  const [childAge, setChildAge] = useState<number>(5);
  const [educationStartAge, setEducationStartAge] = useState<number>(18);
  const [currentEducationCost, setCurrentEducationCost] = useState<number>(500000);
  const [educationPeriod, setEducationPeriod] = useState<number>(4);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [chartData, setChartData] = useState<any[]>([]);
  const [futureEducationCost, setFutureEducationCost] = useState<number>(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);

  const calculateEducationFund = () => {
    const yearsToEducation = educationStartAge - childAge;
    
    // Calculate future education cost with inflation
    const yearlyInflationFactor = 1 + (inflationRate / 100);
    const inflatedYearlyCost = currentEducationCost * Math.pow(yearlyInflationFactor, yearsToEducation);
    const totalEducationCost = inflatedYearlyCost * educationPeriod;
    
    // Calculate required monthly investment
    const monthlyRate = expectedReturn / 100 / 12;
    const months = yearsToEducation * 12;
    
    // Future value of monthly investment (PMT formula)
    // PMT = FV * r / ((1 + r)^n - 1)
    const requiredMonthlyInvestment = totalEducationCost * monthlyRate / 
                                     ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate));
    
    // Generate chart data
    const data = [];
    let investment = 0;
    let corpus = 0;
    
    for (let year = 0; year <= yearsToEducation; year++) {
      if (year > 0) {
        const annualInvestment = requiredMonthlyInvestment * 12;
        investment += annualInvestment;
        corpus = corpus * (1 + expectedReturn / 100) + annualInvestment;
      }
      
      data.push({
        year: year,
        age: childAge + year,
        investment: investment,
        returns: corpus - investment,
        total: corpus
      });
    }
    
    setChartData(data);
    setFutureEducationCost(totalEducationCost);
    setMonthlyInvestment(requiredMonthlyInvestment);
    setTotalInvestment(investment);
    setTotalReturns(corpus - investment);
  };

  useEffect(() => {
    calculateEducationFund();
  }, [childAge, educationStartAge, currentEducationCost, educationPeriod, inflationRate, expectedReturn]);

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
          <GraduationCap className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-2xl font-bold">Child Education Calculator</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="p-6 bg-card border border-border/50">
          <h2 className="text-xl font-semibold mb-4">Education Planning</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <Label htmlFor="childAge" className="calculator-label">
                  Current Age of Child (years)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Child's present age</p>
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
                max={17}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="educationStartAge" className="calculator-label">
                  Age when Education Starts
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Higher education typically starts at 18</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="educationStartAge"
                type="number"
                className="calculator-input"
                value={educationStartAge}
                onChange={(e) => setEducationStartAge(Number(e.target.value))}
                min={childAge + 1}
                max={25}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="currentEducationCost" className="calculator-label">
                  Current Annual Education Cost (₹)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Estimate of education's yearly cost today</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="currentEducationCost"
                type="number"
                className="calculator-input"
                value={currentEducationCost}
                onChange={(e) => setCurrentEducationCost(Number(e.target.value))}
                min={10000}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="educationPeriod" className="calculator-label">
                  Education Duration (years)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Typical undergraduate degree is 3-4 years</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="educationPeriod"
                type="number"
                className="calculator-input"
                value={educationPeriod}
                onChange={(e) => setEducationPeriod(Number(e.target.value))}
                min={1}
                max={10}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="inflationRate" className="calculator-label">
                  Education Inflation Rate (%)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Education costs typically inflate at 6-10% per year</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="inflationRate"
                type="number"
                step="0.1"
                className="calculator-input"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                min={1}
                max={15}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="expectedReturn" className="calculator-label">
                  Expected Investment Return (%)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Long-term equity returns typically range from 10-14%</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="expectedReturn"
                type="number"
                step="0.1"
                className="calculator-input"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                min={1}
                max={30}
              />
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={calculateEducationFund}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate
            </Button>
          </div>
        </Card>
        
        <Card className="lg:col-span-2 p-6 bg-card border border-border/50">
          <h2 className="text-xl font-semibold mb-6">Education Fund Projection</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <motion.div 
              className="calculator-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="calculator-label">Future Education Cost</span>
              <span className="calculator-value text-finance-total">
                {formatter.format(futureEducationCost)}
              </span>
            </motion.div>
            
            <motion.div 
              className="calculator-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="calculator-label">Required Monthly Investment</span>
              <span className="calculator-value text-primary">
                {formatter.format(monthlyInvestment)}
              </span>
            </motion.div>
            
            <motion.div 
              className="calculator-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
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
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <span className="calculator-label">Total Returns</span>
              <span className="calculator-value text-finance-interest">
                {formatter.format(totalReturns)}
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
                  label={{ value: 'Child Age (years)', position: 'insideBottom', offset: -10 }} 
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
                  dataKey="returns" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="#10b98180" 
                  name="Returns" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChildEducationCalculator;
