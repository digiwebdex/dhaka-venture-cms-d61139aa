import { useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Package } from "@/data/defaultData";
import { Trash2, Plus, X, Upload, Loader2, GripVertical } from "lucide-react";
import { apiUpload, getAdminToken } from "@/lib/api";

const AdminPackages = () => {
  const { t } = useLang();
  const { packages, updatePackages, addPackage, deletePackage } = useCms();
  const { toast } = useToast();
  const [editing, setEditing] = useState<Package | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const emptyPkg: Package = {
    id: "", title: "", titleBn: "", destination: "", destinationBn: "",
    duration: "", durationBn: "", price: "", priceBn: "",
    description: "", descriptionBn: "", image: "", featured: false, category: "tour",
    time: "", timeBn: "", transport: "", transportBn: "", hotel: "", hotelBn: "",
    food: "", foodBn: "", sightSeen: "", sightSeenBn: "", others: "", othersBn: "",
    tourDetails: "", tourDetailsBn: "", gallery: [], videos: [],
  };

  const [form, setForm] = useState<Package>(emptyPkg);
  const [galleryInput, setGalleryInput] = useState("");
  const [videoInput, setVideoInput] = useState("");
  const [uploading, setUploading] = useState<"main" | "gallery" | null>(null);
  const mainFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: File[], target: "main" | "gallery") => {
    if (!files.length) return;
    if (!getAdminToken()) {
      toast({ title: "লগইন দরকার", description: "আবার লগআউট করে VPS পাসওয়ার্ড দিয়ে লগইন করুন।", variant: "destructive" });
      return;
    }
    setUploading(target);
    try {
      if (target === "main") {
        const res = await apiUpload(files[0]);
        setForm((f) => ({ ...f, image: res.url }));
        toast({ title: "Image uploaded!" });
      } else {
        const results = await Promise.all(files.map((f) => apiUpload(f)));
        const urls = results.map((r) => r.url);
        setForm((f) => ({ ...f, gallery: [...(f.gallery || []), ...urls] }));
        toast({ title: `${urls.length} image(s) uploaded!` });
      }
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    } finally {
      setUploading(null);
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditing(pkg);
    setForm({ ...emptyPkg, ...pkg, gallery: pkg.gallery || [], videos: pkg.videos || [] });
    setShowAdd(false);
  };
  const handleAdd = () => { setForm({ ...emptyPkg, id: Date.now().toString() }); setShowAdd(true); setEditing(null); };

  const handleSave = () => {
    // Flush any unsubmitted gallery/video inputs so users don't lose URLs
    // they pasted but forgot to click "+" on.
    let next = form;
    if (galleryInput.trim()) {
      next = { ...next, gallery: [...(next.gallery || []), galleryInput.trim()] };
      setGalleryInput("");
    }
    if (videoInput.trim()) {
      next = { ...next, videos: [...(next.videos || []), videoInput.trim()] };
      setVideoInput("");
    }
    setForm(next);

    if (showAdd) {
      addPackage(next);
      toast({ title: "Package added!" });
      setShowAdd(false);
    } else if (editing) {
      updatePackages(packages.map((p) => (p.id === next.id ? next : p)));
      toast({ title: "Package updated!" });
      setEditing(null);
    }
  };

  const handleDelete = (id: string) => { deletePackage(id); toast({ title: "Package deleted!" }); };

  const [dragInfo, setDragInfo] = useState<{ kind: "gallery" | "videos"; index: number } | null>(null);

  const reorder = <T,>(arr: T[], from: number, to: number): T[] => {
    const next = [...arr];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
  };

  const handleDrop = (kind: "gallery" | "videos", to: number) => {
    if (!dragInfo || dragInfo.kind !== kind || dragInfo.index === to) { setDragInfo(null); return; }
    const list = (form[kind] as string[] | undefined) || [];
    setForm({ ...form, [kind]: reorder(list, dragInfo.index, to) });
    setDragInfo(null);
  };

  const addGalleryItem = () => {
    if (!galleryInput.trim()) return;
    setForm({ ...form, gallery: [...(form.gallery || []), galleryInput.trim()] });
    setGalleryInput("");
  };
  const removeGalleryItem = (i: number) => {
    setForm({ ...form, gallery: (form.gallery || []).filter((_, idx) => idx !== i) });
  };
  const addVideoItem = () => {
    if (!videoInput.trim()) return;
    setForm({ ...form, videos: [...(form.videos || []), videoInput.trim()] });
    setVideoInput("");
  };
  const removeVideoItem = (i: number) => {
    setForm({ ...form, videos: (form.videos || []).filter((_, idx) => idx !== i) });
  };

  const renderForm = () => (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-6">
        <h3 className="font-bold text-lg">{showAdd ? t.admin.add : t.admin.edit}</h3>

        <div>
          <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Basic Info</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Title (EN)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Title (BN)" value={form.titleBn} onChange={(e) => setForm({ ...form, titleBn: e.target.value })} />
            <Input placeholder="Destination (EN)" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
            <Input placeholder="Destination (BN)" value={form.destinationBn} onChange={(e) => setForm({ ...form, destinationBn: e.target.value })} />
            <Input placeholder="Duration (EN)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            <Input placeholder="Duration (BN)" value={form.durationBn} onChange={(e) => setForm({ ...form, durationBn: e.target.value })} />
            <Input placeholder="Price (EN)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <Input placeholder="Price (BN)" value={form.priceBn} onChange={(e) => setForm({ ...form, priceBn: e.target.value })} />
            <div className="flex gap-2 md:col-span-1">
              <Input placeholder="Main Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              <input
                ref={mainFileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload([f], "main"); e.target.value = ""; }}
              />
              <Button type="button" variant="outline" onClick={() => mainFileRef.current?.click()} disabled={uploading === "main"} title="Upload image">
                {uploading === "main" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              </Button>
            </div>
            <Select value={form.category} onValueChange={(v: "umrah" | "tour" | "hajj" | "hotel" | "visa") => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="umrah">Umrah</SelectItem>
                <SelectItem value="tour">Tour</SelectItem>
                <SelectItem value="hajj">Hajj</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="visa">Visa</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Short Description (EN)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Textarea placeholder="Short Description (BN)" value={form.descriptionBn} onChange={(e) => setForm({ ...form, descriptionBn: e.target.value })} />
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Detail Page Info</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Time (EN) — e.g. 3 Days 2 Nights" value={form.time || ""} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            <Input placeholder="Time (BN)" value={form.timeBn || ""} onChange={(e) => setForm({ ...form, timeBn: e.target.value })} />
            <Input placeholder="Transport (EN)" value={form.transport || ""} onChange={(e) => setForm({ ...form, transport: e.target.value })} />
            <Input placeholder="Transport (BN)" value={form.transportBn || ""} onChange={(e) => setForm({ ...form, transportBn: e.target.value })} />
            <Input placeholder="Hotel (EN)" value={form.hotel || ""} onChange={(e) => setForm({ ...form, hotel: e.target.value })} />
            <Input placeholder="Hotel (BN)" value={form.hotelBn || ""} onChange={(e) => setForm({ ...form, hotelBn: e.target.value })} />
            <Input placeholder="Food (EN)" value={form.food || ""} onChange={(e) => setForm({ ...form, food: e.target.value })} />
            <Input placeholder="Food (BN)" value={form.foodBn || ""} onChange={(e) => setForm({ ...form, foodBn: e.target.value })} />
            <Input placeholder="Sight Seen (EN)" value={form.sightSeen || ""} onChange={(e) => setForm({ ...form, sightSeen: e.target.value })} />
            <Input placeholder="Sight Seen (BN)" value={form.sightSeenBn || ""} onChange={(e) => setForm({ ...form, sightSeenBn: e.target.value })} />
            <Input placeholder="Others (EN)" value={form.others || ""} onChange={(e) => setForm({ ...form, others: e.target.value })} />
            <Input placeholder="Others (BN)" value={form.othersBn || ""} onChange={(e) => setForm({ ...form, othersBn: e.target.value })} />
            <Textarea placeholder="Tour Details — long text (EN)" rows={4} value={form.tourDetails || ""} onChange={(e) => setForm({ ...form, tourDetails: e.target.value })} />
            <Textarea placeholder="Tour Details — long text (BN)" rows={4} value={form.tourDetailsBn || ""} onChange={(e) => setForm({ ...form, tourDetailsBn: e.target.value })} />
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Gallery (Image URLs or Upload)</h4>
          <div className="flex gap-2 mb-2">
            <Input placeholder="https://... (or click upload)" value={galleryInput} onChange={(e) => setGalleryInput(e.target.value)} />
            <Button type="button" onClick={addGalleryItem} variant="outline" title="Add URL"><Plus className="w-4 h-4" /></Button>
            <input
              ref={galleryFileRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => { const fs = Array.from(e.target.files || []); if (fs.length) handleUpload(fs, "gallery"); e.target.value = ""; }}
            />
            <Button type="button" variant="outline" onClick={() => galleryFileRef.current?.click()} disabled={uploading === "gallery"} title="Upload image(s)">
              {uploading === "gallery" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Drag images to reorder — sequence is saved with the package.</p>
          <div className="flex flex-wrap gap-2">
            {(form.gallery || []).map((src, i) => (
              <div
                key={`${src}-${i}`}
                draggable
                onDragStart={() => setDragInfo({ kind: "gallery", index: i })}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop("gallery", i)}
                onDragEnd={() => setDragInfo(null)}
                className={`relative cursor-grab active:cursor-grabbing ${dragInfo?.kind === "gallery" && dragInfo.index === i ? "opacity-40" : ""}`}
              >
                <img src={src} alt="" className="w-20 h-20 object-cover rounded border" />
                <div className="absolute top-0 left-0 bg-background/80 rounded-br p-0.5">
                  <GripVertical className="w-3 h-3" />
                </div>
                <span className="absolute bottom-0 right-0 bg-primary text-primary-foreground text-[10px] px-1 rounded-tl">{i + 1}</span>
                <button type="button" onClick={() => removeGalleryItem(i)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center"><X className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Videos (YouTube URLs or embed URLs)</h4>
          <div className="flex gap-2 mb-2">
            <Input placeholder="https://youtube.com/watch?v=..." value={videoInput} onChange={(e) => setVideoInput(e.target.value)} />
            <Button type="button" onClick={addVideoItem} variant="outline"><Plus className="w-4 h-4" /></Button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Drag rows to reorder.</p>
          <div className="space-y-1">
            {(form.videos || []).map((url, i) => (
              <div
                key={`${url}-${i}`}
                draggable
                onDragStart={() => setDragInfo({ kind: "videos", index: i })}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop("videos", i)}
                onDragEnd={() => setDragInfo(null)}
                className={`flex items-center gap-2 text-sm bg-muted px-3 py-1 rounded cursor-grab active:cursor-grabbing ${dragInfo?.kind === "videos" && dragInfo.index === i ? "opacity-40" : ""}`}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-xs font-semibold w-5 shrink-0">{i + 1}.</span>
                <span className="flex-1 truncate">{url}</span>
                <button type="button" onClick={() => removeVideoItem(i)} className="text-destructive"><X className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} id="featured" />
          <label htmlFor="featured" className="text-sm">Featured (shown on home page)</label>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} className="bg-primary text-primary-foreground">{t.admin.save}</Button>
          <Button variant="outline" onClick={() => { setEditing(null); setShowAdd(false); }}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">{t.admin.managePackages}</h2>
        <Button onClick={handleAdd} className="gap-2"><Plus className="w-4 h-4" />{t.admin.add}</Button>
      </div>

      {(showAdd || editing) && renderForm()}

      <div className="space-y-3">
        {packages.map((pkg) => (
          <Card key={pkg.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {pkg.image && <img src={pkg.image} alt="" className="w-16 h-12 object-cover rounded" />}
                <div>
                  <p className="font-semibold">{pkg.title}</p>
                  <p className="text-sm text-muted-foreground">{pkg.category} • {pkg.destination} • {pkg.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(pkg)}>{t.admin.edit}</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(pkg.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPackages;
