import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck } from "lucide-react";
import BookingFormDialog from "@/components/BookingFormDialog";

const VisaProcessingPage = () => {
  const { t, lang } = useLang();
  const { packages } = useCms();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");

  const visaPackages = packages.filter((p) => p.category === "visa");

  const openBooking = (name: string) => {
    setSelectedPkg(name);
    setBookingOpen(true);
  };

  return (
    <div className="py-16">
      <div className="bg-navy-gradient text-primary-foreground py-16 -mt-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <FileCheck className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.visa.title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">{t.visa.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {visaPackages.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {lang === "bn" ? "আমাদের ভিসা প্যাকেজ" : "Our Visa Packages"}
              </h2>
              <p className="text-muted-foreground">
                {lang === "bn"
                  ? "সম্পূর্ণ ডকুমেন্ট সাপোর্ট সহ দ্রুত ভিসা প্রসেসিং সেবা।"
                  : "Fast visa processing service with complete document support."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visaPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-all group flex flex-col">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={lang === "bn" ? pkg.titleBn : pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded mb-2 w-fit">
                      {lang === "bn" ? "ভিসা" : "Visa"}
                    </div>
                    <h3 className="font-bold text-base mb-1">{lang === "bn" ? pkg.titleBn : pkg.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {lang === "bn" ? pkg.destinationBn : pkg.destination} • {lang === "bn" ? pkg.durationBn : pkg.duration}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                      {lang === "bn" ? pkg.descriptionBn : pkg.description}
                    </p>
                    <div className="flex items-center justify-between gap-2 mt-auto">
                      <span className="text-lg font-extrabold text-primary">
                        {lang === "bn" ? pkg.priceBn : pkg.price}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Link to={`/packages/${pkg.id}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">{t.nav.viewDetails}</Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="gold"
                        className="flex-1"
                        onClick={() => openBooking(lang === "bn" ? pkg.titleBn : pkg.title)}
                      >
                        {t.nav.bookNow}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>

      <BookingFormDialog open={bookingOpen} onOpenChange={setBookingOpen} packageName={selectedPkg} />
    </div>
  );
};

export default VisaProcessingPage;
