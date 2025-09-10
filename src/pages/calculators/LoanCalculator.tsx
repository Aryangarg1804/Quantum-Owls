
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowLeft, DollarSign, Calendar, Percent, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip as RechartTooltip, ResponsiveContainer, Legend } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // Format currency amounts with Indian Rupee format
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateLoan = () => {
    // Convert annual interest rate to monthly and decimal form
    const monthlyInterestRate = interestRate / 12 / 100;
    
    // Convert loan tenure from years to months
    const tenureInMonths = loanTenure * 12;
    
    // Calculate EMI using the formula: [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = loanAmount * monthlyInterestRate * 
      Math.pow(1 + monthlyInterestRate, tenureInMonths) / 
      (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);
    
    // Calculate total payment over the entire loan tenure
    const totalPayment = emi * tenureInMonths;
    
    // Calculate total interest payable
    const totalInterest = totalPayment - loanAmount;
    
    return {
      emi,
      totalInterest,
      totalPayment
    };
  };

  useEffect(() => {
    const { emi, totalInterest, totalPayment } = calculateLoan();
    setEmi(emi);
    setTotalInterest(totalInterest);
    setTotalPayment(totalPayment);
  }, [loanAmount, interestRate, loanTenure]);

  const pieData = [
    { name: "Principal", value: loanAmount, color: "#8b5cf6" },
    { name: "Interest", value: totalInterest, color: "#ef4444" }
  ];

  const COLORS = ['#8b5cf6', '#ef4444'];

  const formatTooltip = (value: any, name: any) => {
    if (name === "Principal" || name === "Interest") {
      return [formatCurrency(value), name];
    }
    return [value, name];
  };

  // Generate year-wise amortization schedule
  const generateAmortizationSchedule = () => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const tenureInMonths = loanTenure * 12;
    
    let remainingPrincipal = loanAmount;
    let schedule = [];
    
    for (let year = 1; year <= loanTenure; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      for (let month = 1; month <= 12; month++) {
        if ((year - 1) * 12 + month <= tenureInMonths) {
          const interestForMonth = remainingPrincipal * monthlyInterestRate;
          const principalForMonth = emi - interestForMonth;
          
          yearlyPrincipal += principalForMonth;
          yearlyInterest += interestForMonth;
          remainingPrincipal -= principalForMonth;
        }
      }
      
      schedule.push({
        year,
        principalPaid: yearlyPrincipal,
        interestPaid: yearlyInterest,
        balance: remainingPrincipal > 0 ? remainingPrincipal : 0
      });
    }
    
    return schedule;
  };

  const amortizationSchedule = generateAmortizationSchedule();

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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Loan EMI Calculator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate your monthly loan repayments and understand the total cost of your loan
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
                  <label className="calculator-label">Loan Amount</label>
                  <span className="text-sm font-semibold">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="space-y-4">
                  <Slider
                    value={[loanAmount]}
                    min={100000}
                    max={10000000}
                    step={10000}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    className="mb-2"
                  />
                  <div className="flex">
                    <span className="calculator-input flex items-center justify-center px-3 rounded-l-lg rounded-r-none border-r-0 bg-secondary text-muted-foreground">₹</span>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="rounded-l-none"
                      min={100000}
                      max={10000000}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="calculator-label">Interest Rate (%)</label>
                  <span className="text-sm font-semibold">{interestRate}%</span>
                </div>
                <div className="space-y-4">
                  <Slider
                    value={[interestRate]}
                    min={1}
                    max={20}
                    step={0.1}
                    onValueChange={(value) => setInterestRate(value[0])}
                    className="mb-2"
                  />
                  <div className="flex">
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="rounded-r-none"
                      min={1}
                      max={20}
                      step={0.1}
                    />
                    <span className="calculator-input flex items-center justify-center px-3 rounded-r-lg rounded-l-none border-l-0 bg-secondary text-muted-foreground">%</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="calculator-label">Loan Tenure (Years)</label>
                  <span className="text-sm font-semibold">{loanTenure} years</span>
                </div>
                <div className="space-y-4">
                  <Slider
                    value={[loanTenure]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => setLoanTenure(value[0])}
                    className="mb-2"
                  />
                  <div className="flex">
                    <Input
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
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
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span className="calculator-label">Monthly EMI</span>
                  </div>
                  <span className="calculator-value text-primary">{formatCurrency(emi)}</span>
                </motion.div>

                <motion.div 
                  className="calculator-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Percent className="w-4 h-4 text-finance-interest" />
                    <span className="calculator-label">Total Interest</span>
                  </div>
                  <span className="calculator-value text-finance-interest">{formatCurrency(totalInterest)}</span>
                </motion.div>

                <motion.div 
                  className="calculator-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-finance-total" />
                    <span className="calculator-label">Total Amount</span>
                  </div>
                  <span className="calculator-value text-finance-total">{formatCurrency(totalPayment)}</span>
                </motion.div>
              </div>

              <motion.div 
                className="calculator-results h-80 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-4">Payment Breakdown</h3>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36} />
                      <RechartTooltip formatter={formatTooltip} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div 
                className="calculator-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold mb-4">Year-wise Amortization Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-3 px-4 text-left text-muted-foreground">Year</th>
                        <th className="py-3 px-4 text-right text-muted-foreground">Principal Paid</th>
                        <th className="py-3 px-4 text-right text-muted-foreground">Interest Paid</th>
                        <th className="py-3 px-4 text-right text-muted-foreground">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.map((row) => (
                        <tr key={row.year} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="py-3 px-4 text-left">{row.year}</td>
                          <td className="py-3 px-4 text-right text-finance-investment">{formatCurrency(row.principalPaid)}</td>
                          <td className="py-3 px-4 text-right text-finance-interest">{formatCurrency(row.interestPaid)}</td>
                          <td className="py-3 px-4 text-right">{formatCurrency(row.balance)}</td>
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

export default LoanCalculator;
