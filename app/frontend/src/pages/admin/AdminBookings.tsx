import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

const AdminBookings = () => {
  const { t, lang } = useLang();
  const { bookings, updateBooking, deleteBooking } = useCms();

  return (
    <div>
      <h2 className="font-bold text-xl mb-4">{t.admin.manageBookings}</h2>
      {bookings.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground">{t.booking.noBookings}</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <Card key={b.id}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{b.name}</p>
                    <p className="text-sm text-muted-foreground">{b.email} • {b.phone}</p>
                    <p className="text-sm mt-1"><strong>{lang === "bn" ? "সেবা" : "Service"}:</strong> {b.service} | <strong>{lang === "bn" ? "গন্তব্য" : "Dest"}:</strong> {b.destination}</p>
                    <p className="text-sm"><strong>{lang === "bn" ? "তারিখ" : "Date"}:</strong> {b.travelDate} | <strong>{lang === "bn" ? "যাত্রী" : "Travelers"}:</strong> {b.travelers}</p>
                    {b.notes && <p className="text-sm text-muted-foreground mt-1">{b.notes}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{new Date(b.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={b.status} onValueChange={(v: "pending" | "confirmed" | "cancelled") => updateBooking(b.id, { status: v })}>
                      <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">{t.booking.pending}</SelectItem>
                        <SelectItem value="confirmed">{t.booking.confirmed}</SelectItem>
                        <SelectItem value="cancelled">{t.booking.cancelled}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="destructive" onClick={() => deleteBooking(b.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
