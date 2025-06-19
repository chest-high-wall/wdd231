const cardsContainer = document.getElementById("discover-cards");
const visitInfo = document.getElementById("visit-message");

// Fetch and display cards
fetch("data/discover.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      const card = document.createElement("section");
      card.classList.add("discover-card");

      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="images/${item.image}" alt="${item.name}" loading="lazy" />
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;

      cardsContainer.appendChild(card);
    });
  });

// Visit tracking
const msInDay = 86400000;
const lastVisit = Number(localStorage.getItem("lastVisit"));
const now = Date.now();

let message = "Welcome! Let us know if you have any questions.";

if (lastVisit) {
  const daysDiff = Math.floor((now - lastVisit) / msInDay);
  if (daysDiff < 1) {
    message = "Back so soon! Awesome!";
  } else if (daysDiff === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${daysDiff} days ago.`;
  }
}

visitInfo.textContent = message;
localStorage.setItem("lastVisit", now.toString());
