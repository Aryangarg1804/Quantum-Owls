
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeroSection from "@/components/HeroSection";
import { useLanguage } from "@/contexts/LanguageContext";
import Translated from "@/components/Translated";

const COLORS = ['#8B5CF6', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#EC4899'];

const BudgetPlanner = () => {
  const { translate } = useLanguage();
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
  
  // Localized labels for categories
  const NAME_HI: Record<string, string> = {
    Rent: "किराया",
    Utilities: "यूटिलिटीज़",
    Groceries: "किराना",
    Transportation: "यातायात",
    Savings: "बचत",
    Investments: "निवेश",
    Entertainment: "मनोरंजन",
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
        title={translate('Budget Planner','बजट प्लानर')}
        subtitle={translate('Visualize and manage your monthly budget effectively','अपने मासिक बजट को प्रभावी ढंग से देखें और प्रबंधित करें')}
      />
      
      <section className="py-12 saheli-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="saheli-card">
            <h3 className="text-xl font-semibold mb-6">
              <Translated en="Enter Your Budget Details" hi="अपना बजट विवरण दर्ज करें" />
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-muted-foreground mb-2">
                  <Translated en="Monthly Income" hi="मासिक आय" />
                </label>
                <Input 
                  type="number" 
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground"
                  placeholder={translate('Enter amount','राशि दर्ज करें')}
                />
              </div>
              
              <div>
                <label className="block text-muted-foreground mb-2">
                  <Translated en="Rent" hi="किराया" />
                </label>
                <Input 
                  type="number" 
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground"
                  placeholder={translate('Enter amount','राशि दर्ज करें')}
                />
              </div>
              
              <div>
                <label className="block text-muted-foreground mb-2">
                  <Translated en="Utilities" hi="यूटिलिटीज़" />
                </label>
                <Input 
                  type="number" 
                  name="utilities"
                  value={formData.utilities}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground"
                  placeholder={translate('Enter amount','राशि दर्ज करें')}
                />
              </div>
              
              <div>
                <label className="block text-muted-foreground mb-2">
                  <Translated en="Groceries" hi="किराना" />
                </label>
                <Input 
                  type="number" 
                  name="groceries"
                  value={formData.groceries}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground"
                  placeholder={translate('Enter amount','राशि दर्ज करें')}
                />
              </div>
              
              <div>
                <label className="block text-muted-foreground mb-2">
                  <Translated en="Transportation" hi="यातायात" />
                </label>
                <Input 
                  type="number" 
                  name="transportation"
                  value={formData.transportation}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground"
                  placeholder={translate('Enter amount','राशि दर्ज करें')}
                />
              </div>
              
              <div>
                <label className="block text-muted-foreground mb-2">
                  <Translated en="Savings" hi="बचत" />
                </label>
                <Input 
                  type="number" 
                  name="savings"
                  value={formData.savings}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground"
                  placeholder={translate('Enter amount','राशि दर्ज करें')}
                />
              </div>
              
              <div>
                <label className="block text-muted-foreground mb-2">
                  <Translated en="Investments" hi="निवेश" />
                </label>
                <Input 
                  type="number" 
                  name="investments"
                  value={formData.investments}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground"
                  placeholder={translate('Enter amount','राशि दर्ज करें')}
                />
              </div>
              
              <div>
                <label className="block text-muted-foreground mb-2">
                  <Translated en="Entertainment" hi="मनोरंजन" />
                </label>
                <Input 
                  type="number" 
                  name="entertainment"
                  value={formData.entertainment}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder={translate('Enter amount','राशि दर्ज करें')}
                />
              </div>
              
              <Button className="saheli-btn w-full mt-4">
                <Translated en="Update Budget" hi="बजट अपडेट करें" />
              </Button>
            </div>
          </div>
          
          <div className="saheli-card">
            <h3 className="text-xl font-semibold mb-6">
              <Translated en="Your Budget Visualization" hi="आपका बजट दृश्य" />
            </h3>
            
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
                      label={({ name, percent }) => `${translate(name, NAME_HI[name] || name)} ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`₹${value}`, translate(String(name), NAME_HI[String(name)] || String(name))]} />
                    <Legend formatter={(value) => translate(String(value), NAME_HI[String(value)] || String(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground/80 text-center">
                  <Translated en="Enter your budget details on the left to see your visualization" hi="अपना विज़ुअल देखने के लिए बाईं ओर अपना बजट विवरण दर्ज करें" />
                </p>
              </div>
            )}
            
            {hasData && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground"><Translated en="Total Monthly Expenses:" hi="कुल मासिक खर्च:" /></span>
                  <span className="text-foreground font-semibold">₹{totalExpenses}</span>
                </div>
                
                {formData.income && (
                  <>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-muted-foreground"><Translated en="Income:" hi="आय:" /></span>
                      <span className="text-foreground font-semibold">₹{formData.income}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-muted-foreground"><Translated en="Remaining:" hi="शेष:" /></span>
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
