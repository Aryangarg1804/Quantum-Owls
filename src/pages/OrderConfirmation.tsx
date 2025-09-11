import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, PackageCheck, Home, ShoppingBag } from "lucide-react";

interface LastOrder {
	id: string;
	date: string;
	items: Array<{ id: string; title: string; image: string; quantity: number; price: string }>;
	amounts: { subtotal: number; tax: number; shipping: number; total: number };
	shipping: { name: string; address1: string; address2?: string; city: string; state: string; pincode: string; phone: string };
	payment: { method: string; maskedCard?: string; upiId?: string };
}

const OrderConfirmation = () => {
	const { translate } = useLanguage();
	const navigate = useNavigate();
	const [order, setOrder] = useState<LastOrder | null>(null);

	useEffect(() => {
		const raw = localStorage.getItem("saheli-last-order");
		if (raw) setOrder(JSON.parse(raw));
	}, []);

	if (!order) {
		return (
			<div className="min-h-screen py-12">
				<div className="saheli-container text-center">
					<CheckCircle2 className="h-16 w-16 text-saheli-purple/40 mx-auto mb-4" />
					<h1 className="saheli-title mb-2">{translate("No recent order", "हाल ही में कोई ऑर्डर नहीं")}</h1>
					<Button className="saheli-btn" onClick={() => navigate('/')}>{translate("Go Home", "होम जाएं")}</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen py-12">
			<div className="saheli-container">
				<div className="text-center mb-8">
					<PackageCheck className="h-16 w-16 text-saheli-purple mx-auto mb-3" />
					<h1 className="saheli-title mb-2">{translate("Order Confirmed!", "ऑर्डर कन्फर्म हो गया!")}</h1>
					<p className="text-muted-foreground">
						{translate("Thank you for your purchase. A confirmation has been saved.", "आपकी खरीदारी के लिए धन्यवाद। पुष्टि सहेजी गई है।")}
					</p>
					<div className="mt-2 text-sm text-muted-foreground">{translate("Order ID", "ऑर्डर आईडी")}: <span className="font-mono">{order.id}</span></div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<div className="saheli-card">
							<h2 className="text-xl font-semibold mb-4">{translate("Items", "आइटम")}</h2>
							<div className="space-y-3">
								{order.items.map(i => (
									<div key={i.id} className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<img src={i.image} alt={i.title} className="h-12 w-12 rounded object-cover" />
											<div>
												<div className="font-medium text-sm">{i.title}</div>
												<div className="text-xs text-muted-foreground">x{i.quantity}</div>
											</div>
										</div>
										<div className="text-sm">{i.price}</div>
									</div>
								))}
							</div>
						</div>

						<div className="saheli-card">
							<h2 className="text-xl font-semibold mb-2">{translate("Shipping To", "शिपिंग पता")}</h2>
							<div className="text-sm text-muted-foreground">
								<div className="font-medium text-foreground">{order.shipping.name} · {order.shipping.phone}</div>
								<div>{order.shipping.address1}{order.shipping.address2 ? `, ${order.shipping.address2}` : ''}</div>
								<div>{order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-1">
						<div className="sticky top-20">
							<div className="saheli-card">
								<h3 className="text-xl font-semibold mb-4">{translate("Payment & Total", "भुगतान और कुल")}</h3>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between"><span className="text-muted-foreground">{translate("Subtotal", "उप-कुल")}</span><span>₹{order.amounts.subtotal.toFixed(2)}</span></div>
									<div className="flex justify-between"><span className="text-muted-foreground">{translate("Shipping", "शिपिंग")}</span><span>₹{order.amounts.shipping.toFixed(2)}</span></div>
									<div className="flex justify-between"><span className="text-muted-foreground">{translate("Tax", "कर")}</span><span>₹{order.amounts.tax.toFixed(2)}</span></div>
									<div className="border-t border-border pt-3 flex justify-between font-semibold"><span>{translate("Total", "कुल")}</span><span className="text-saheli-purple">₹{order.amounts.total.toFixed(2)}</span></div>
								</div>
							</div>

							<div className="flex gap-2 mt-4">
								<Button className="saheli-btn flex-1" onClick={() => navigate('/')}> <Home className="h-4 w-4 mr-2" /> {translate("Home", "होम")}</Button>
								<Button variant="outline" className="flex-1" onClick={() => navigate('/entrepreneurship')}> <ShoppingBag className="h-4 w-4 mr-2" /> {translate("Shop More", "और खरीदें")}</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderConfirmation;

