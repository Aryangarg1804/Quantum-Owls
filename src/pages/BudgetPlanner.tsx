
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeroSection from "@/components/HeroSection";

const COLORS = ['#8B5CF6', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#EC4899'];

const BudgetPlanner = () => {
  const [formData, setFormData] = useState({
    income: "",
    rent: "",
    utilities: "",
    groceries: "",
    transportation: "",
    savings: "",
    investments: "",
    entertainment: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Calculate data for pie chart
  const calculateBudgetData = () => {
    const data = [
      { name: 'Rent', value: Number(formData.rent) || 0 },
      { name: 'Utilities', value: Number(formData.utilities) || 0 },
      { name: 'Groceries', value: Number(formData.groceries) || 0 },
      { name: 'Transportation', value: Number(formData.transportation) || 0 },
      { name: 'Savings', value: Number(formData.savings) || 0 },
      { name: 'Investments', value: Number(formData.investments) || 0 },
      { name: 'Entertainment', value: Number(formData.entertainment) || 0 }
    ].filter(item => item.value > 0);
    
    return data;
  };
  
  const data = calculateBudgetData();
  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);
  const hasData = data.length > 0;
  
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Budget Planner"
        subtitle="Visualize and manage your monthly budget effectively"
      />
      
      <section className="py-12 saheli-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="saheli-card">
            <h3 className="text-xl font-semibold mb-6">Enter Your Budget Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 mb-2">Monthly Income</label>
                <Input 
                  type="number" 
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Rent</label>
                <Input 
                  type="number" 
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Utilities</label>
                <Input 
                  type="number" 
                  name="utilities"
                  value={formData.utilities}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Groceries</label>
                <Input 
                  type="number" 
                  name="groceries"
                  value={formData.groceries}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Transportation</label>
                <Input 
                  type="number" 
                  name="transportation"
                  value={formData.transportation}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Savings</label>
                <Input 
                  type="number" 
                  name="savings"
                  value={formData.savings}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Investments</label>
                <Input 
                  type="number" 
                  name="investments"
                  value={formData.investments}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2">Entertainment</label>
                <Input 
                  type="number" 
                  name="entertainment"
                  value={formData.entertainment}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Enter amount"
                />
              </div>
              
              <Button className="saheli-btn w-full mt-4">Update Budget</Button>
            </div>
          </div>
          
          <div className="saheli-card">
            <h3 className="text-xl font-semibold mb-6">Your Budget Visualization</h3>
            
            {hasData ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <p className="text-white/50 text-center">
                  Enter your budget details on the left to see your visualization
                </p>
              </div>
            )}
            
            {hasData && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Total Monthly Expenses:</span>
                  <span className="text-white font-semibold">₹{totalExpenses}</span>
                </div>
                
                {formData.income && (
                  <>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-white/70">Income:</span>
                      <span className="text-white font-semibold">₹{formData.income}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-white/70">Remaining:</span>
                      <span className={`font-semibold ${Number(formData.income) - totalExpenses >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ₹{Number(formData.income) - totalExpenses}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BudgetPlanner;
