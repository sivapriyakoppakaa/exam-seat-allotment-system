// Fetch all seats from backend
function loadSeats() {
  fetch("http://localhost:5000/api/seats/all")
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      const container = document.getElementById("seatContainer");
      container.innerHTML = "";
      data.forEach(seat => {
        const div = document.createElement("div");
        div.textContent = `${seat.rollNo} - Sem ${seat.semester} - ${seat.roomNo} - ${seat.session}`;
        container.appendChild(div);
      });
    })
    .catch(err => console.error("Error:", err));
}

// Add new seat
function addSeat() {
  const seatData = {
    rollNo: document.getElementById("rollNo").value,
    semester: document.getElementById("semester").value,
    roomNo: document.getElementById("roomNo").value,
    session: document.getElementById("session").value
  };

  fetch("http://localhost:5000/api/seats/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(seatData)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(() => loadSeats())
    .catch(err => console.error("Error:", err));
}

// Load seats when page opens
window.onload = loadSeats;
