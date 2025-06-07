// spotlight.js

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    
    const eligible = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

   
    const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = ""; 

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      const levelName = member.membershipLevel === 3 ? "Gold" : "Silver";

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p><em>${levelName} Member</em></p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

loadSpotlights();

