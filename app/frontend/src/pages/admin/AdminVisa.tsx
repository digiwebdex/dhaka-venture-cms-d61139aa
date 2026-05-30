import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { VisaRate } from "@/data/defaultData";
import { Trash2, Plus } from "lucide-react";

const AdminVisa = () => {
  const { t } = useLang();
  const { visaRates, updateVisaRates, addVisaRate, deleteVisaRate } = useCms();
  const { toast } = useToast();
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<VisaRate | null>(null);

  const emptyVisa: VisaRate = { id: "", country: "", countryBn: "", type: "", typeBn: "", rate: "", rateBn: "" };
  const [form, setForm] = useState<VisaRate>(emptyVisa);

  const handleEdit = (v: VisaRate) => { setEditing(v); setForm({ ...v }); setShowAdd(false); };
  const handleAdd = () => { setForm({ ...emptyVisa, id: Date.now().toString() }); setShowAdd(true); setEditing(null); };

  const handleSave = () => {
    if (showAdd) { addVisaRate(form); toast({ title: "Visa rate added!" }); setShowAdd(false); }
    else if (editing) { updateVisaRates(visaRates.map((v) => (v.id === form.id ? form : v))); toast({ title: "Updated!" }); setEditing(null); }
  };

  const renderForm = () => (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Country (EN)" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
          <Input placeholder="Country (BN)" value={form.countryBn} onChange={(e) => setForm({ ...form, countryBn: e.target.value })} />
          <Input placeholder="Visa Type (EN)" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          <Input placeholder="Visa Type (BN)" value={form.typeBn} onChange={(e) => setForm({ ...form, typeBn: e.target.value })} />
          <Input placeholder="Rate (EN)" value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} />
          <Input placeholder="Rate (BN)" value={form.rateBn} onChange={(e) => setForm({ ...form, rateBn: e.target.value })} />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave}>{t.admin.save}</Button>
          <Button variant="outline" onClick={() => { setEditing(null); setShowAdd(false); }}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">{t.admin.manageVisa}</h2>
        <Button onClick={handleAdd} className="gap-2"><Plus className="w-4 h-4" />{t.admin.add}</Button>
      </div>
      {(showAdd || editing) && renderForm()}
      <div className="space-y-3">
        {visaRates.map((v) => (
          <Card key={v.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{v.country} ({v.countryBn})</p>
                <p className="text-sm text-muted-foreground">{v.type} • {v.rate}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(v)}>{t.admin.edit}</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteVisaRate(v.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminVisa;
