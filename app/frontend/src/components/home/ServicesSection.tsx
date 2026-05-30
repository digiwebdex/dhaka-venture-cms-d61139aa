import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, MapPin, Plane, Hotel, ArrowRight } from "lucide-react";
import { images } from "@/assets/images";

const iconMap: Record<string, React.FC<{ className?: string }>> = { Star, MapPin, Plane, Hotel };
const imageMap: Record<string, string> = { "/services/hajj-umrah": images.kaaba, "/services/tour-packages": images.beach, "/services/air-ticket": images.airplane, "/services/hotel-booking": images.hotel };
const gradientMap: Record<string, string> = { Star: "from-gold/20 to-gold/5", MapPin: "from-sky/20 to-sky/5", Plane: "from-primary/20 to-primary/5", Hotel: "from-success/20 to-success/5" };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const } }),
};

const ServicesSection = () => {
  const { t, lang } = useLang();
  const { services } = useCms();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            {lang === "bn" ? "আমাদের সেবাসমূহ" : "Our Services"}
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            {t.services.title}
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const IconComp = iconMap[service.icon] || Star;
            const img = service.image || imageMap[service.link] || images.kaaba;
            const gradient = gradientMap[service.icon] || "from-gold/20 to-gold/5";
            return (
              <motion.div key={service.id} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <Link to={service.link}>
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-border/50 group bg-card">
                    <div className="h-48 overflow-hidden relative">
                      <img src={img} alt={lang === "bn" ? service.titleBn : service.titleEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                      <div className={`absolute bottom-3 left-3 w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} backdrop-blur-sm border border-border/30 flex items-center justify-center`}>
                        <IconComp className="w-6 h-6 text-gold" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-gold transition-colors">
                        {lang === "bn" ? service.titleBn : service.titleEn}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {lang === "bn" ? service.descBn : service.descEn}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-semibold text-gold gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {lang === "bn" ? "বিস্তারিত দেখুন" : "Learn More"} <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
