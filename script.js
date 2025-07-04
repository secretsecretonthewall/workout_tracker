
const today = new Date().toISOString().split("T")[0];

const scheduleItems = [
  "8:00 AM - RAD-140, Shroom Tech, Creatine, NAC, GW",
  "8:30 AM - Workout",
  "10:30 AM - Meal 1: Omega-3, Cal-Mag, Shredded AF",
  "3:00 PM - Ashwagandha, Optional Shredded AF",
  "7:00 PM - Meal 2: Omega-3",
  "9:30 PM - Optional: Cal-Mag (for sleep)"
];

function renderSchedule() {
  const schedule = document.getElementById("schedule");
  schedule.innerHTML = '';
  scheduleItems.forEach((item, i) => {
    const key = `sched-${today}-${i}`;
    const done = localStorage.getItem(key);
    const div = document.createElement("div");
    div.innerHTML = `<input type="checkbox" ${done ? "checked" : ""} onchange="toggle('${key}', this)"> ${item}`;
    schedule.appendChild(div);
  });
}

function toggle(key, el) {
  if (el.checked) {
    localStorage.setItem(key, "done");
  } else {
    localStorage.removeItem(key);
  }
}

function addSupplement() {
  const name = document.getElementById("supplement-name").value;
  const amount = document.getElementById("supplement-amount").value;
  const time = document.getElementById("supplement-time").value;
  const entry = { date: today, name, amount, time };
  const data = JSON.parse(localStorage.getItem("supplements") || "[]");
  data.push(entry);
  localStorage.setItem("supplements", JSON.stringify(data));
  renderSupplements();
}

function renderSupplements() {
  const ul = document.getElementById("supplement-list");
  ul.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("supplements") || "[]");
  data.forEach((s, i) => {
    const li = document.createElement("li");
    li.innerText = `${s.date} ${s.time} - ${s.name} (${s.amount})`;
    ul.appendChild(li);
  });
}

function exportSupplements() {
  const data = JSON.parse(localStorage.getItem("supplements") || "[]");
  let csv = "Date,Time,Name,Amount\n";
  csv += data.map(d => `${d.date},${d.time},${d.name},${d.amount}`).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "supplements.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function addWeight() {
  const weight = document.getElementById("weight-input").value;
  const data = JSON.parse(localStorage.getItem("weights") || "[]");
  data.push({ date: today, weight });
  localStorage.setItem("weights", JSON.stringify(data));
  renderWeights();
}

function renderWeights() {
  const ul = document.getElementById("weight-log");
  ul.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("weights") || "[]");
  data.forEach((w) => {
    const li = document.createElement("li");
    li.innerText = `${w.date}: ${w.weight} lbs`;
    ul.appendChild(li);
  });
}

function addWorkout() {
  const workout = document.getElementById("workout-input").value;
  const data = JSON.parse(localStorage.getItem("workouts") || "[]");
  data.push({ date: today, workout });
  localStorage.setItem("workouts", JSON.stringify(data));
  renderWorkouts();
}

function renderWorkouts() {
  const ul = document.getElementById("workout-log");
  ul.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("workouts") || "[]");
  data.forEach((w) => {
    const li = document.createElement("li");
    li.innerText = `${w.date}: ${w.workout}`;
    ul.appendChild(li);
  });
}

document.getElementById("photo-upload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = document.createElement("img");
    img.src = event.target.result;
    document.getElementById("photo-gallery").appendChild(img);
  };
  reader.readAsDataURL(file);
});

renderSchedule();
renderSupplements();
renderWeights();
renderWorkouts();
