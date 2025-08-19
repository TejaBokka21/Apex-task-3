/* ---------- QUIZ ---------- */
const quizData = [
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Syntax",
      "Control Sheet System",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which is not a frontend framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: "Django",
  },
];

const quizContainer = document.getElementById("quiz-container");

quizData.forEach((q, index) => {
  const div = document.createElement("div");
  div.innerHTML = `<h3>${index + 1}. ${q.question}</h3>`;
  q.options.forEach((opt) => {
    div.innerHTML += `
      <label>
        <input type="radio" name="q${index}" value="${opt}"> ${opt}
      </label>
    `;
  });
  quizContainer.appendChild(div);
});

document.getElementById("submitQuiz").addEventListener("click", () => {
  let score = 0;
  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) score++;
  });
  document.getElementById(
    "quizResult"
  ).innerText = `You scored ${score}/${quizData.length} 🎉`;
});

/* ---------- CAROUSEL ---------- */
const track = document.querySelector(".carousel-track");
const images = document.querySelectorAll(".carousel img");
let index = 0;

function showSlide(n) {
  index = (n + images.length) % images.length;
  track.style.transform = `translateX(-${index * 100}%)`;
}

document
  .querySelector(".prev")
  .addEventListener("click", () => showSlide(index - 1));
document
  .querySelector(".next")
  .addEventListener("click", () => showSlide(index + 1));

// Auto-slide
setInterval(() => showSlide(index + 1), 4000);

/* ---------- API FETCH ---------- */
async function fetchJoke() {
  const res = await fetch(
    "https://v2.jokeapi.dev/joke/Programming?type=single"
  );
  const data = await res.json();
  document.getElementById("jokeBox").innerText = data.joke;
}

/* ---------- CONTACT FORM VALIDATION ---------- */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  if (name === "" || email === "" || message === "") {
    formMessage.style.color = "red";
    formMessage.innerText = "⚠️ Please fill in all fields!";
    return;
  }
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    formMessage.style.color = "red";
    formMessage.innerText = "⚠️ Invalid email format!";
    return;
  }
  formMessage.style.color = "lightgreen";
  formMessage.innerText = "✅ Message sent successfully!";
  this.reset();
});
