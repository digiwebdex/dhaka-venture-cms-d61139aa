import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel } from "lucide-react";
import BookingFormDialog from "@/components/BookingFormDialog";

const HotelBookingPage = () => {
  const { t, lang } = useLang();
  const { packages } = useCms();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedName, setSelectedName] = useState<string>("");

  const hotelPackages = packages.filter((p) => p.category === "hotel");

  const openBooking = (name: string) => {
    setSelectedName(name);
    setBookingOpen(true);
  };

  return (
    <div className="py-16">
      <div className="bg-navy-gradient text-primary-foreground py-16 -mt-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <Hotel className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.services.hotel.title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">{t.services.hotel.desc}</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {lang === "bn" ? "আমাদের হোটেল প্যাকেজ" : "Our Hotel Packages"}
          </h2>
          <p className="text-muted-foreground">
            {lang === "bn"
              ? "বিশ্বজুড়ে সেরা হোটেলে সাশ্রয়ী মূল্যে বুকিং করুন।"
              : "Book the best hotels worldwide at affordable prices."}
          </p>
        </div>

        {hotelPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {hotelPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={lang === "bn" ? pkg.titleBn : pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded mb-2">
                    {lang === "bn" ? "হোটেল" : "Hotel"}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{lang === "bn" ? pkg.titleBn : pkg.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {lang === "bn" ? pkg.destinationBn : pkg.destination} • {lang === "bn" ? pkg.durationBn : pkg.duration}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {lang === "bn" ? pkg.descriptionBn : pkg.description}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xl font-extrabold text-primary">
                      {lang === "bn" ? pkg.priceBn : pkg.price}
                    </span>
                    <div className="flex gap-2">
                      <Link to={`/packages/${pkg.id}`}>
                        <Button size="sm" variant="outline">{t.nav.viewDetails}</Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="gold"
                        onClick={() => openBooking(lang === "bn" ? pkg.titleBn : pkg.title)}
                      >
                        {t.nav.bookNow}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Card>
              <CardContent className="p-10">
                <p className="text-muted-foreground mb-6 text-lg">
                  {lang === "bn"
                    ? "হোটেল প্যাকেজ শীঘ্রই আসছে। কাস্টম বুকিংয়ের জন্য যোগাযোগ করুন।"
                    : "Hotel packages coming soon. Contact us for custom bookings."}
                </p>
                <Button size="lg" variant="gold" className="h-14 px-8" onClick={() => openBooking(lang === "bn" ? "হোটেল বুকিং" : "Hotel Booking")}>
                  {t.nav.bookNow}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-center">
          <Button size="lg" variant="gold" className="h-14 px-8" onClick={() => openBooking(lang === "bn" ? "কাস্টম হোটেল বুকিং" : "Custom Hotel Booking")}>
            {lang === "bn" ? "কাস্টম হোটেল বুকিং করুন" : "Request Custom Hotel Booking"}
          </Button>
        </div>
      </div>

      <BookingFormDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        packageName={selectedName || (lang === "bn" ? "হোটেল বুকিং" : "Hotel Booking")}
      />
    </div>
  );
};

export default HotelBookingPage;
