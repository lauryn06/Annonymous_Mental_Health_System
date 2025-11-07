const breathingText = document.getElementById("breathing-text");
const breathingSection = document.getElementById("breathing-section");
const journalSection = document.getElementById("journal-section");
const affirmationSection = document.getElementById("affirmation-section");
const affirmationText = document.getElementById("affirmation-text");
const entriesList = document.getElementById("entries");

const affirmations = [
  "You are enough just as you are.",
  "This moment is temporary.",
  "You are strong and resilient.",
  "Peace begins with a single breath.",
  "You deserve kindness and care."
];

function startBreathing() {
  hideAll();
  breathingSection.classList.remove("hidden");
  let steps = ["Inhale deeply...", "Hold...", "Exhale slowly...", "Hold..."];
  let i = 0;
  breathingText.textContent = steps[i];
  let interval = setInterval(() => {
    i = (i + 1) % steps.length;
    breathingText.textContent = steps[i];
  }, 4000);
  setTimeout(() => clearInterval(interval), 24000); // 6 cycles
}

function toggleJournal() {
  hideAll();
  journalSection.classList.remove("hidden");
}

function saveEntry(event) {
  event.preventDefault();
  const input = document.getElementById("entry");
  const li = document.createElement("li");
  li.textContent = input.value;
  entriesList.appendChild(li);
  input.value = "";
}

function showAffirmation() {
  hideAll();
  affirmationSection.classList.remove("hidden");
  const random = affirmations[Math.floor(Math.random() * affirmations.length)];
  affirmationText.textContent = random;
}

function hideAll() {
  breathingSection.classList.add("hidden");
  journalSection.classList.add("hidden");
  affirmationSection.classList.add("hidden");
}