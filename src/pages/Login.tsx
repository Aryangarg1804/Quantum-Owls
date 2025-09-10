import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { translate } = useLanguage();
  const { login, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
    
    setIsSubmitting(false);
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 pt-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-pink-50 to-purple-50 dark:from-gray-900 dark:via-pink-900/20 dark:to-purple-900/20" />
      <div className="saheli-container max-w-md w-full">
        <Button variant="ghost" className="mb-6 text-saheli-purple" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> {translate("Back", "वापस")}
        </Button>
        <Card className="shadow-xl border-pink-200/40 dark:border-pink-800/40">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl bg-gradient-to-r from-saheli-purple to-saheli-pink bg-clip-text text-transparent">
              {translate("Welcome back", "वापसी पर स्वागत है")}
            </CardTitle>
            <CardDescription className="text-center">
              {translate("Sign in to your Saheli account", "अपने सहेली खाते में साइन इन करें")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Login Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-sm font-medium"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <div className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>
                  {translate("Continue with Google", "Google के साथ जारी रखें")}
                </span>
              </div>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {translate("Or continue with", "या जारी रखें")}
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  {translate("Email", "ईमेल")}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-saheli-purple/60" />
                  <Input 
                    id="email"
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="pl-9"
                    placeholder={translate("Enter your email", "अपना ईमेल दर्ज करें")}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">
                  {translate("Password", "पासवर्ड")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-saheli-purple/60" />
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="pl-9 pr-9"
                    placeholder={translate("Enter your password", "अपना पासवर्ड दर्ज करें")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link 
                  to="/forgot-password" 
                  className="text-saheli-purple hover:underline"
                >
                  {translate("Forgot password?", "पासवर्ड भूल गए?")}
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full saheli-btn h-12"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {translate("Signing in...", "साइन इन हो रहा है...")}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    {translate("Login", "लॉगिन")}
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              {translate("Don't have an account?", "खाता नहीं है?")} 
              <Link className="text-saheli-purple underline ml-1" to="/register">
                {translate("Sign up", "साइन अप")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
