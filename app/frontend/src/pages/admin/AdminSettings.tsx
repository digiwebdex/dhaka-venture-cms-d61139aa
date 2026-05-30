import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { t } = useLang();
  const { settings, updateSettings } = useCms();
  const { toast } = useToast();
  const [form, setForm] = useState({ ...settings });

  const handleSave = () => { updateSettings(form); toast({ title: "Settings saved!" }); };

  const fields = [
    { key: "companyName", label: "Company Name (EN)" },
    { key: "companyNameBn", label: "Company Name (BN)" },
    { key: "slogan", label: "Slogan (EN)" },
    { key: "sloganBn", label: "Slogan (BN)" },
    { key: "address", label: "Address (EN)" },
    { key: "addressBn", label: "Address (BN)" },
    { key: "phone", label: "Phone" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "email", label: "Email" },
    { key: "facebook", label: "Facebook URL" },
    { key: "instagram", label: "Instagram URL" },
    { key: "youtube", label: "YouTube URL" },
  ] as const;

  return (
    <div className="max-w-3xl">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">{t.admin.settings}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="text-sm font-medium text-muted-foreground">{f.label}</label>
                <Input value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
          </div>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground font-semibold h-11 px-8">{t.admin.save}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
