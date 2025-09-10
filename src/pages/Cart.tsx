
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const { translate } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  
  const subtotal = items.reduce((total, item) => {
    // Extract the numeric part from the price string (remove ₹ and any commas)
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return total + (price * item.quantity);
  }, 0);
  
  const handleCheckout = () => {
    toast({
      title: translate("Order Placed", "ऑर्डर दिया गया"),
      description: translate(
        "Your order has been placed successfully!",
        "आपका ऑर्डर सफलतापूर्वक दे दिया गया है!"
      ),
    });
    clearCart();
    navigate('/');
  };
  
  const handleApplyCoupon = () => {
    toast({
      title: translate("Invalid Coupon", "अमान्य कूपन"),
      description: translate(
        "The coupon code you entered is invalid or has expired.",
        "आपके द्वारा दर्ज किया गया कूपन कोड अमान्य है या समाप्त हो गया है।"
      ),
      variant: "destructive"
    });
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="saheli-container">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-saheli-purple hover:text-saheli-purple/80"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{translate("Back", "वापस")}</span>
          </Button>
        </div>
        
        <h1 className="saheli-title mb-8">{translate("Your Shopping Cart", "आपकी शॉपिंग कार्ट")}</h1>
        
        {items.length === 0 ? (
          <div className="saheli-card flex flex-col items-center p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-saheli-purple/30 mb-4" />
            <h2 className="text-xl font-semibold mb-2">{translate("Your cart is empty", "आपकी कार्ट खाली है")}</h2>
            <p className="text-white/70 mb-6">{translate(
              "Add items to your cart to see them here", 
              "अपनी कार्ट में आइटम जोड़ें ताकि उन्हें यहां देख सकें"
            )}</p>
            <Button className="saheli-btn" onClick={() => navigate('/entrepreneurship')}>
              {translate("Browse Products", "उत्पाद ब्राउज़ करें")}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="saheli-card mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-4">{translate("Product", "उत्पाद")}</th>
                        <th className="text-center py-4 px-4">{translate("Quantity", "मात्रा")}</th>
                        <th className="text-right py-4 px-4">{translate("Price", "कीमत")}</th>
                        <th className="text-right py-4 px-4">{translate("Actions", "कार्रवाई")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-white/10">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.title} className="h-16 w-16 object-cover rounded-md" />
                              <div>
                                <h3 className="font-medium">{item.title}</h3>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            {item.price}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-300 hover:bg-red-500/10"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 flex justify-between">
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-500/10"
                    onClick={clearCart}
                  >
                    {translate("Clear Cart", "कार्ट साफ़ करें")}
                  </Button>
                  
                  <Button
                    className="saheli-btn"
                    onClick={() => navigate('/entrepreneurship')}
                  >
                    {translate("Continue Shopping", "शॉपिंग जारी रखें")}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <div className="saheli-card mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {translate("Order Summary", "ऑर्डर सारांश")}
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-white/70">{translate("Subtotal", "उप-कुल")}</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-white/70">{translate("Shipping", "शिपिंग")}</span>
                      <span>{translate("Free", "मुफ्त")}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-white/70">{translate("Tax", "कर")}</span>
                      <span>₹{(subtotal * 0.18).toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-white/10 pt-4 flex justify-between font-semibold">
                      <span>{translate("Total", "कुल")}</span>
                      <span className="text-saheli-purple">₹{(subtotal + subtotal * 0.18).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-white/70 mb-2">
                      {translate("Coupon Code", "कूपन कोड")}
                    </label>
                    <div className="flex gap-2">
                      <Input 
                        className="bg-white/5 border-white/10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder={translate("Enter coupon code", "कूपन कोड दर्ज करें")}
                      />
                      <Button 
                        variant="outline"
                        onClick={handleApplyCoupon}
                      >
                        {translate("Apply", "लागू करें")}
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    className="saheli-btn w-full"
                    onClick={handleCheckout}
                  >
                    {translate("Checkout", "चेकआउट")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
