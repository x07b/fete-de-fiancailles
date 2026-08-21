const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const openInvitation = document.getElementById("openInvitation");
const goBackBtn = document.getElementById("goBackBtn");
const coverPage = document.getElementById("coverPage");
const invitationPage = document.getElementById("invitationPage");
const petals = document.getElementById("petals");

music.volume = 0.55;

async function startMusic() {
  try {
    await music.play();
    musicIcon.textContent = "❚❚";
  } catch (error) {
    // Mobile browsers may block autoplay until the first interaction.
  }
}

window.addEventListener("load", startMusic);

document.addEventListener("pointerdown", () => {
  if (music.paused) startMusic();
}, { once: true });

musicToggle.addEventListener("click", async (event) => {
  event.stopPropagation();
  if (music.paused) {
    await startMusic();
  } else {
    music.pause();
    musicIcon.textContent = "♫";
  }
});

openInvitation.addEventListener("click", () => {
  startMusic();
  coverPage.style.display = "none";
  invitationPage.classList.add("active");
  invitationPage.setAttribute("aria-hidden", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
  createPetals(45);
});

goBackBtn.addEventListener("click", () => {
  invitationPage.classList.remove("active");
  invitationPage.setAttribute("aria-hidden", "true");
  coverPage.style.display = "grid";
  window.scrollTo({ top: 0, behavior: "smooth" });
  // Music intentionally continues without restarting.
});

function createPetals(count) {
  petals.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${5 + Math.random() * 6}s`;
    petal.style.animationDelay = `${Math.random() * 2}s`;
    petal.style.setProperty("--x", `${-100 + Math.random() * 200}px`);
    petals.appendChild(petal);
  }
}
