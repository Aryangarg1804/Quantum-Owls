import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, CreditCard, IndianRupee, Smartphone, Truck, CheckCircle2 } from "lucide-react";

type PaymentMethod = "card" | "upi" | "cod";

const Checkout = () => {
	const navigate = useNavigate();
	const { items, clearCart } = useCart();
	const { translate } = useLanguage();
	const { toast } = useToast();

	// Redirect if cart is empty
	useEffect(() => {
		if (items.length === 0) navigate("/cart");
	}, [items.length, navigate]);

	const subtotal = useMemo(() => items.reduce((total, item) => {
		const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
		return total + (price * item.quantity);
	}, 0), [items]);

	const tax = subtotal * 0.18;
	const shipping = 0; // Free shipping in mock
	const total = subtotal + tax + shipping;

	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
	const [shippingInfo, setShippingInfo] = useState({
		name: "",
		phone: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		pincode: "",
	});
	const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
	const [upiId, setUpiId] = useState("");

	const validate = (): boolean => {
		const { name, phone, address1, city, state, pincode } = shippingInfo;
		if (!name || !phone || !address1 || !city || !state || !pincode) {
			toast({
				title: translate("Missing Information", "जानकारी अधूरी है"),
				description: translate("Please fill all required shipping fields.", "कृपया सभी आवश्यक शिपिंग फ़ील्ड भरें।"),
				variant: "destructive",
			});
			return false;
		}
		if (paymentMethod === "card") {
			if (!card.number || !card.name || !card.expiry || !card.cvv) {
				toast({
					title: translate("Payment Details Required", "भुगतान विवरण आवश्यक"),
					description: translate("Please enter your card details.", "कृपया अपने कार्ड विवरण दर्ज करें।"),
					variant: "destructive",
				});
				return false;
			}
		} else if (paymentMethod === "upi") {
			if (!upiId) {
				toast({
					title: translate("UPI ID Required", "UPI आईडी आवश्यक"),
					description: translate("Please enter a valid UPI ID.", "कृपया मान्य UPI आईडी दर्ज करें।"),
					variant: "destructive",
				});
				return false;
			}
		}
		return true;
	};

	const placeOrder = async () => {
		if (!validate()) return;
		setIsProcessing(true);
		// Simulate payment processing
		await new Promise(res => setTimeout(res, 1200));

		const orderId = `SAH-${Date.now()}`;
		const order = {
			id: orderId,
			date: new Date().toISOString(),
			items,
			amounts: { subtotal, tax, shipping, total },
			shipping: shippingInfo,
			payment: {
				method: paymentMethod,
				maskedCard: paymentMethod === 'card' ? card.number.replace(/\d(?=\d{4})/g, '•') : undefined,
				upiId: paymentMethod === 'upi' ? upiId : undefined,
			},
		};
		localStorage.setItem("saheli-last-order", JSON.stringify(order));

		clearCart();
		toast({
			title: translate("Payment Successful", "भुगतान सफल"),
			description: translate("Your order has been placed.", "आपका ऑर्डर दे दिया गया है।"),
		});
		navigate("/order-confirmation");
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

				<h1 className="saheli-title mb-8">{translate("Checkout", "चेकआउट")}</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Shipping & Payment */}
					<div className="lg:col-span-2 space-y-6">
						<div className="saheli-card">
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<Truck className="h-5 w-5 text-saheli-purple" />
								{translate("Shipping Information", "शिपिंग जानकारी")}
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="text-sm text-muted-foreground">{translate("Full Name", "पूरा नाम")}</label>
									<Input value={shippingInfo.name} onChange={e=>setShippingInfo(s=>({...s,name:e.target.value}))} />
								</div>
								<div>
									<label className="text-sm text-muted-foreground">{translate("Phone Number", "फ़ोन नंबर")}</label>
									<Input value={shippingInfo.phone} onChange={e=>setShippingInfo(s=>({...s,phone:e.target.value}))} />
								</div>
								<div className="md:col-span-2">
									<label className="text-sm text-muted-foreground">{translate("Address Line 1", "पता पंक्ति 1")}</label>
									<Input value={shippingInfo.address1} onChange={e=>setShippingInfo(s=>({...s,address1:e.target.value}))} />
								</div>
								<div className="md:col-span-2">
									<label className="text-sm text-muted-foreground">{translate("Address Line 2 (optional)", "पता पंक्ति 2 (वैकल्पिक)")}</label>
									<Input value={shippingInfo.address2} onChange={e=>setShippingInfo(s=>({...s,address2:e.target.value}))} />
								</div>
								<div>
									<label className="text-sm text-muted-foreground">{translate("City", "शहर")}</label>
									<Input value={shippingInfo.city} onChange={e=>setShippingInfo(s=>({...s,city:e.target.value}))} />
								</div>
								<div>
									<label className="text-sm text-muted-foreground">{translate("State", "राज्य")}</label>
									<Input value={shippingInfo.state} onChange={e=>setShippingInfo(s=>({...s,state:e.target.value}))} />
								</div>
								<div>
									<label className="text-sm text-muted-foreground">{translate("PIN Code", "पिन कोड")}</label>
									<Input value={shippingInfo.pincode} onChange={e=>setShippingInfo(s=>({...s,pincode:e.target.value}))} />
								</div>
							</div>
						</div>

						<div className="saheli-card">
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<IndianRupee className="h-5 w-5 text-saheli-purple" />
								{translate("Payment Method", "भुगतान का तरीका")}
							</h2>
							<div className="flex gap-2 mb-4">
								<Button variant={paymentMethod==='card'?'default':'outline'} onClick={()=>setPaymentMethod('card')} className={paymentMethod==='card'?"saheli-btn":""}>
									<CreditCard className="h-4 w-4 mr-2" />
									{translate("Card", "कार्ड")}
								</Button>
								<Button variant={paymentMethod==='upi'?'default':'outline'} onClick={()=>setPaymentMethod('upi')} className={paymentMethod==='upi'?"saheli-btn":""}>
									<Smartphone className="h-4 w-4 mr-2" />
									UPI
								</Button>
								<Button variant={paymentMethod==='cod'?'default':'outline'} onClick={()=>setPaymentMethod('cod')} className={paymentMethod==='cod'?"saheli-btn":""}>
									{translate("Cash on Delivery", "डिलीवरी पर नकद")}
								</Button>
							</div>

							{paymentMethod === 'card' && (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="md:col-span-2">
										<label className="text-sm text-muted-foreground">{translate("Card Number", "कार्ड नंबर")}</label>
										<Input value={card.number} onChange={e=>setCard(c=>({...c,number:e.target.value}))} placeholder="1234 5678 9012 3456" />
									</div>
									<div>
										<label className="text-sm text-muted-foreground">{translate("Name on Card", "कार्ड पर नाम")}</label>
										<Input value={card.name} onChange={e=>setCard(c=>({...c,name:e.target.value}))} />
									</div>
									<div>
										<label className="text-sm text-muted-foreground">{translate("Expiry (MM/YY)", "समाप्ति (MM/YY)")}</label>
										<Input value={card.expiry} onChange={e=>setCard(c=>({...c,expiry:e.target.value}))} placeholder="10/27" />
									</div>
									<div>
										<label className="text-sm text-muted-foreground">CVV</label>
										<Input value={card.cvv} onChange={e=>setCard(c=>({...c,cvv:e.target.value}))} placeholder="123" />
									</div>
								</div>
							)}

							{paymentMethod === 'upi' && (
								<div>
									<label className="text-sm text-muted-foreground">{translate("UPI ID", "UPI आईडी")}</label>
									<Input value={upiId} onChange={e=>setUpiId(e.target.value)} placeholder="name@bank" />
								</div>
							)}

							{paymentMethod === 'cod' && (
								<div className="text-sm text-muted-foreground">
									{translate("You can pay in cash when the order is delivered.", "आर्डर डिलीवर होने पर आप नकद भुगतान कर सकते हैं।")}
								</div>
							)}
						</div>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="sticky top-20">
							<div className="saheli-card mb-6">
								<h3 className="text-xl font-semibold mb-4">{translate("Order Summary", "ऑर्डर सारांश")}</h3>
								<div className="space-y-2 mb-4 max-h-48 overflow-auto pr-1">
									{items.map(item => (
										<div key={item.id} className="flex items-center justify-between gap-3">
											<div className="flex items-center gap-3">
												<img src={item.image} alt={item.title} className="h-12 w-12 rounded object-cover" />
												<div>
													<div className="text-sm font-medium">{item.title}</div>
													<div className="text-xs text-muted-foreground">x{item.quantity}</div>
												</div>
											</div>
											<div className="text-sm">{item.price}</div>
										</div>
									))}
								</div>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between"><span className="text-muted-foreground">{translate("Subtotal", "उप-कुल")}</span><span>₹{subtotal.toFixed(2)}</span></div>
									<div className="flex justify-between"><span className="text-muted-foreground">{translate("Shipping", "शिपिंग")}</span><span>{translate("Free", "मुफ्त")}</span></div>
									<div className="flex justify-between"><span className="text-muted-foreground">{translate("Tax (18%)", "कर (18%)")}</span><span>₹{tax.toFixed(2)}</span></div>
									<div className="border-t border-border pt-3 flex justify-between font-semibold"><span>{translate("Total", "कुल")}</span><span className="text-saheli-purple">₹{total.toFixed(2)}</span></div>
								</div>

								<Button 
									className="saheli-btn w-full mt-4 flex items-center justify-center gap-2"
									onClick={placeOrder}
									disabled={isProcessing}
								>
									{isProcessing ? (
										<>
											<CheckCircle2 className="h-5 w-5 animate-pulse" />
											{translate("Processing...", "प्रोसेसिंग...")}
										</>
									) : (
										<>
											<CreditCard className="h-5 w-5" />
											{translate("Pay Now", "अभी भुगतान करें")}
										</>
									)}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;

