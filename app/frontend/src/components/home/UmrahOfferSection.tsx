import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const UmrahOfferSection = () => {
  const { lang } = useLang();
  const { umrahOffer } = useCms();

  return (
    <section className="py-20 bg-navy-gradient relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-gold/5 blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-sky/5 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border-2 border-gold/20 shadow-2xl">
              <img src={umrahOffer.image} alt="Umrah" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gold-gradient rounded-2xl px-6 py-4 shadow-xl">
              <p className="font-bold text-sm">{lang === "bn" ? "শুরু হচ্ছে মাত্র" : "Starting From"}</p>
              <p className="font-extrabold text-2xl">{umrahOffer.price}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest">
              {lang === "bn" ? "বিশেষ অফার" : "Special Offer"}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
              {lang === "bn" ? umrahOffer.titleBn : umrahOffer.titleEn}
            </h2>
            <p className="text-primary-foreground/60 text-lg">
              {lang === "bn" ? umrahOffer.descBn : umrahOffer.descEn}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {(lang === "bn" ? umrahOffer.featuresBn : umrahOffer.featuresEn).map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-primary-foreground/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Link to="/services/hajj-umrah">
              <Button size="lg" variant="gold" className="font-bold text-base px-8 h-13 rounded-full shadow-xl shadow-gold/20 mt-2">
                {lang === "bn" ? "বিস্তারিত দেখুন" : "View Details"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UmrahOfferSection;
