
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Dumbbell, AlarmClock, ShieldCheck, Camera, Pill, FileDown } from "lucide-react";
import { useState } from "react";

export default function CycleTracker() {
  const [checked, setChecked] = useState({});
  const [weightLogs, setWeightLogs] = useState([]);
  const [newWeight, setNewWeight] = useState("");
  const [photos, setPhotos] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [supplements, setSupplements] = useState([]);
  const [newSupplement, setNewSupplement] = useState({ name: "", amount: "", time: "" });
  const today = new Date().toISOString().split("T")[0];

  const tasks = [
    { time: "8:00 AM", text: "Wake up + Pre-gym: Shroom Tech, Creatine, NAC, GW, RAD-140", icon: <AlarmClock /> },
    { time: "8:30 AM", text: "Workout starts", icon: <Dumbbell /> },
    { time: "10:30 AM", text: "Meal 1 + Omega-3, Cal-Mag, Shredded AF", icon: <CalendarDays /> },
    { time: "3:00 PM", text: "Ashwagandha + Optional Shredded AF", icon: <ShieldCheck /> },
    { time: "7:00 PM", text: "Meal 2 + Omega-3", icon: <CalendarDays /> },
    { time: "9:30 PM", text: "Optional: Cal-Mag (for sleep)", icon: <AlarmClock /> }
  ];

  const toggleCheck = (task) => {
    const key = `${today}-${task.time}`;
    setChecked({ ...checked, [key]: !checked[key] });
  };

  const addWeightLog = () => {
    if (newWeight) {
      setWeightLogs([...weightLogs, { date: today, weight: newWeight }]);
      setNewWeight("");
    }
  };

  const addWorkout = (exercise) => {
    if (exercise) {
      setWorkouts([...workouts, { date: today, exercise }]);
    }
  };

  const addPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotos([...photos, { date: today, url }]);
    }
  };

  const toggleSupplementCheck = (idx) => {
    const key = `${today}-supp-${idx}`;
    setChecked({ ...checked, [key]: !checked[key] });
  };

  const addSupplement = () => {
    if (newSupplement.name && newSupplement.amount && newSupplement.time) {
      setSupplements([...supplements, { ...newSupplement, date: today }]);
      setNewSupplement({ name: "", amount: "", time: "" });
    }
  };

  const exportSupplementsToCSV = () => {
    const header = "Date,Time,Name,Amount\n";
    const rows = supplements.map(s => `${s.date},${s.time},${s.name},${s.amount}`).join("\n");
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'supplements.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const groupedSupplements = supplements.reduce((acc, s, idx) => {
    if (!acc[s.time]) acc[s.time] = [];
    acc[s.time].push({ ...s, idx });
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">RAD-140 Cycle Tracker</h1>
      {/* Tasks */}
      {tasks.map((task) => {
        const key = `${today}-${task.time}`;
        return (
          <Card key={key} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {task.icon}
              <div>
                <p className="text-sm font-semibold">{task.time}</p>
                <p className="text-sm text-muted-foreground">{task.text}</p>
              </div>
            </div>
            <Button
              variant={checked[key] ? "default" : "outline"}
              onClick={() => toggleCheck(task)}
            >
              {checked[key] ? "✓ Done" : "Mark Done"}
            </Button>
          </Card>
        );
      })}

      {/* Supplement Tracker */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><Pill /> Supplement Tracker</h2>
        <div className="flex gap-2 mb-2 flex-wrap">
          <input
            type="text"
            placeholder="Supplement Name"
            value={newSupplement.name}
            onChange={(e) => setNewSupplement({ ...newSupplement, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Amount (e.g. 20mg)"
            value={newSupplement.amount}
            onChange={(e) => setNewSupplement({ ...newSupplement, amount: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Time (e.g. 8:00 AM)"
            value={newSupplement.time}
            onChange={(e) => setNewSupplement({ ...newSupplement, time: e.target.value })}
            className="border p-2 rounded"
          />
          <Button onClick={addSupplement}>Add</Button>
          <Button variant="outline" onClick={exportSupplementsToCSV} className="flex gap-1 items-center">
            <FileDown size={16} /> Export CSV
          </Button>
        </div>
        {Object.entries(groupedSupplements).map(([time, entries]) => (
          <div key={time} className="mb-2">
            <h3 className="font-medium text-sm mb-1">{time}</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {entries.map((s, i) => {
                const key = `${today}-supp-${s.idx}`;
                return (
                  <li key={s.idx} className="flex justify-between items-center">
                    <span>{s.date}: {s.name} ({s.amount})</span>
                    <Button size="sm" variant={checked[key] ? "default" : "outline"} onClick={() => toggleSupplementCheck(s.idx)}>
                      {checked[key] ? "✓ Taken" : "Mark Taken"}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </Card>
    </div>
  );
}
