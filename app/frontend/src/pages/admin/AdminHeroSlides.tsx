import { useState } from "react";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { HeroSlide } from "@/data/defaultData";
import { Trash2, Plus, GripVertical } from "lucide-react";

const AdminHeroSlides = () => {
  const { heroSlides, updateHeroSlides, addHeroSlide, deleteHeroSlide } = useCms();
  const { toast } = useToast();
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const emptySlide: HeroSlide = {
    id: "", image: "", titleEn: "", titleBn: "", highlightEn: "", highlightBn: "",
    subtitleEn: "", subtitleBn: "", link: "", badgeEn: "", badgeBn: "",
    cta1En: "", cta1Bn: "", cta2En: "", cta2Bn: "",
  };

  const [form, setForm] = useState<HeroSlide>(emptySlide);

  const handleEdit = (slide: HeroSlide) => { setEditing(slide); setForm({ ...slide }); setShowAdd(false); };
  const handleAdd = () => { setForm({ ...emptySlide, id: Date.now().toString() }); setShowAdd(true); setEditing(null); };

  const handleSave = () => {
    if (showAdd) {
      addHeroSlide(form);
      toast({ title: "Slide added!" });
      setShowAdd(false);
    } else if (editing) {
      updateHeroSlides(heroSlides.map((s) => (s.id === form.id ? form : s)));
      toast({ title: "Slide updated!" });
      setEditing(null);
    }
  };

  const handleDelete = (id: string) => { deleteHeroSlide(id); toast({ title: "Slide deleted!" }); };

  const f = (key: keyof HeroSlide, label: string) => (
    <div key={key}>
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <Input value={form[key] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
    </div>
  );

  const renderForm = () => (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-bold">{showAdd ? "Add Slide" : "Edit Slide"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {f("titleEn", "Title (EN)")}
          {f("titleBn", "Title (BN)")}
          {f("highlightEn", "Highlight Text (EN)")}
          {f("highlightBn", "Highlight Text (BN)")}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-muted-foreground">Subtitle (EN)</label>
            <Textarea value={form.subtitleEn} onChange={(e) => setForm({ ...form, subtitleEn: e.target.value })} rows={2} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-muted-foreground">Subtitle (BN)</label>
            <Textarea value={form.subtitleBn} onChange={(e) => setForm({ ...form, subtitleBn: e.target.value })} rows={2} />
          </div>
          {f("image", "Image URL")}
          {f("link", "Link URL")}
          {f("badgeEn", "Badge (EN)")}
          {f("badgeBn", "Badge (BN)")}
          {f("cta1En", "Button 1 (EN)")}
          {f("cta1Bn", "Button 1 (BN)")}
          {f("cta2En", "Button 2 (EN)")}
          {f("cta2Bn", "Button 2 (BN)")}
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} className="bg-primary text-primary-foreground">Save</Button>
          <Button variant="outline" onClick={() => { setEditing(null); setShowAdd(false); }}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Hero Slides Management</h2>
        <Button onClick={handleAdd} className="gap-2"><Plus className="w-4 h-4" />Add Slide</Button>
      </div>

      {(showAdd || editing) && renderForm()}

      <div className="space-y-3">
        {heroSlides.map((slide, i) => (
          <Card key={slide.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground font-bold text-lg w-8">{i + 1}</span>
                {slide.image && <img src={slide.image} alt="" className="w-20 h-14 object-cover rounded" />}
                <div>
                  <p className="font-semibold">{slide.titleEn}</p>
                  <p className="text-sm text-muted-foreground">{slide.titleBn}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(slide)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(slide.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminHeroSlides;
