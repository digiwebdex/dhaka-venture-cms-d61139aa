import { useState } from "react";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminUmrahOffer = () => {
  const { umrahOffer, updateUmrahOffer } = useCms();
  const { toast } = useToast();
  const [form, setForm] = useState({ ...umrahOffer });

  const handleSave = () => {
    updateUmrahOffer(form);
    toast({ title: "Umrah offer updated!" });
  };

  const updateFeature = (lang: "en" | "bn", index: number, value: string) => {
    if (lang === "en") {
      const updated = [...form.featuresEn];
      updated[index] = value;
      setForm({ ...form, featuresEn: updated });
    } else {
      const updated = [...form.featuresBn];
      updated[index] = value;
      setForm({ ...form, featuresBn: updated });
    }
  };

  const addFeature = () => {
    setForm({ ...form, featuresEn: [...form.featuresEn, ""], featuresBn: [...form.featuresBn, ""] });
  };

  const removeFeature = (index: number) => {
    setForm({
      ...form,
      featuresEn: form.featuresEn.filter((_, i) => i !== index),
      featuresBn: form.featuresBn.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="font-bold text-xl">Umrah Offer Section</h2>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Title (EN)</label>
              <Input value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Title (BN)</label>
              <Input value={form.titleBn} onChange={(e) => setForm({ ...form, titleBn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description (EN)</label>
              <Textarea value={form.descEn} onChange={(e) => setForm({ ...form, descEn: e.target.value })} rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description (BN)</label>
              <Textarea value={form.descBn} onChange={(e) => setForm({ ...form, descBn: e.target.value })} rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Price</label>
              <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Image URL</label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Features</h3>
            <Button size="sm" variant="outline" onClick={addFeature}>+ Add Feature</Button>
          </div>
          <div className="space-y-3">
            {form.featuresEn.map((_, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-end">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Feature {i + 1} (EN)</label>
                  <Input value={form.featuresEn[i]} onChange={(e) => updateFeature("en", i, e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Feature {i + 1} (BN)</label>
                  <Input value={form.featuresBn[i] || ""} onChange={(e) => updateFeature("bn", i, e.target.value)} />
                </div>
                <Button size="sm" variant="destructive" onClick={() => removeFeature(i)}>✕</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="bg-primary text-primary-foreground font-semibold h-11 px-8">
        Save Changes
      </Button>
    </div>
  );
};

export default AdminUmrahOffer;
