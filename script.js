/*
  EDIT ONLY THIS OBJECT to personalize the invitation.
  The HTML is intentionally data-driven so names/date/families/etc.
  can be changed without rewriting the page.
*/
const INVITATION = {
  bride: "ابتهال",
  groom: "مهدي",
  initials: "I & M",

  familyOne: "أنور سلمان",
  familyTwo: "الحبيب سعيدي",

  date: "السبت 26 سبتمبر 2026",
  time: "انطلاقاً من الساعة الثامنة ليلاً (20:00)",
  venue: "يُحدد لاحقاً",

  openButton: "اضغط لفتح الدعوة"
};

const TRANSLATIONS = {
  coverTitle: "دعوة خطوبة",
  openButton: INVITATION.openButton,
  subtitle: "دعوة خطوبة",
  dateLabel: "التاريخ",
  timeLabel: "التوقيت",
  venueLabel: "المكان",
  closing: "بكل الحب، ننتظركم لنشارككم هذه الفرحة",
  backButton: "العودة إلى الظرف"
};

function applyConfig() {
  document.querySelectorAll("[data-config]").forEach((element) => {
    const key = element.dataset.config;
    if (Object.prototype.hasOwnProperty.call(INVITATION, key)) {
      element.textContent = INVITATION[key];
    }
  });

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (Object.prototype.hasOwnProperty.call(TRANSLATIONS, key)) {
      element.textContent = TRANSLATIONS[key];
    }
  });

  document.title = `${INVITATION.bride} & ${INVITATION.groom} | دعوة خطوبة`;
}

function openInvitation() {
  const button = document.getElementById("openInvitation");
  if (!button) return;

  button.disabled = true;
  button.style.transform = "scale(.96)";

  // A short "envelope opening" feel before navigating.
  document.body.classList.add("is-opening");

  window.setTimeout(() => {
    window.location.href = "invitation.html";
  }, 420);
}


function setupMusic() {
  const music = document.getElementById("invitationMusic");
  const toggle = document.getElementById("musicToggle");

  if (!music || !toggle) return;

  const setPlayingUI = (playing) => {
    toggle.classList.toggle("playing", playing);
    toggle.setAttribute("aria-pressed", String(playing));
    toggle.setAttribute(
      "aria-label",
      playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"
    );
  };

  const playMusic = () => {
    music.play()
      .then(() => setPlayingUI(true))
      .catch(() => setPlayingUI(false));
  };

  const pauseMusic = () => {
    music.pause();
    setPlayingUI(false);
  };

  toggle.addEventListener("click", () => {
    if (music.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  music.addEventListener("play", () => setPlayingUI(true));
  music.addEventListener("pause", () => setPlayingUI(false));

  // Because the previous page was opened by a user click, try to start
  // immediately when invitation.html loads. If the browser blocks it,
  // the corner button remains available.
  playMusic();
}

function goBackToEnvelope() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();

  const openButton = document.getElementById("openInvitation");
  const backButton = document.getElementById("backButton");

  if (openButton) {
    openButton.addEventListener("click", openInvitation);
  }

  if (backButton) {
    backButton.addEventListener("click", goBackToEnvelope);
  }

  setupMusic();
});
