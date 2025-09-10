
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { LanguageProvider } from "./contexts/LanguageContext";
// import { CartProvider } from "./contexts/CartContext";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Index from "./pages/Index";
// import GovernmentSchemes from "./pages/GovernmentSchemes";
// import Entrepreneurship from "./pages/Entrepreneurship";
// import ProductDetail from "./pages/ProductDetail";
// import Calculators from "./pages/Calculators";
// import BudgetPlanner from "./pages/BudgetPlanner";
// import Investments from "./pages/Investments";
// import Cart from "./pages/Cart";
// import NotFound from "./pages/NotFound";
// import PPFCalculator from "./pages/calculators/PPFCalculator";
// import Chatbot from "./components/Chatbot";


// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <LanguageProvider>
//         <CartProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <div className="flex flex-col min-h-screen">
//               <Navbar />
//               <main className="flex-grow">
//                 <Routes>
//                   <Route path="/" element={<Index />} />
//                   <Route path="/government-schemes" element={<GovernmentSchemes />} />
//                   <Route path="/entrepreneurship" element={<Entrepreneurship />} />
//                   <Route path="/product/:id" element={<ProductDetail />} />
//                   <Route path="/calculators" element={<Calculators />} />
//                   <Route path="/calculators/ppf" element={<PPFCalculator />} />
//                   <Route path="/budget-planner" element={<BudgetPlanner />} />
//                   <Route path="/investments" element={<Investments />} />
//                   <Route path="/cart" element={<Cart />} />
//                   <Route path="*" element={<NotFound />} />
//                 </Routes>
//               </main>
//               <Footer />
//             </div>
//             <Chatbot />
//           </BrowserRouter>
//         </CartProvider>
//       </LanguageProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import Entrepreneurship from "./pages/Entrepreneurship";
import ProductDetail from "./pages/ProductDetail";
import Calculators from "./pages/Calculators";
import BudgetPlanner from "./pages/BudgetPlanner";
import Investments from "./pages/Investments";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import PPFCalculator from "./pages/calculators/PPFCalculator";
import SukanyaSamriddhiCalculator from "./pages/calculators/SukanyaSamriddhiCalculator"; // ✅ Import the new calculator
import Chatbot from "./components/Chatbot";
import ChildEducationCalculator from "./pages/calculators/ChildEducationCalculator";
import SipCalculator from "./pages/calculators/SipCalculator";
import LoanCalculator from "./pages/calculators/LoanCalculator";
import RetirementCalculator from "./pages/calculators/RetirementCalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/government-schemes" element={<GovernmentSchemes />} />
                  <Route path="/entrepreneurship" element={<Entrepreneurship />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/calculators" element={<Calculators />} />
                  <Route path="/calculators/ppf" element={<PPFCalculator />} />
                  <Route path="/calculators/sukanya-samriddhi" element={<SukanyaSamriddhiCalculator />} /> 
                  <Route path="/calculators/ChildEducation" element={<ChildEducationCalculator />} /> 
                  <Route path="/calculators/sipCalculater" element={<SipCalculator />} /> 
                  <Route path="/calculators/loanCalculater" element={<LoanCalculator />} /> 
                  <Route path="/calculators/retirementCalculater" element={<RetirementCalculator/>} /> 
                  <Route path="/budget-planner" element={<BudgetPlanner />} />
                  <Route path="/investments" element={<Investments />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Chatbot />
          </BrowserRouter>
        </CartProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
