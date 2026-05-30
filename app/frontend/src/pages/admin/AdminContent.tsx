import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminContent = () => {
  const { t } = useLang();
  const { pageContent, updatePageContent } = useCms();
  const { toast } = useToast();
  const [form, setForm] = useState({ ...pageContent });

  const handleSave = () => {
    updatePageContent(form);
    toast({ title: "Content saved!" });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Hero Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Hero Title (EN)</label>
              <Input value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Hero Title (BN)</label>
              <Input value={form.heroTitleBn} onChange={(e) => setForm({ ...form, heroTitleBn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Hero Subtitle (EN)</label>
              <Input value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Hero Subtitle (BN)</label>
              <Input value={form.heroSubtitleBn} onChange={(e) => setForm({ ...form, heroSubtitleBn: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">About Page</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-muted-foreground">About (EN)</label>
              <Textarea value={form.aboutText} onChange={(e) => setForm({ ...form, aboutText: e.target.value })} rows={4} /></div>
            <div><label className="text-sm font-medium text-muted-foreground">About (BN)</label>
              <Textarea value={form.aboutTextBn} onChange={(e) => setForm({ ...form, aboutTextBn: e.target.value })} rows={4} /></div>
            <div><label className="text-sm font-medium text-muted-foreground">Mission (EN)</label>
              <Textarea value={form.missionText} onChange={(e) => setForm({ ...form, missionText: e.target.value })} rows={3} /></div>
            <div><label className="text-sm font-medium text-muted-foreground">Mission (BN)</label>
              <Textarea value={form.missionTextBn} onChange={(e) => setForm({ ...form, missionTextBn: e.target.value })} rows={3} /></div>
            <div><label className="text-sm font-medium text-muted-foreground">Vision (EN)</label>
              <Textarea value={form.visionText} onChange={(e) => setForm({ ...form, visionText: e.target.value })} rows={3} /></div>
            <div><label className="text-sm font-medium text-muted-foreground">Vision (BN)</label>
              <Textarea value={form.visionTextBn} onChange={(e) => setForm({ ...form, visionTextBn: e.target.value })} rows={3} /></div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="bg-primary text-primary-foreground font-semibold h-11 px-8">
        {t.admin.save}
      </Button>
    </div>
  );
};

export default AdminContent;
