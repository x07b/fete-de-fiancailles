const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

const openInvitation = document.getElementById("openInvitation");
const goBackBtn = document.getElementById("goBackBtn");

const coverPage = document.getElementById("coverPage");
const invitationPage = document.getElementById("invitationPage");

const petals = document.getElementById("petals");


/* =========================================
   MUSIC
========================================= */

music.volume = 0.55;


/* Start music */

async function startMusic() {
  try {
    await music.play();

    musicIcon.textContent = "❚❚";

  } catch (error) {

    console.log("Music could not start:", error);

    musicIcon.textContent = "♫";

  }
}


/* =========================================
   MUSIC BUTTON
========================================= */

musicToggle.addEventListener("click", async (event) => {

  event.stopPropagation();

  if (music.paused) {

    await startMusic();

  } else {

    music.pause();

    musicIcon.textContent = "♫";

  }

});


/* =========================================
   OPEN INVITATION
========================================= */

openInvitation.addEventListener("click", async () => {

  /*
    IMPORTANT:

    This click is a user interaction,
    so the browser allows the music
    to start here.
  */

  await startMusic();


  /* Hide cover page */

  coverPage.style.display = "none";


  /* Show invitation page */

  invitationPage.classList.add("active");

  invitationPage.inert = false;

  invitationPage.setAttribute(
    "aria-hidden",
    "false"
  );


  /* Move focus */

  goBackBtn.focus();


  /* Go to top */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  /* Create petals */

  requestAnimationFrame(() => {

    createPetals(45);

  });

});


/* =========================================
   GO BACK
========================================= */

goBackBtn.addEventListener("click", () => {

  /*
    Move focus first.

    This prevents the aria-hidden warning.
  */

  openInvitation.focus();


  /* Hide invitation */

  invitationPage.classList.remove("active");

  invitationPage.inert = true;

  invitationPage.setAttribute(
    "aria-hidden",
    "true"
  );


  /* Show cover */

  coverPage.style.display = "grid";


  /* Remove petals */

  petals.innerHTML = "";


  /* Go to top */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================================
   CREATE FALLING PETALS
========================================= */

function createPetals(count) {

  /* Remove existing petals */

  petals.innerHTML = "";


  /* Get invitation height */

  const pageHeight =
    invitationPage.scrollHeight;


  /* Create petals */

  for (let i = 0; i < count; i++) {

    const petal =
      document.createElement("span");


    petal.className = "petal";


    /* Random horizontal position */

    petal.style.left =
      `${Math.random() * 100}%`;


    /* Random duration */

    petal.style.animationDuration =
      `${8 + Math.random() * 8}s`;


    /* Random delay */

    petal.style.animationDelay =
      `${Math.random() * 3}s`;


    /* Random horizontal movement */

    petal.style.setProperty(
      "--x",
      `${-100 + Math.random() * 200}px`
    );


    /* Full falling distance */

    petal.style.setProperty(
      "--fall-distance",
      `${pageHeight + 100}px`
    );


    /* Add petal */

    petals.appendChild(petal);

  }

}