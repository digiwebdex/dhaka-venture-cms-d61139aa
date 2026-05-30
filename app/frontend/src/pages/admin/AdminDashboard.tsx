import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Package, Globe, Clock } from "lucide-react";

const AdminDashboard = () => {
  const { t } = useLang();
  const { bookings, packages, visaRates } = useCms();
  const pending = bookings.filter((b) => b.status === "pending").length;

  const stats = [
    { icon: BookOpen, label: t.admin.totalBookings, value: bookings.length, color: "text-primary" },
    { icon: Clock, label: t.admin.pendingBookings, value: pending, color: "text-gold" },
    { icon: Package, label: t.admin.totalPackages, value: packages.length, color: "text-sky" },
    { icon: Globe, label: t.admin.manageVisa, value: visaRates.length, color: "text-success" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent bookings */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold text-lg mb-4">{t.admin.manageBookings}</h3>
          {bookings.length === 0 ? (
            <p className="text-muted-foreground">{t.booking.noBookings}</p>
          ) : (
            <div className="space-y-3">
              {bookings.slice(-5).reverse().map((b) => (
                <div key={b.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{b.name}</p>
                    <p className="text-sm text-muted-foreground">{b.service} - {b.destination}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    b.status === "confirmed" ? "bg-success/10 text-success" :
                    b.status === "cancelled" ? "bg-destructive/10 text-destructive" :
                    "bg-gold/10 text-gold"
                  }`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
