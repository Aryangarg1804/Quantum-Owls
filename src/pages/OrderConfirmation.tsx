import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiGet } from '@/lib/api';

const OrderConfirmation = () => {
  const { id } = useParams();
  const { translate } = useLanguage();
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    (async () => {
      try {
        const order = await apiGet<any>(`/api/orders?id=${id}`);
        setTotal(order?.total);
      } catch {
        const local = JSON.parse(localStorage.getItem('saheli-orders') || '[]');
        const found = local.find((o: any) => o.id === id);
        setTotal(found?.total);
      }
    })();
  }, [id]);

  return (
    <div className="min-h-screen py-12">
      <div className="saheli-container max-w-xl text-center">
        <h1 className="saheli-title mb-2">{translate('Thank you!', 'धन्यवाद!')}</h1>
        <p className="text-muted-foreground mb-6">{translate('Your order has been placed successfully.', 'आपका ऑर्डर सफलतापूर्वक दे दिया गया है।')}</p>
        <div className="saheli-card mb-6">
          <p>{translate('Order ID', 'ऑर्डर आईडी')}: <span className="font-mono">{id}</span></p>
          {total !== undefined && <p className="mt-2">{translate('Total Paid', 'कुल भुगतान')}: ₹{total.toFixed(2)}</p>}
        </div>
        <Link className="saheli-btn inline-block" to="/entrepreneurship">{translate('Continue shopping', 'खरीदारी जारी रखें')}</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
