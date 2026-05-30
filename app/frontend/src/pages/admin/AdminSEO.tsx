import { useState } from "react";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminSEO = () => {
  const { seoSettings, updateSeoSettings } = useCms();
  const { toast } = useToast();
  const [form, setForm] = useState({ ...seoSettings });

  const handleSave = () => {
    updateSeoSettings(form);
    toast({ title: "SEO settings saved!" });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Meta Tags</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Meta Title (EN)</label>
              <Input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Meta Title (BN)</label>
              <Input value={form.metaTitleBn} onChange={(e) => setForm({ ...form, metaTitleBn: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Meta Description (EN)</label>
              <Textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} rows={3} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Meta Description (BN)</label>
              <Textarea value={form.metaDescriptionBn} onChange={(e) => setForm({ ...form, metaDescriptionBn: e.target.value })} rows={3} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Open Graph & Social</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">OG Image URL</label>
              <Input value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Canonical URL</label>
              <Input value={form.canonicalUrl} onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Keywords</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Keywords (EN, comma separated)</label>
              <Textarea value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} rows={2} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Keywords (BN)</label>
              <Textarea value={form.keywordsBn} onChange={(e) => setForm({ ...form, keywordsBn: e.target.value })} rows={2} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Analytics & Tracking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Google Analytics ID</label>
              <Input value={form.googleAnalyticsId} onChange={(e) => setForm({ ...form, googleAnalyticsId: e.target.value })} placeholder="G-XXXXXXXXXX" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Facebook Pixel ID</label>
              <Input value={form.facebookPixelId} onChange={(e) => setForm({ ...form, facebookPixelId: e.target.value })} placeholder="XXXXXXXXXXXXXXX" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="bg-primary text-primary-foreground font-semibold h-11 px-8">
        Save SEO Settings
      </Button>
    </div>
  );
};

export default AdminSEO;
