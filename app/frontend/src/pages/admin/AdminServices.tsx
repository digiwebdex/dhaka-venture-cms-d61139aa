import { useState } from "react";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ServiceItem } from "@/data/defaultData";
import { Trash2, Plus } from "lucide-react";

const AdminServices = () => {
  const { services, updateServices, addService, deleteService } = useCms();
  const { toast } = useToast();
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const empty: ServiceItem = { id: "", icon: "Star", titleEn: "", titleBn: "", descEn: "", descBn: "", link: "", image: "" };
  const [form, setForm] = useState<ServiceItem>(empty);

  const handleEdit = (s: ServiceItem) => { setEditing(s); setForm({ ...s }); setShowAdd(false); };
  const handleAdd = () => { setForm({ ...empty, id: Date.now().toString() }); setShowAdd(true); setEditing(null); };

  const handleSave = () => {
    if (showAdd) { addService(form); toast({ title: "Service added!" }); setShowAdd(false); }
    else if (editing) { updateServices(services.map((s) => (s.id === form.id ? form : s))); toast({ title: "Service updated!" }); setEditing(null); }
  };

  const renderForm = () => (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-bold">{showAdd ? "Add Service" : "Edit Service"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Icon (Star, MapPin, Plane, Hotel)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          <Input placeholder="Link (/services/...)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          <Input placeholder="Title (EN)" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
          <Input placeholder="Title (BN)" value={form.titleBn} onChange={(e) => setForm({ ...form, titleBn: e.target.value })} />
          <Textarea placeholder="Description (EN)" value={form.descEn} onChange={(e) => setForm({ ...form, descEn: e.target.value })} />
          <Textarea placeholder="Description (BN)" value={form.descBn} onChange={(e) => setForm({ ...form, descBn: e.target.value })} />
          <Input placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="md:col-span-2" />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave}>Save</Button>
          <Button variant="outline" onClick={() => { setEditing(null); setShowAdd(false); }}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Services Section</h2>
        <Button onClick={handleAdd} className="gap-2"><Plus className="w-4 h-4" />Add Service</Button>
      </div>
      {(showAdd || editing) && renderForm()}
      <div className="space-y-3">
        {services.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{s.titleEn} / {s.titleBn}</p>
                <p className="text-sm text-muted-foreground">{s.icon} • {s.link}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(s)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => { deleteService(s.id); toast({ title: "Deleted!" }); }}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
