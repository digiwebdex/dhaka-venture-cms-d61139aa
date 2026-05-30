import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileCheck } from "lucide-react";
import BookingFormDialog from "@/components/BookingFormDialog";

const VisaProcessingPage = () => {
  const { t, lang } = useLang();
  const { visaRates } = useCms();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");

  return (
    <div className="py-16">
      <div className="bg-navy-gradient text-primary-foreground py-16 -mt-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <FileCheck className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.visa.title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">{t.visa.subtitle}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary">
                <TableHead className="text-primary-foreground font-bold">{t.visa.country}</TableHead>
                <TableHead className="text-primary-foreground font-bold">{t.visa.type}</TableHead>
                <TableHead className="text-primary-foreground font-bold text-right">{t.visa.rate}</TableHead>
                <TableHead className="text-primary-foreground font-bold text-center">{t.nav.bookNow}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visaRates.map((visa, i) => (
                <TableRow key={visa.id} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                  <TableCell className="font-medium">{lang === "bn" ? visa.countryBn : visa.country}</TableCell>
                  <TableCell>{lang === "bn" ? visa.typeBn : visa.type}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">{lang === "bn" ? visa.rateBn : visa.rate}</TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" variant="gold" onClick={() => { setSelectedPkg(`Visa - ${lang === "bn" ? visa.countryBn : visa.country}`); setBookingOpen(true); }}>
                      {t.nav.bookNow}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      <BookingFormDialog open={bookingOpen} onOpenChange={setBookingOpen} packageName={selectedPkg} />
    </div>
  );
};

export default VisaProcessingPage;
