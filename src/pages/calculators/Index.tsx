
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, Coins, CreditCard, PiggyBank, Baby, GraduationCap } from "lucide-react";

const Index = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  const calculators = [
    {
      title: "SIP Calculator",
      description: "Calculate your wealth with systematic investment plans",
      icon: <Coins className="w-6 h-6" />,
      path: "/sip-calculator",
      color: "from-blue-500/20 to-violet-500/20",
      borderColor: "border-violet-500/20",
    },
    {
      title: "Loan EMI Calculator",
      description: "Plan your loan repayments with precision",
      icon: <CreditCard className="w-6 h-6" />,
      path: "/loan-calculator",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/20",
    },
    {
      title: "Retirement Calculator",
      description: "Secure your future with retirement planning",
      icon: <PiggyBank className="w-6 h-6" />,
      path: "/retirement-calculator",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/20",
    },
    {
      title: "Sukanya Samriddhi Calculator",
      description: "Plan for your daughter's future with this government scheme",
      icon: <Baby className="w-6 h-6" />,
      path: "/sukanya-samriddhi-calculator",
      color: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500/20",
    },
    {
      title: "Child Education Calculator",
      description: "Prepare for your child's education expenses",
      icon: <GraduationCap className="w-6 h-6" />,
      path: "/child-education-calculator",
      color: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/20",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-8 border-b border-border/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">FinanceCalc</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Financial Calculators
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Precise, elegant tools to help you make informed financial decisions with confidence
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {calculators.map((calculator, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`bg-gradient-to-br ${calculator.color} p-px rounded-xl overflow-hidden`}
              >
                <Link 
                  to={calculator.path}
                  className={`block h-full p-6 bg-card rounded-xl border ${calculator.borderColor} hover:bg-card/90 transition duration-200`}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-secondary rounded-lg mr-3">
                      {calculator.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{calculator.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{calculator.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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

export default Index;
