import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate Firebase Auth here
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-pink-50 to-purple-50" />
      <div className="saheli-container max-w-md w-full">
        <Button variant="ghost" className="mb-6 text-saheli-purple" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> {translate("Back", "वापस")}
        </Button>
        <Card className="shadow-xl border-pink-200/40">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-saheli-purple to-saheli-pink bg-clip-text text-transparent">
              {translate("Welcome back", "वापसी पर स्वागत है")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{translate("Email", "ईमेल")}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-saheli-purple/60" />
                  <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{translate("Password", "पासवर्ड")}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-saheli-purple/60" />
                  <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" />
                </div>
              </div>
              <Button type="submit" className="w-full saheli-btn">{translate("Login", "लॉगिन")}</Button>
            </form>
            <div className="mt-4 text-center text-sm">
              {translate("Don't have an account?", "खाता नहीं है?")} <Link className="text-saheli-purple underline" to="/register">{translate("Sign up", "साइन अप")}</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
