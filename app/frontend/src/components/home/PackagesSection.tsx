import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const PackagesSection = () => {
  const { t, lang } = useLang();
  const { packages } = useCms();
  const featuredPackages = packages.filter((p) => p.featured);

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            {lang === "bn" ? "আমাদের প্যাকেজ" : "Our Packages"}
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            {t.offers.tourTitle}
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {lang === "bn"
              ? "আপনার বাজেট এবং পছন্দ অনুযায়ী আমাদের যত্নসহকারে তৈরি প্যাকেজ থেকে বেছে নিন।"
              : "Choose from our carefully crafted packages according to your budget and preference."}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.slice(0, 6).map((pkg, i) => (
            <motion.div key={pkg.id} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-border/50 h-full flex flex-col">
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={pkg.image}
                    alt={lang === "bn" ? pkg.titleBn : pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-gold/90 text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {pkg.category}
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/80 backdrop-blur-sm text-foreground text-xs font-semibold px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    4.99
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-gold transition-colors">
                    {lang === "bn" ? pkg.titleBn : pkg.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      {lang === "bn" ? pkg.destinationBn : pkg.destination}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      {lang === "bn" ? pkg.durationBn : pkg.duration}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {lang === "bn" ? pkg.descriptionBn : pkg.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground">{lang === "bn" ? "মূল্য" : "Price"}</p>
                      <span className="text-xl font-extrabold text-gold">{lang === "bn" ? pkg.priceBn : pkg.price}</span>
                    </div>
                    <Link to={`/packages/${pkg.id}`}>
                      <Button size="sm" variant="gold" className="rounded-full px-5">
                        {t.nav.viewDetails}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/packages">
            <Button variant="outline" size="lg" className="font-semibold rounded-full px-8 border-border hover:border-gold hover:text-gold transition-colors">
              {lang === "bn" ? "সকল প্যাকেজ দেখুন" : "View All Packages"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        
      </div>
    </section>
  );
};

export default PackagesSection;
