const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true, type: "wdd" },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true, type: "wdd" },
  { code: "WDD 231", name: "Frontend Development I", credits: 2, completed: false, type: "wdd" },
  { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: true, type: "cse" },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true, type: "cse" },
  { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: false, type: "cse" },
  { code: "CSE 222", name: "Data Structures", credits: 2, completed: false, type: "cse" },
];

const courseCards = document.getElementById("courseCards");
const creditTotal = document.getElementById("creditTotal");

function displayCourses(filter = "all") {
  courseCards.innerHTML = "";
  let filtered = courses;

  if (filter === "wdd") filtered = courses.filter(c => c.type === "wdd");
  if (filter === "cse") filtered = courses.filter(c => c.type === "cse");

  let totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);

  filtered.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>Credits: ${course.credits}</p>`;
    courseCards.appendChild(card);
  });

  creditTotal.textContent = `Total Credits: ${totalCredits}`;
}

// Button listeners
document.getElementById("all").addEventListener("click", () => displayCourses("all"));
document.getElementById("wdd").addEventListener("click", () => displayCourses("wdd"));
document.getElementById("cse").addEventListener("click", () => displayCourses("cse"));

// Default display
displayCourses("all");
