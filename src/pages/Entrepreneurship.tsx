
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

const Entrepreneurship = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <HeroSection
        title={translate("Women Entrepreneurs Showcase", "महिला उद्यमी शोकेस")}
        subtitle={translate(
          "Discover amazing businesses started by rural women entrepreneurs",
          "ग्रामीण महिला उद्यमियों द्वारा शुरू किए गए अद्भुत व्यवसायों की खोज करें"
        )}
      />
      
      <section className="py-12 saheli-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            id="handloom-sarees"
            image="https://i.pinimg.com/474x/04/66/56/0466566606dcccfc9fdeb69b5ae81d0b.jpg"
            title="Handloom Sarees"
            titleHi="हथकरघा साड़ियां"
            producer="Lakshmi's Weaves"
            producerHi="लक्ष्मी की बुनाई"
            description="Traditional handwoven sarees made by skilled artisans"
            descriptionHi="कुशल कारीगरों द्वारा बनाई गई पारंपरिक हथकरघा साड़ियां"
            priceRange="₹2,500 - ₹15,000"
            delay={0}
          />
          
          <ProductCard
            id="organic-spices"
            image="https://i.pinimg.com/736x/d8/c8/19/d8c8195f1f852b3678a8bba9cbc6bc27.jpg"
            title="Organic Spices"
            titleHi="जैविक मसाले"
            producer="Rural Women's Collective"
            producerHi="ग्रामीण महिला संघ"
            description="Pure and authentic spices sourced directly from farmers"
            descriptionHi="किसानों से सीधे प्राप्त शुद्ध और प्रामाणिक मसाले"
            priceRange="₹200 - ₹1,000"
            delay={100}
          />
          
          <ProductCard
            id="handicraft-items"
            image="https://i.pinimg.com/736x/62/20/05/6220056f6df161427c1addc196afabc2.jpg"
            title="Handicraft Items"
            titleHi="हस्तशिल्प वस्तुएं"
            producer="Artisan Circle"
            producerHi="कारीगर मंडल"
            description="Handmade decorative items and home accessories"
            descriptionHi="हस्तनिर्मित सजावटी वस्तुएं और घरेलू सामान"
            priceRange="₹500 - ₹5,000"
            delay={200}
          />
          
          <ProductCard
            id="organic-beauty"
            image="https://i.pinimg.com/736x/98/00/ef/9800ef9ba075dc5b21d3818a0323ff77.jpg"
            title="Organic Beauty Products"
            titleHi="जैविक सौंदर्य उत्पाद"
            producer="Nature's Touch"
            producerHi="प्रकृति का स्पर्श"
            description="Natural skincare products made from traditional recipes"
            descriptionHi="पारंपरिक व्यंजनों से बने प्राकृतिक स्किनकेयर उत्पाद"
            priceRange="₹150 - ₹1,200"
            delay={300}
          />
        </div>
      </section>
      
      <section className="py-16 bg-saheli-deep/50">
        <div className="saheli-container">
          <div className="text-center mb-12">
            <h2 className="saheli-section-title">
              {translate("Success Stories", "सफलता की कहानियां")}
            </h2>
            <p className="saheli-section-subtitle">
              {translate(
                "Stories of women who transformed their lives through entrepreneurship",
                "ऐसी महिलाओं की कहानियां जिन्होंने उद्यमिता के माध्यम से अपना जीवन बदला"
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="saheli-card animate-scale-in">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-saheli-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-saheli-purple text-xl font-bold">R</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {translate("Rekha's Spice Business", "रेखा का मसाला व्यवसाय")}
                  </h3>
                  <p className="text-white/70 mb-4">
                    {translate(
                      `"Starting my own spice business allowed me to support my family and send my daughters to college. The government schemes and Saheli's guidance helped me expand from a small home operation to a collective that now employs 15 women from my village."`,
                      `"अपना खुद का मसाला व्यवसाय शुरू करने से मुझे अपने परिवार का समर्थन करने और अपनी बेटियों को कॉलेज भेजने की अनुमति मिली। सरकारी योजनाओं और साहेली के मार्गदर्शन ने मुझे एक छोटे घरेलू संचालन से एक सामूहिक संगठन तक विस्तार करने में मदद की, जो अब मेरे गांव की 15 महिलाओं को रोजगार देता है।"`
                    )}
                  </p>
                  <p className="text-saheli-purple font-medium">
                    {translate(
                      "Rekha Devi, Founder of Rural Spice Collective",
                      "रेखा देवी, ग्रामीण मसाला सामूहिक की संस्थापक"
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="saheli-card animate-scale-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-saheli-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-saheli-purple text-xl font-bold">S</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {translate("Sunita's Handloom Journey", "सुनीता की हथकरघा यात्रा")}
                  </h3>
                  <p className="text-white/70 mb-4">
                    {translate(
                      `"I learned weaving from my mother, but never thought it could be a profitable business. With a small loan from Mahila Udyam Nidhi and digital marketing skills from Saheli workshops, my handloom products now reach customers across the country."`,
                      `"मैंने अपनी मां से बुनाई सीखी, लेकिन कभी नहीं सोचा था कि यह एक लाभदायक व्यवसाय हो सकता है। महिला उद्यम निधि से एक छोटे ऋण और साहेली कार्यशालाओं से डिजिटल मार्केटिंग कौशल के साथ, मेरे हथकरघा उत्पाद अब पूरे देश के ग्राहकों तक पहुंचते हैं।"`
                    )}
                  </p>
                  <p className="text-saheli-purple font-medium">
                    {translate(
                      "Sunita Sharma, Owner of Heritage Handlooms",
                      "सुनीता शर्मा, हेरिटेज हैंडलूम्स की मालिक"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Entrepreneurship;
