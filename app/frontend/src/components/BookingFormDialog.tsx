import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useWhatsAppLink } from "@/hooks/useWhatsAppLink";
import { useCms } from "@/contexts/CmsContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Send } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BookingFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName: string;
}

const BookingFormDialog = ({ open, onOpenChange, packageName }: BookingFormDialogProps) => {
  const { lang } = useLang();
  const { settings } = useCms();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState<Date>();
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [message, setMessage] = useState("");

  const isBn = lang === "bn";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dateStr = travelDate ? format(travelDate, "dd/MM/yyyy") : (isBn ? "নির্ধারিত হয়নি" : "Not specified");

    const text = isBn
      ? `📋 *নতুন বুকিং অনুরোধ*\n\n👤 নাম: ${fullName}\n📞 ফোন: ${phone}\n📦 প্যাকেজ: ${packageName}\n📅 যাত্রার তারিখ: ${dateStr}\n🧑 প্রাপ্তবয়স্ক: ${adults}\n👶 শিশু: ${children}${message ? `\n💬 বার্তা: ${message}` : ""}`
      : `📋 *New Booking Request*\n\n👤 Name: ${fullName}\n📞 Phone: ${phone}\n📦 Package: ${packageName}\n📅 Travel Date: ${dateStr}\n🧑 Adults: ${adults}\n👶 Children: ${children}${message ? `\n💬 Message: ${message}` : ""}`;

    const whatsappPhone = settings.whatsapp.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    // Reset
    setFullName("");
    setPhone("");
    setTravelDate(undefined);
    setAdults("1");
    setChildren("0");
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {isBn ? "বুকিং ফর্ম" : "Booking Form"}
          </DialogTitle>
          <DialogDescription>
            {isBn ? "আপনার তথ্য দিন এবং সাবমিট করুন" : "Fill in your details and submit"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Package Name (read-only) */}
          <div className="space-y-2">
            <Label>{isBn ? "প্যাকেজ" : "Package"}</Label>
            <Input value={packageName} readOnly className="bg-muted cursor-default" />
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label>{isBn ? "পুরো নাম" : "Full Name"} *</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isBn ? "আপনার নাম লিখুন" : "Enter your full name"}
              required
              maxLength={100}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>{isBn ? "ফোন / হোয়াটসঅ্যাপ নম্বর" : "Phone / WhatsApp Number"} *</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={isBn ? "আপনার নম্বর লিখুন" : "Enter your phone number"}
              required
              maxLength={20}
            />
          </div>

          {/* Travel Date */}
          <div className="space-y-2">
            <Label>{isBn ? "যাত্রার তারিখ" : "Travel Date"} *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !travelDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {travelDate ? format(travelDate, "PPP") : (isBn ? "তারিখ নির্বাচন করুন" : "Pick a date")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={travelDate}
                  onSelect={setTravelDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Adults & Children */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{isBn ? "প্রাপ্তবয়স্ক" : "Adults"} *</Label>
              <Input
                type="number"
                min="1"
                max="50"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>{isBn ? "শিশু" : "Children"}</Label>
              <Input
                type="number"
                min="0"
                max="50"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label>{isBn ? "বার্তা / বিশেষ অনুরোধ" : "Message / Special Request"}</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isBn ? "আপনার বিশেষ কোনো অনুরোধ থাকলে লিখুন" : "Any special request (optional)"}
              maxLength={500}
              rows={3}
            />
          </div>

          <Button type="submit" variant="gold" className="w-full">
            <Send className="w-4 h-4 mr-2" />
            {isBn ? "হোয়াটসঅ্যাপে পাঠান" : "Send via WhatsApp"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormDialog;
