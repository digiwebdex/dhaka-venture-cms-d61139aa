import { useState } from "react";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FlightRoute } from "@/data/defaultData";
import { Trash2, Plus, Plane } from "lucide-react";

const AdminFlightOffers = () => {
  const { flightRoutes, updateFlightRoutes, addFlightRoute, deleteFlightRoute } = useCms();
  const { toast } = useToast();
  const [editing, setEditing] = useState<FlightRoute | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const emptyRoute: FlightRoute = { id: "", from: "", to: "", fromBn: "", toBn: "", price: "", priceBn: "" };
  const [form, setForm] = useState<FlightRoute>(emptyRoute);

  const handleEdit = (r: FlightRoute) => { setEditing(r); setForm({ ...r }); setShowAdd(false); };
  const handleAdd = () => { setForm({ ...emptyRoute, id: Date.now().toString() }); setShowAdd(true); setEditing(null); };

  const handleSave = () => {
    if (showAdd) { addFlightRoute(form); toast({ title: "Route added!" }); setShowAdd(false); }
    else if (editing) { updateFlightRoutes(flightRoutes.map((r) => (r.id === form.id ? form : r))); toast({ title: "Updated!" }); setEditing(null); }
  };

  const renderForm = () => (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-bold">{showAdd ? "Add Route" : "Edit Route"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">From (EN)</label>
            <Input value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">From (BN)</label>
            <Input value={form.fromBn} onChange={(e) => setForm({ ...form, fromBn: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">To (EN)</label>
            <Input value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">To (BN)</label>
            <Input value={form.toBn} onChange={(e) => setForm({ ...form, toBn: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Price (EN)</label>
            <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="BDT 28,000" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Price (BN)</label>
            <Input value={form.priceBn} onChange={(e) => setForm({ ...form, priceBn: e.target.value })} placeholder="৳ ২৮,০০০" />
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
        <h2 className="font-bold text-xl">Flight Routes Management</h2>
        <Button onClick={handleAdd} className="gap-2"><Plus className="w-4 h-4" />Add Route</Button>
      </div>
      {(showAdd || editing) && renderForm()}
      <div className="space-y-3">
        {flightRoutes.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Plane className="w-5 h-5 text-gold rotate-45" />
                <div>
                  <p className="font-semibold">{r.from} → {r.to}</p>
                  <p className="text-sm text-muted-foreground">{r.fromBn} → {r.toBn} • {r.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(r)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteFlightRoute(r.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminFlightOffers;
