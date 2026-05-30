import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";

const FlightOfferSection = () => {
  const { t, lang } = useLang();
  const { flightRoutes } = useCms();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            <Plane className="w-4 h-4 inline mr-1" />
            {lang === "bn" ? "এয়ার টিকেট" : "Air Tickets"}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3">
            {t.offers.flyTitle}
          </h2>
          <p className="text-xl text-muted-foreground">{t.offers.flySubtitle}</p>
          <div className="inline-block mt-4 bg-destructive text-destructive-foreground px-5 py-1.5 rounded-full text-sm font-bold">
            {t.offers.limitedTime}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {flightRoutes.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border/50 rounded-2xl p-5 hover:border-gold/30 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">{lang === "bn" ? route.fromBn : route.from}</span>
                <Plane className="w-4 h-4 text-gold rotate-45" />
                <span className="text-sm font-medium text-foreground">{lang === "bn" ? route.toBn : route.to}</span>
              </div>
              <div className="border-t border-dashed border-border/50 my-3" />
              <p className="text-sm text-muted-foreground mb-1">{lang === "bn" ? "শুরু হচ্ছে" : "Starting from"}</p>
              <p className="text-xl font-extrabold text-gold">{lang === "bn" ? route.priceBn : route.price}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/services/air-ticket">
            <Button size="lg" className="bg-navy-gradient text-primary-foreground hover:opacity-90 font-bold h-13 px-8 rounded-full">
              {lang === "bn" ? "সকল ফ্লাইট দেখুন" : "View All Flights"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlightOfferSection;
