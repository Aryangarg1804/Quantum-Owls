import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Translated from "@/components/Translated";
import { User, Phone, MapPin, Building2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const { profile, saveProfile } = useProfile();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    businessName: "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (user) {
      setForm({
        name: profile?.name || user.name,
        email: profile?.email || user.email,
        phone: profile?.phone || "",
        address: profile?.address || "",
        bio: profile?.bio || "",
        businessName: profile?.businessName || "",
        avatarUrl: profile?.avatarUrl || user.picture || "",
      });
    }
  }, [user, profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    saveProfile(form);
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              <Translated en="Your Profile" hi="आपकी प्रोफ़ाइल" />
            </h1>
            <p className="text-muted-foreground">
              <Translated en="Update your personal and business details" hi="अपने व्यक्तिगत और व्यावसायिक विवरण अपडेट करें" />
            </p>
          </div>

          <Card className="saheli-card">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={form.avatarUrl} alt={form.name} />
                  <AvatarFallback className="bg-saheli-purple text-white">
                    {form.name ? form.name.split(' ').map(n=>n[0]).join('') : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-foreground">{form.name}</CardTitle>
                  <CardDescription>{form.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    <Translated en="Full Name" hi="पूरा नाम" />
                  </label>
                  <div className="relative">
                    <User className="h-4 w-4 absolute left-3 top-3 text-saheli-purple/60" />
                    <Input name="name" value={form.name} onChange={handleChange} className="pl-9" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    <Translated en="Phone" hi="फोन" />
                  </label>
                  <div className="relative">
                    <Phone className="h-4 w-4 absolute left-3 top-3 text-saheli-purple/60" />
                    <Input name="phone" value={form.phone} onChange={handleChange} className="pl-9" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-muted-foreground mb-1 block">
                    <Translated en="Address" hi="पता" />
                  </label>
                  <div className="relative">
                    <MapPin className="h-4 w-4 absolute left-3 top-3 text-saheli-purple/60" />
                    <Input name="address" value={form.address} onChange={handleChange} className="pl-9" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    <Translated en="Business Name" hi="व्यवसाय का नाम" />
                  </label>
                  <div className="relative">
                    <Building2 className="h-4 w-4 absolute left-3 top-3 text-saheli-purple/60" />
                    <Input name="businessName" value={form.businessName} onChange={handleChange} className="pl-9" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-muted-foreground mb-1 block">
                    <Translated en="About You" hi="आपके बारे में" />
                  </label>
                  <Textarea name="bio" value={form.bio} onChange={handleChange} rows={4} />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={onSave} className="saheli-btn">
                  <Save className="h-4 w-4 mr-2" />
                  <Translated en="Save Changes" hi="परिवर्तन सहेजें" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
