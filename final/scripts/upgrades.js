// scripts/upgrades.js

const partsList = document.querySelector("#upgrades-grid");
const viewCountEl = document.querySelector("#view-count");

// === MODAL Elements ===
const modal = document.createElement("div");
modal.classList.add("modal");
modal.id = "modalDetails";

modal.innerHTML = `
  <div class="modal-content">
    <span class="close-button">&times;</span>
    <img id="modal-image" src="" alt="">
    <h2 id="modal-name"></h2>
    <p><strong>Type:</strong> <span id="modal-type"></span></p>
    <p><strong>Description:</strong> <span id="modal-description"></span></p>
    <p><strong>Price:</strong> <span id="modal-price"></span></p>
  </div>
`;

document.body.appendChild(modal);

const closeBtn = modal.querySelector(".close-button");
const modalImage = modal.querySelector("#modal-image");
const modalName = modal.querySelector("#modal-name");
const modalType = modal.querySelector("#modal-type");
const modalDescription = modal.querySelector("#modal-description");
const modalPrice = modal.querySelector("#modal-price");

let partViewCount = localStorage.getItem("partViewCount") || 0;
viewCountEl.textContent = `You've viewed ${partViewCount} parts.`;

function updateViewCount() {
  partViewCount++;
  localStorage.setItem("partViewCount", partViewCount);
  viewCountEl.textContent = `You've viewed ${partViewCount} parts.`;
}

// === FETCH + DISPLAY ===
async function getParts() {
  try {
    const response = await fetch("data/rcparts.json");
    if (!response.ok) throw new Error("Failed to fetch RC parts.");
    const data = await response.json();
    displayParts(data);
  } catch (error) {
    console.error("Error loading parts:", error);
    partsList.innerHTML = `<p class="error">Sorry, failed to load parts. Try again later.</p>`;
  }
}

function displayParts(parts) {
  parts.forEach(part => {
    const card = document.createElement("div");
    card.classList.add("upgrade-card");

    card.innerHTML = `
      <img src="${part.image}" alt="${part.name}" loading="lazy">
      <h3>${part.name}</h3>
      <p><strong>Type:</strong> ${part.type}</p>
      <p><strong>Description:</strong> ${part.description}</p>
      <p><strong>Price:</strong> ${part.price}</p>
    `;

    card.addEventListener("click", () => {
      openModal(part);
      updateViewCount();
    });

    partsList.appendChild(card);
  });
}

// === MODAL OPEN ===
function openModal(part) {
  modalImage.src = part.image;
  modalImage.alt = part.name;
  modalName.textContent = part.name;
  modalType.textContent = part.type;
  modalDescription.textContent = part.description;
  modalPrice.textContent = part.price;
  modal.style.display = "flex";
}

// === MODAL CLOSE ===
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

getParts();



