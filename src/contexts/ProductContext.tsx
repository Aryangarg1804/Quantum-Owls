import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export interface Product {
  id: string;
  category: string;
  image: string;
  images?: string[];
  title: string;
  titleHi?: string;
  producer: string;
  producerHi?: string;
  description: string;
  descriptionHi?: string;
  priceRange: string;
  rating?: number;
  orders?: number;
  ownerId?: string;
}

type ProductInput = Omit<Product, "id" | "ownerId"> & { id?: string };

interface ProductContextType {
  products: Product[];
  addProduct: (input: ProductInput) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  findById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY = "saheli-products";

function seedDefaults(): Product[] {
  const items: Product[] = [
    {
      id: "handloom-sarees",
      category: "textiles",
      image: "https://i.pinimg.com/474x/04/66/56/0466566606dcccfc9fdeb69b5ae81d0b.jpg",
      title: "Handloom Sarees",
      titleHi: "हथकरघा साड़ियां",
      producer: "Lakshmi's Weaves",
      producerHi: "लक्ष्मी की बुनाई",
      description: "Traditional handwoven sarees made by skilled artisans",
      descriptionHi: "कुशल कारीगरों द्वारा बनाई गई पारंपरिक हथकरघा साड़ियां",
      priceRange: "₹2,500 - ₹15,000",
      rating: 4.8,
      orders: 145,
      images: [
        "https://i.pinimg.com/736x/21/aa/d6/21aad68ea6ffbcadc1478237b2f8ad75.jpg"
      ]
    },
    {
      id: "organic-spices",
      category: "food",
      image: "https://i.pinimg.com/736x/d8/c8/19/d8c8195f1f852b3678a8bba9cbc6bc27.jpg",
      title: "Organic Spices",
      titleHi: "जैविक मसाले",
      producer: "Rural Women's Collective",
      producerHi: "ग्रामीण महिला संघ",
      description: "Pure and authentic spices sourced directly from farmers",
      descriptionHi: "किसानों से सीधे प्राप्त शुद्ध और प्रामाणिक मसाले",
      priceRange: "₹200 - ₹1,000",
      rating: 4.9,
      orders: 328,
      images: [
        "https://i.pinimg.com/736x/9e/2f/8d/9e2f8d1d97af425fd0086b181d77e9ee.jpg"
      ]
    },
    {
      id: "handicraft-items",
      category: "handicrafts",
      image: "https://i.pinimg.com/736x/62/20/05/6220056f6df161427c1addc196afabc2.jpg",
      title: "Handicraft Items",
      titleHi: "हस्तशिल्प वस्तुएं",
      producer: "Artisan Circle",
      producerHi: "कारीगर मंडल",
      description: "Handmade decorative items and home accessories",
      descriptionHi: "हस्तनिर्मित सजावटी वस्तुएं और घरेलू सामान",
      priceRange: "₹500 - ₹5,000",
      rating: 4.7,
      orders: 89,
      images: [
        "https://i.pinimg.com/736x/32/ba/95/32ba959188b404fe65c042563c400994.jpg"
      ]
    },
    {
      id: "organic-beauty",
      category: "beauty",
      image: "https://i.pinimg.com/736x/98/00/ef/9800ef9ba075dc5b21d3818a0323ff77.jpg",
      title: "Organic Beauty Products",
      titleHi: "जैविक सौंदर्य उत्पाद",
      producer: "Nature's Touch",
      producerHi: "प्रकृति का स्पर्श",
      description: "Natural skincare products made from traditional recipes",
      descriptionHi: "पारंपरिक व्यंजनों से बने प्राकृतिक स्किनकेयर उत्पाद",
      priceRange: "₹150 - ₹1,200",
      rating: 4.6,
      orders: 203,
      images: [
        "https://i.pinimg.com/736x/f9/47/d8/f947d80e154238a8327d7bfbfa1c1d90.jpg"
      ]
    }
  ];
  return items;
}

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load from localStorage, seed defaults once
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Product[];
        setProducts(parsed.length ? parsed : seedDefaults());
      } catch {
        setProducts(seedDefaults());
      }
    } else {
      setProducts(seedDefaults());
    }
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const findById = (id: string) => products.find(p => p.id === id);

  const addProduct = (input: ProductInput): Product => {
    const makeSlug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const id = input.id ? makeSlug(input.id) : makeSlug(input.title) + "-" + Date.now();
    const newProduct: Product = {
      ...input,
      id,
      ownerId: user?.id,
      images: input.images && input.images.length ? input.images : [input.image]
    } as Product;
    setProducts(prev => [newProduct, ...prev]);
    toast({ title: "Product added", description: "Your product is now visible in listings." });
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    toast({ title: "Product updated" });
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({ title: "Product removed" });
  };

  const value = useMemo(
    () => ({ products, addProduct, updateProduct, removeProduct, findById }),
    [products]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = (): ProductContextType => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
};
