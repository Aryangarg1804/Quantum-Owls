import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiSend } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const Checkout = () => {
  const { items, clearCart } = useCart();
  const { translate } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [payment, setPayment] = useState<'cod'|'online'>('cod');
  const [isPlacing, setIsPlacing] = useState(false);

  const subtotal = useMemo(() => items.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return total + (price * item.quantity);
  }, 0), [items]);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const placeOrder = async () => {
    if (!items.length) return;
    setIsPlacing(true);
    const id = `ord_${Date.now()}`;
    const order = {
      id,
      user_id: user?.id ?? null,
      items: items.map(i => ({ id: i.id, title: i.title, price: i.price, quantity: i.quantity, image: i.image })),
      subtotal,
      tax,
      total,
      status: payment === 'cod' ? 'paid' : 'pending',
      payment_method: payment,
      shipping_name: name || null,
      shipping_phone: phone || null,
      shipping_address: address || null,
      shipping_city: city || null,
      shipping_state: state || null,
      shipping_pincode: pincode || null,
    };

    try {
      await apiSend('/api/orders', 'POST', order);
    } catch {
      // Fallback: store locally
      const local = JSON.parse(localStorage.getItem('saheli-orders') || '[]');
      local.unshift(order);
      localStorage.setItem('saheli-orders', JSON.stringify(local));
    }

    clearCart();
    toast({ title: translate('Order Confirmed', 'ऑर्डर की पुष्टि हो गई'), description: translate('Thank you for your purchase!', 'खरीद के लिए धन्यवाद!') });
    navigate(`/order/${id}`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="saheli-container max-w-4xl">
        <h1 className="saheli-title mb-6">{translate('Checkout', 'चेकआउट')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="saheli-card">
            <h2 className="text-lg font-semibold mb-4">{translate('Shipping Details', 'शिपिंग विवरण')}</h2>
            <div className="space-y-3">
              <Input placeholder={translate('Full Name', 'पूरा नाम')} value={name} onChange={e => setName(e.target.value)} />
              <Input placeholder={translate('Phone', 'फोन')} value={phone} onChange={e => setPhone(e.target.value)} />
              <Textarea placeholder={translate('Address', 'पता')} value={address} onChange={e => setAddress(e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder={translate('City', 'शहर')} value={city} onChange={e => setCity(e.target.value)} />
                <Input placeholder={translate('State', 'राज्य')} value={state} onChange={e => setState(e.target.value)} />
              </div>
              <Input placeholder={translate('PIN Code', 'पिन कोड')} value={pincode} onChange={e => setPincode(e.target.value)} />
            </div>
          </div>
          <div className="saheli-card">
            <h2 className="text-lg font-semibold mb-4">{translate('Order Summary', 'ऑर्डर सारांश')}</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>{translate('Subtotal', 'उप-कुल')}</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>{translate('Tax', 'कर')}</span><span>₹{tax.toFixed(2)}</span></div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold"><span>{translate('Total', 'कुल')}</span><span className="text-saheli-purple">₹{total.toFixed(2)}</span></div>
            </div>

            <div className="mt-4 space-y-2">
              <label className="block text-sm font-medium">{translate('Payment Method', 'भुगतान का तरीका')}</label>
              <div className="flex gap-3">
                <button className={`px-3 py-2 rounded border ${payment==='cod'?'border-saheli-purple text-saheli-purple':'border-border text-muted-foreground'}`} onClick={()=>setPayment('cod')}>{translate('Cash on Delivery', 'डिलीवरी पर नकद')}</button>
                <button className={`px-3 py-2 rounded border ${payment==='online'?'border-saheli-purple text-saheli-purple':'border-border text-muted-foreground'}`} onClick={()=>setPayment('online')}>{translate('Online (coming soon)', 'ऑनलाइन (जल्द)')}</button>
              </div>
            </div>

            <Button className="saheli-btn w-full mt-4" onClick={placeOrder} disabled={isPlacing || !items.length}>
              {isPlacing ? translate('Placing...', 'प्रोसेस हो रहा है...') : translate('Place Order', 'ऑर्डर दें')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
