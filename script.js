
document.getElementById("schedule").innerHTML = `
  <h2>Daily Schedule</h2>
  <div class="card">8:00 AM - Pre-Gym: RAD-140, Shroom Tech, Creatine, NAC, GW 
    <button onclick="toggle(this)">Mark Done</button></div>
  <div class="card">8:30 AM - Workout Starts 
    <button onclick="toggle(this)">Mark Done</button></div>
  <div class="card">10:30 AM - Meal 1: Omega-3, Cal-Mag, Shredded AF 
    <button onclick="toggle(this)">Mark Done</button></div>
  <div class="card">3:00 PM - Ashwagandha, Optional Shredded AF 
    <button onclick="toggle(this)">Mark Done</button></div>
  <div class="card">7:00 PM - Meal 2: Omega-3 
    <button onclick="toggle(this)">Mark Done</button></div>
  <div class="card">9:30 PM - Optional: Cal-Mag (for sleep) 
    <button onclick="toggle(this)">Mark Done</button></div>
`;

function toggle(btn) {
  btn.innerText = btn.innerText === 'Mark Done' ? '✓ Done' : 'Mark Done';
}
