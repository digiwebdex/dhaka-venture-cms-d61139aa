import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Booking } from "@/data/defaultData";

const BookingPage = () => {
  const { t, lang } = useLang();
  const { bookings, addBooking } = useCms();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", destination: "", travelers: "1", travelDate: "", notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking: Booking = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      destination: form.destination,
      travelers: parseInt(form.travelers),
      travelDate: form.travelDate,
      notes: form.notes,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    toast({ title: lang === "bn" ? "বুকিং জমা হয়েছে!" : "Booking submitted!", description: lang === "bn" ? "আমরা শীঘ্রই যোগাযোগ করব" : "We will contact you soon" });
    setForm({ name: "", email: "", phone: "", service: "", destination: "", travelers: "1", travelDate: "", notes: "" });
  };

  const statusColor = (s: string) => {
    if (s === "confirmed") return "bg-success text-success-foreground";
    if (s === "cancelled") return "bg-destructive text-destructive-foreground";
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">{t.booking.title}</h1>

        <Tabs defaultValue="booking">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="booking" className="flex-1">{t.booking.title}</TabsTrigger>
            <TabsTrigger value="inquiries" className="flex-1">{t.booking.myInquiries}</TabsTrigger>
          </TabsList>

          <TabsContent value="booking">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input placeholder={t.contact.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <Input type="email" placeholder={t.contact.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    <Input placeholder={t.contact.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                    <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                      <SelectTrigger><SelectValue placeholder={t.booking.service} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hajj-umrah">{t.nav.hajjUmrah}</SelectItem>
                        <SelectItem value="tour">{t.nav.tourPackages}</SelectItem>
                        <SelectItem value="air-ticket">{t.nav.airTicket}</SelectItem>
                        <SelectItem value="hotel">{t.nav.hotelBooking}</SelectItem>
                        <SelectItem value="visa">{t.nav.visaProcessing}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder={t.booking.destination} value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
                    <Input type="number" min="1" placeholder={t.booking.travelers} value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })} />
                    <Input type="date" placeholder={t.booking.travelDate} value={form.travelDate} onChange={(e) => setForm({ ...form, travelDate: e.target.value })} />
                  </div>
                  <Textarea placeholder={t.booking.notes} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} />
                  <Button type="submit" variant="gold" className="w-full h-12 text-lg">
                    {t.booking.submitBooking}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            {bookings.length === 0 ? (
              <Card><CardContent className="p-10 text-center text-muted-foreground">{t.booking.noBookings}</CardContent></Card>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <Card key={b.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{b.service} - {b.destination}</p>
                          <p className="text-sm text-muted-foreground">{b.name} • {b.travelDate} • {b.travelers} {lang === "bn" ? "জন" : "travelers"}</p>
                        </div>
                        <Badge className={statusColor(b.status)}>
                          {b.status === "pending" ? t.booking.pending : b.status === "confirmed" ? t.booking.confirmed : t.booking.cancelled}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookingPage;
