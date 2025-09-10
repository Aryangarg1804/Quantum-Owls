
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowLeft, TrendingUp, Clock, Calendar, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentSavings, setCurrentSavings] = useState(200000);
  const [monthlySavings, setMonthlySavings] = useState(15000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [inflationRate, setInflationRate] = useState(4);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [retirementData, setRetirementData] = useState<any[]>([]);

  // Format currency amounts with Indian Rupee format
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateRetirement = () => {
    // Pre-retirement phase
    const yearsToRetirement = retirementAge - currentAge;
    const returnsRateMonthly = expectedReturn / 12 / 100;
    
    let corpus = currentSavings;
    const preRetirementData: any[] = [];
    
    // Calculate growth during accumulation phase
    for (let year = 1; year <= yearsToRetirement; year++) {
      for (let month = 1; month <= 12; month++) {
        corpus = corpus * (1 + returnsRateMonthly) + monthlySavings;
      }
      
      preRetirementData.push({
        age: currentAge + year,
        corpus: corpus,
        phase: "accumulation"
      });
    }
    
    // Post-retirement phase
    const postRetirementYears = lifeExpectancy - retirementAge;
    const inflationRateMonthly = inflationRate / 12 / 100;
    
    let currentMonthlyExpenses = monthlyExpenses;
    let retirementCorpus = corpus;
    const postRetirementData: any[] = [];
    
    // Calculate drawdown during retirement phase
    for (let year = 1; year <= postRetirementYears; year++) {
      for (let month = 1; month <= 12; month++) {
        // Inflate monthly expenses
        currentMonthlyExpenses = currentMonthlyExpenses * (1 + inflationRateMonthly);
        
        // Get returns on corpus and withdraw expenses
        retirementCorpus = retirementCorpus * (1 + returnsRateMonthly) - currentMonthlyExpenses;
      }
      
      postRetirementData.push({
        age: retirementAge + year,
        corpus: Math.max(retirementCorpus, 0),
        phase: "retirement"
      });
    }
    
    // Combine data for the chart
    return [...preRetirementData, ...postRetirementData];
  };

  useEffect(() => {
    const data = calculateRetirement();
    setRetirementData(data);
  }, [currentAge, retirementAge, lifeExpectancy, currentSavings, monthlySavings, expectedReturn, inflationRate, monthlyExpenses]);

  // Calculate key retirement metrics
  const retirementCorpus = retirementData.find(item => item.age === retirementAge)?.corpus || 0;
  const hasShortfall = retirementData.some(item => item.phase === "retirement" && item.corpus <= 0);
  const shortfallAge = hasShortfall ? retirementData.find(item => item.corpus <= 0)?.age : null;
  const monthlyIncomeFromCorpus = retirementCorpus * (expectedReturn / 100 / 12);

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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Retirement Calculator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Plan your retirement and ensure financial independence in your golden years
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6 p-6 bg-card rounded-xl border border-border/50 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="calculator-label">Current Age</label>
                    <span className="text-sm font-semibold">{currentAge} years</span>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={[currentAge]}
                      min={18}
                      max={70}
                      step={1}
                      onValueChange={(value) => setCurrentAge(value[0])}
                      className="mb-2"
                    />
                    <Input
                      type="number"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      min={18}
                      max={70}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="calculator-label">Retirement Age</label>
                    <span className="text-sm font-semibold">{retirementAge} years</span>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={[retirementAge]}
                      min={Math.max(currentAge + 1, 45)}
                      max={75}
                      step={1}
                      onValueChange={(value) => setRetirementAge(value[0])}
                      className="mb-2"
                    />
                    <Input
                      type="number"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(Number(e.target.value))}
                      min={Math.max(currentAge + 1, 45)}
                      max={75}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="calculator-label">Life Expectancy</label>
                  <span className="text-sm font-semibold">{lifeExpectancy} years</span>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={[lifeExpectancy]}
                    min={Math.max(retirementAge + 1, 65)}
                    max={100}
                    step={1}
                    onValueChange={(value) => setLifeExpectancy(value[0])}
                    className="mb-2"
                  />
                  <Input
                    type="number"
                    value={lifeExpectancy}
                    onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                    min={Math.max(retirementAge + 1, 65)}
                    max={100}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="calculator-label">Current Savings</label>
                    <span className="text-sm font-semibold">{formatCurrency(currentSavings)}</span>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={[currentSavings]}
                      min={0}
                      max={10000000}
                      step={10000}
                      onValueChange={(value) => setCurrentSavings(value[0])}
                      className="mb-2"
                    />
                    <div className="flex">
                      <span className="calculator-input flex items-center justify-center px-3 rounded-l-lg rounded-r-none border-r-0 bg-secondary text-muted-foreground">₹</span>
                      <Input
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(Number(e.target.value))}
                        className="rounded-l-none"
                        min={0}
                        max={10000000}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="calculator-label">Monthly Saving</label>
                    <span className="text-sm font-semibold">{formatCurrency(monthlySavings)}</span>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={[monthlySavings]}
                      min={1000}
                      max={200000}
                      step={1000}
                      onValueChange={(value) => setMonthlySavings(value[0])}
                      className="mb-2"
                    />
                    <div className="flex">
                      <span className="calculator-input flex items-center justify-center px-3 rounded-l-lg rounded-r-none border-r-0 bg-secondary text-muted-foreground">₹</span>
                      <Input
                        type="number"
                        value={monthlySavings}
                        onChange={(e) => setMonthlySavings(Number(e.target.value))}
                        className="rounded-l-none"
                        min={1000}
                        max={200000}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="calculator-label">Investment Return (%)</label>
                    <span className="text-sm font-semibold">{expectedReturn}%</span>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={[expectedReturn]}
                      min={1}
                      max={15}
                      step={0.5}
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
                        max={15}
                        step={0.5}
                      />
                      <span className="calculator-input flex items-center justify-center px-3 rounded-r-lg rounded-l-none border-l-0 bg-secondary text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="calculator-label">Inflation Rate (%)</label>
                    <span className="text-sm font-semibold">{inflationRate}%</span>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={[inflationRate]}
                      min={1}
                      max={10}
                      step={0.5}
                      onValueChange={(value) => setInflationRate(value[0])}
                      className="mb-2"
                    />
                    <div className="flex">
                      <Input
                        type="number"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="rounded-r-none"
                        min={1}
                        max={10}
                        step={0.5}
                      />
                      <span className="calculator-input flex items-center justify-center px-3 rounded-r-lg rounded-l-none border-l-0 bg-secondary text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="calculator-label">Monthly Expenses (Today)</label>
                  <span className="text-sm font-semibold">{formatCurrency(monthlyExpenses)}</span>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={[monthlyExpenses]}
                    min={10000}
                    max={500000}
                    step={5000}
                    onValueChange={(value) => setMonthlyExpenses(value[0])}
                    className="mb-2"
                  />
                  <div className="flex">
                    <span className="calculator-input flex items-center justify-center px-3 rounded-l-lg rounded-r-none border-r-0 bg-secondary text-muted-foreground">₹</span>
                    <Input
                      type="number"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                      className="rounded-l-none"
                      min={10000}
                      max={500000}
                    />
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
                    <PiggyBank className="w-4 h-4 text-finance-total" />
                    <span className="calculator-label">Retirement Corpus</span>
                  </div>
                  <span className="calculator-value text-finance-total">{formatCurrency(retirementCorpus)}</span>
                </motion.div>

                <motion.div 
                  className="calculator-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-finance-interest" />
                    <span className="calculator-label">Monthly Income</span>
                  </div>
                  <span className="calculator-value text-finance-interest">{formatCurrency(monthlyIncomeFromCorpus)}</span>
                  <span className="text-xs text-muted-foreground">(From investment returns)</span>
                </motion.div>

                <motion.div 
                  className={`calculator-results ${hasShortfall ? 'border-destructive/20' : 'border-green-500/20'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="calculator-label">Fund Status</span>
                  </div>
                  {hasShortfall ? (
                    <>
                      <span className="calculator-value text-destructive">Shortfall at {shortfallAge}</span>
                      <span className="text-xs text-muted-foreground">Money runs out before age {shortfallAge}</span>
                    </>
                  ) : (
                    <>
                      <span className="calculator-value text-green-500">Sufficient</span>
                      <span className="text-xs text-muted-foreground">Your retirement is well funded</span>
                    </>
                  )}
                </motion.div>
              </div>

              <motion.div 
                className="calculator-results h-80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={retirementData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis 
                      dataKey="age" 
                      stroke="#666"
                      label={{ value: 'Age', position: 'insideBottomRight', offset: -10 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} 
                      stroke="#666"
                    />
                    <Tooltip 
                      formatter={(value: any) => [formatCurrency(value), "Corpus"]}
                      labelFormatter={(label) => `Age: ${label}`}
                      contentStyle={{ backgroundColor: '#1a1b1e', border: '1px solid #333', borderRadius: '8px' }}
                    />
                    <defs>
                      <linearGradient id="colorAccumulation" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRetirement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="corpus" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      fill="url(#colorAccumulation)"
                      activeDot={{ r: 5 }}
                      name="Corpus"
                      fillOpacity={1}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="corpus" 
                      stroke="#f97316" 
                      strokeWidth={2}
                      fill="url(#colorRetirement)"
                      activeDot={{ r: 5 }}
                      name="Corpus"
                      fillOpacity={1}
                      connectNulls
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div 
                className="calculator-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold mb-4">Retirement Planning Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <div className="p-1 rounded-full bg-primary/20 text-primary">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span>Start early: The power of compounding works better over longer periods.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="p-1 rounded-full bg-primary/20 text-primary">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span>Diversify investments: Spread your investments across different asset classes.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="p-1 rounded-full bg-primary/20 text-primary">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span>Increase savings: Boost your savings rate whenever possible, especially after pay raises.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="p-1 rounded-full bg-primary/20 text-primary">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span>Plan for healthcare: Healthcare costs can be substantial in retirement years.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="p-1 rounded-full bg-primary/20 text-primary">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span>Review regularly: Revisit your retirement plan annually to make necessary adjustments.</span>
                  </li>
                </ul>
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

export default RetirementCalculator;
