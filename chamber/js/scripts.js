

document.addEventListener('DOMContentLoaded', () => {
  const membersContainer = document.getElementById('members');
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');

  
  async function fetchMembers() {
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      membersContainer.innerHTML = `<p>Error loading members: ${error.message}</p>`;
    }
  }

  
  function createMemberCard(member) {
    return `
      <article class="member-card">
        <img src="images/${member.image}" alt="${member.name} logo" />
        <div class="member-info">
          <h3>${member.name}</h3>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
          <p><strong>Membership Level:</strong> ${membershipLevelText(member.membershipLevel)}</p>
          <p>${member.description}</p>
        </div>
      </article>
    `;
  }

  
  function membershipLevelText(level) {
    switch(level) {
      case 1: return 'Member';
      case 2: return 'Silver';
      case 3: return 'Gold';
      default: return 'Member';
    }
  }

  
  function displayMembers(members) {
    membersContainer.innerHTML = members.map(createMemberCard).join('');
  }

  
  function setView(view) {
    if (view === 'grid') {
      membersContainer.classList.add('grid-view');
      membersContainer.classList.remove('list-view');
      gridBtn.setAttribute('aria-pressed', 'true');
      listBtn.setAttribute('aria-pressed', 'false');
    } else {
      membersContainer.classList.add('list-view');
      membersContainer.classList.remove('grid-view');
      gridBtn.setAttribute('aria-pressed', 'false');
      listBtn.setAttribute('aria-pressed', 'true');
    }
  }

  
  gridBtn.addEventListener('click', () => setView('grid'));
  listBtn.addEventListener('click', () => setView('list'));

  
  document.getElementById('copyright-year').textContent = new Date().getFullYear();
  document.getElementById('last-modified').textContent = document.lastModified;

  
  fetchMembers();
  setView('grid');
});

