import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plane } from "lucide-react";
import { images } from "@/assets/images";
import BookingFormDialog from "@/components/BookingFormDialog";

const AirTicketPage = () => {
  const { t, lang } = useLang();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");

  const destinations = [
    { name: "Dubai", nameBn: "দুবাই", img: images.dubai },
    { name: "Malaysia", nameBn: "মালয়েশিয়া", img: images.malaysia },
    { name: "Saudi Arabia", nameBn: "সৌদি আরব", img: images.kaaba },
    { name: "India", nameBn: "ভারত", img: images.india },
    { name: "Thailand", nameBn: "থাইল্যান্ড", img: images.thailand },
    { name: "Singapore", nameBn: "সিঙ্গাপুর", img: images.singapore },
  ];

  return (
    <div className="py-16">
      <div className="bg-navy-gradient text-primary-foreground py-16 -mt-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <Plane className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.services.air.title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">{t.services.air.desc}</p>
          <div className="mt-6 inline-block bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-semibold">
            {t.offers.limitedTime}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <Card key={i} className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-40 overflow-hidden">
                <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              </div>
              <CardContent className="p-5 text-center">
                <h3 className="font-bold text-lg mb-3">{lang === "bn" ? dest.nameBn : dest.name}</h3>
                <Button variant="gold" onClick={() => { setSelectedPkg(`Air Ticket - ${lang === "bn" ? dest.nameBn : dest.name}`); setBookingOpen(true); }}>
                  {t.nav.bookNow}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <BookingFormDialog open={bookingOpen} onOpenChange={setBookingOpen} packageName={selectedPkg} />
    </div>
  );
};

export default AirTicketPage;
