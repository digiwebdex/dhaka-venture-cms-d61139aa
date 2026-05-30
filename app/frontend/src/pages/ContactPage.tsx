import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { t, lang } = useLang();
  const { settings } = useCms();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: lang === "bn" ? "মেসেজ পাঠানো হয়েছে!" : "Message sent!", description: lang === "bn" ? "আমরা শীঘ্রই যোগাযোগ করব" : "We will contact you soon" });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">{t.contact.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: MapPin, label: t.contact.address, value: lang === "bn" ? settings.addressBn : settings.address },
              { icon: Phone, label: t.contact.phone, value: settings.phone, href: `tel:${settings.phone}` },
              { icon: MessageCircle, label: t.contact.whatsapp, value: settings.whatsapp, href: `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}` },
              { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} className="font-semibold text-foreground hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <p className="font-semibold text-foreground">{item.value}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-bold text-xl mb-4">{t.contact.sendMessage}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder={t.contact.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input type="email" placeholder={t.contact.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <Input placeholder={t.contact.subject} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                <Textarea placeholder={t.contact.message} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} />
                <Button type="submit" className="w-full bg-gold-gradient text-secondary-foreground hover:opacity-90 font-semibold h-12">
                  {t.contact.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
