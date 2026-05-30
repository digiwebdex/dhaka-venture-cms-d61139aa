import { useState } from "react";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { StatItem } from "@/data/defaultData";
import { Trash2, Plus } from "lucide-react";

const iconOptions = ["Shield", "BookOpen", "Globe", "Headphones", "Users", "Star", "Award", "Heart", "MapPin", "Plane"];

const AdminStats = () => {
  const { stats, updateStats, addStat, deleteStat } = useCms();
  const { toast } = useToast();
  const [editing, setEditing] = useState<StatItem | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const emptyStat: StatItem = { id: "", icon: "Shield", valueEn: "", valueBn: "", labelEn: "", labelBn: "" };
  const [form, setForm] = useState<StatItem>(emptyStat);

  const handleEdit = (s: StatItem) => { setEditing(s); setForm({ ...s }); setShowAdd(false); };
  const handleAdd = () => { setForm({ ...emptyStat, id: Date.now().toString() }); setShowAdd(true); setEditing(null); };

  const handleSave = () => {
    if (showAdd) { addStat(form); toast({ title: "Stat added!" }); setShowAdd(false); }
    else if (editing) { updateStats(stats.map((s) => (s.id === form.id ? form : s))); toast({ title: "Updated!" }); setEditing(null); }
  };

  const renderForm = () => (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-bold">{showAdd ? "Add Stat" : "Edit Stat"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Icon</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Value (EN)</label>
            <Input value={form.valueEn} onChange={(e) => setForm({ ...form, valueEn: e.target.value })} placeholder="e.g. 10+" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Value (BN)</label>
            <Input value={form.valueBn} onChange={(e) => setForm({ ...form, valueBn: e.target.value })} placeholder="e.g. ১০+" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Label (EN)</label>
            <Input value={form.labelEn} onChange={(e) => setForm({ ...form, labelEn: e.target.value })} placeholder="e.g. Years Experience" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Label (BN)</label>
            <Input value={form.labelBn} onChange={(e) => setForm({ ...form, labelBn: e.target.value })} placeholder="e.g. বছরের অভিজ্ঞতা" />
          </div>
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
        <h2 className="font-bold text-xl">Stats Management</h2>
        <Button onClick={handleAdd} className="gap-2"><Plus className="w-4 h-4" />Add Stat</Button>
      </div>
      {(showAdd || editing) && renderForm()}
      <div className="space-y-3">
        {stats.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{s.valueEn} — {s.labelEn}</p>
                <p className="text-sm text-muted-foreground">{s.valueBn} — {s.labelBn} • Icon: {s.icon}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(s)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteStat(s.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;
