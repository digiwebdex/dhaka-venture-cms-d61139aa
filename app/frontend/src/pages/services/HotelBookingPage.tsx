import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel } from "lucide-react";
import BookingFormDialog from "@/components/BookingFormDialog";

const HotelBookingPage = () => {
  const { t, lang } = useLang();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="py-16">
      <div className="bg-navy-gradient text-primary-foreground py-16 -mt-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <Hotel className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.services.hotel.title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">{t.services.hotel.desc}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <Card>
          <CardContent className="p-10">
            <h2 className="text-2xl font-bold mb-4">
              {lang === "bn" ? "হোটেল বুকিং সেবা" : "Hotel Booking Service"}
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              {lang === "bn"
                ? "বিশ্বজুড়ে সেরা হোটেলে সাশ্রয়ী মূল্যে বুকিং করুন। আমরা আপনার জন্য সবচেয়ে ভালো ডিল খুঁজে দেব।"
                : "Book the best hotels worldwide at affordable prices. We will find the best deals for you."}
            </p>
            <Button size="lg" variant="gold" className="h-14 px-8" onClick={() => setBookingOpen(true)}>
              {t.nav.bookNow}
            </Button>
          </CardContent>
        </Card>
      </div>
      <BookingFormDialog open={bookingOpen} onOpenChange={setBookingOpen} packageName={lang === "bn" ? "হোটেল বুকিং" : "Hotel Booking"} />
    </div>
  );
};

export default HotelBookingPage;
