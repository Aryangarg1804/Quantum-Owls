import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/contexts/ProductContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Translated from "@/components/Translated";
import { Upload, PackagePlus } from "lucide-react";

export default function AddProduct() {
  const { isAuthenticated, user } = useAuth();
  const { addProduct } = useProducts();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    titleHi: "",
    category: "textiles",
    image: "",
    images: "",
    priceMin: "",
    priceMax: "",
    description: "",
    descriptionHi: "",
    producer: "",
    producerHi: "",
  });

  useEffect(() => {
    if (!isAuthenticated || !user) navigate("/login");
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceRange = `₹${form.priceMin} - ₹${form.priceMax}`;
    const images = form.images
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
    const p = addProduct({
      category: form.category,
      image: form.image || images[0] || "https://via.placeholder.com/400x300?text=Product",
      images,
      title: form.title,
      titleHi: form.titleHi,
      producer: form.producer || user?.name || "",
      producerHi: form.producerHi,
      description: form.description,
      descriptionHi: form.descriptionHi,
      priceRange,
      rating: 5,
      orders: 0,
    });
    navigate(`/product/${p.id}`);
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              <Translated en="Add New Product" hi="नया उत्पाद जोड़ें" />
            </h1>
            <p className="text-muted-foreground">
              <Translated en="Fill details to publish your product" hi="अपना उत्पाद प्रकाशित करने के लिए विवरण भरें" />
            </p>
          </div>

          <Card className="saheli-card">
            <CardHeader>
              <CardTitle className="text-foreground">
                <Translated en="Product Details" hi="उत्पाद विवरण" />
              </CardTitle>
              <CardDescription>
                <Translated en="Provide bilingual info for better reach (optional)" hi="बेहतर पहुंच के लिए दोभाषी जानकारी दें (वैकल्पिक)" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      <Translated en="Title (English)" hi="शीर्षक (अंग्रेज़ी)" />
                    </label>
                    <Input name="title" value={form.title} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      <Translated en="Title (Hindi)" hi="शीर्षक (हिंदी)" />
                    </label>
                    <Input name="titleHi" value={form.titleHi} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      <Translated en="Category" hi="श्रेणी" />
                    </label>
                    <Input name="category" value={form.category} onChange={handleChange} placeholder="textiles, food, handicrafts, beauty, agriculture" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      <Translated en="Main Image URL" hi="मुख्य छवि URL" />
                    </label>
                    <Input name="image" value={form.image} onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-muted-foreground mb-1 block">
                      <Translated en="Additional Image URLs (comma separated)" hi="अतिरिक्त छवि URL (अल्पविराम से अलग)" />
                    </label>
                    <Input name="images" value={form.images} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      <Translated en="Min Price (₹)" hi="न्यूनतम मूल्य (₹)" />
                    </label>
                    <Input name="priceMin" value={form.priceMin} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      <Translated en="Max Price (₹)" hi="अधिकतम मूल्य (₹)" />
                    </label>
                    <Input name="priceMax" value={form.priceMax} onChange={handleChange} required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-muted-foreground mb-1 block">
                      <Translated en="Description (English)" hi="विवरण (अंग्रेज़ी)" />
                    </label>
                    <Textarea name="description" value={form.description} onChange={handleChange} rows={4} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-muted-foreground mb-1 block">
                      <Translated en="Description (Hindi)" hi="विवरण (हिंदी)" />
                    </label>
                    <Textarea name="descriptionHi" value={form.descriptionHi} onChange={handleChange} rows={4} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      <Translated en="Producer (English)" hi="उत्पादक (अंग्रेज़ी)" />
                    </label>
                    <Input name="producer" value={form.producer} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      <Translated en="Producer (Hindi)" hi="उत्पादक (हिंदी)" />
                    </label>
                    <Input name="producerHi" value={form.producerHi} onChange={handleChange} />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                    <Translated en="Cancel" hi="रद्द करें" />
                  </Button>
                  <Button type="submit" className="saheli-btn">
                    <PackagePlus className="h-4 w-4 mr-2" />
                    <Translated en="Publish" hi="प्रकाशित करें" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
