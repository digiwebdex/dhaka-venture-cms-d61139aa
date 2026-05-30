import { useState } from "react";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminFooter = () => {
  const { footerContent, updateFooterContent, contactCta, updateContactCta } = useCms();
  const { toast } = useToast();
  const [footerForm, setFooterForm] = useState({ ...footerContent });
  const [ctaForm, setCtaForm] = useState({ ...contactCta });

  const handleSaveFooter = () => { updateFooterContent(footerForm); toast({ title: "Footer content saved!" }); };
  const handleSaveCta = () => { updateContactCta(ctaForm); toast({ title: "Contact CTA saved!" }); };

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Footer Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description (EN)</label>
              <Textarea value={footerForm.descriptionEn} onChange={(e) => setFooterForm({ ...footerForm, descriptionEn: e.target.value })} rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description (BN)</label>
              <Textarea value={footerForm.descriptionBn} onChange={(e) => setFooterForm({ ...footerForm, descriptionBn: e.target.value })} rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Copyright Text (EN)</label>
              <Input value={footerForm.copyrightEn} onChange={(e) => setFooterForm({ ...footerForm, copyrightEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Copyright Text (BN)</label>
              <Input value={footerForm.copyrightBn} onChange={(e) => setFooterForm({ ...footerForm, copyrightBn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Developer Name</label>
              <Input value={footerForm.developerName} onChange={(e) => setFooterForm({ ...footerForm, developerName: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Developer URL</label>
              <Input value={footerForm.developerUrl} onChange={(e) => setFooterForm({ ...footerForm, developerUrl: e.target.value })} />
            </div>
          </div>
          <Button onClick={handleSaveFooter} className="bg-primary text-primary-foreground font-semibold h-11 px-8">Save Footer</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Contact CTA Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Badge (EN)</label>
              <Input value={ctaForm.badgeEn} onChange={(e) => setCtaForm({ ...ctaForm, badgeEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Badge (BN)</label>
              <Input value={ctaForm.badgeBn} onChange={(e) => setCtaForm({ ...ctaForm, badgeBn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Title (EN)</label>
              <Input value={ctaForm.titleEn} onChange={(e) => setCtaForm({ ...ctaForm, titleEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Title (BN)</label>
              <Input value={ctaForm.titleBn} onChange={(e) => setCtaForm({ ...ctaForm, titleBn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Subtitle (EN)</label>
              <Input value={ctaForm.subtitleEn} onChange={(e) => setCtaForm({ ...ctaForm, subtitleEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Subtitle (BN)</label>
              <Input value={ctaForm.subtitleBn} onChange={(e) => setCtaForm({ ...ctaForm, subtitleBn: e.target.value })} />
            </div>
          </div>
          <Button onClick={handleSaveCta} className="bg-primary text-primary-foreground font-semibold h-11 px-8">Save CTA</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFooter;
