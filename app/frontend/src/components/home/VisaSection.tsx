import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const VisaSection = () => {
  const { t, lang } = useLang();
  const { visaRates } = useCms();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            <FileCheck className="w-4 h-4 inline mr-1" />
            {lang === "bn" ? "ভিসা প্রসেসিং" : "Visa Processing"}
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            {t.visa.title}
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg">{t.visa.subtitle}</motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
          className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-border/50 shadow-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-navy-gradient">
                  <TableHead className="text-primary-foreground font-bold text-sm">{t.visa.country}</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-sm">{t.visa.type}</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-sm text-right">{t.visa.rate}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visaRates.map((visa, i) => (
                  <TableRow key={visa.id} className={`${i % 2 === 0 ? "bg-card" : "bg-muted/30"} hover:bg-gold/5 transition-colors`}>
                    <TableCell className="font-medium">{lang === "bn" ? visa.countryBn : visa.country}</TableCell>
                    <TableCell className="text-muted-foreground">{lang === "bn" ? visa.typeBn : visa.type}</TableCell>
                    <TableCell className="text-right font-bold text-gold">{lang === "bn" ? visa.rateBn : visa.rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/services/visa-processing">
            <Button className="bg-navy-gradient text-primary-foreground hover:opacity-90 font-semibold rounded-full px-8">
              {lang === "bn" ? "বিস্তারিত জানুন" : "Learn More"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VisaSection;
