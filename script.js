const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

const openInvitation = document.getElementById("openInvitation");
const goBackBtn = document.getElementById("goBackBtn");

const coverPage = document.getElementById("coverPage");
const invitationPage = document.getElementById("invitationPage");

const petals = document.getElementById("petals");


/* =========================================
   MUSIC AUTOPLAY
========================================= */

music.volume = 0.55;


/* =========================================
   START MUSIC AUTOMATICALLY
========================================= */

async function startMusic() {
  try {

    await music.play();

    musicIcon.textContent = "❚❚";

    console.log("Music started automatically.");

  } catch (error) {

    console.log(
      "Browser blocked autoplay:",
      error
    );

    musicIcon.textContent = "♫";

  }
}


/* =========================================
   START MUSIC IMMEDIATELY
========================================= */

startMusic();


/* Try again when everything is loaded */

window.addEventListener(
  "load",
  () => {

    startMusic();

  }
);


/* =========================================
   MUSIC BUTTON
========================================= */

musicToggle.addEventListener(
  "click",
  async () => {

    if (music.paused) {

      await startMusic();

    } else {

      music.pause();

      musicIcon.textContent = "♫";

    }

  }
);


/* =========================================
   OPEN INVITATION
========================================= */

openInvitation.addEventListener(
  "click",
  () => {

    /* Hide cover page */

    coverPage.style.display = "none";


    /* Show invitation page */

    invitationPage.classList.add(
      "active"
    );

    invitationPage.inert = false;

    invitationPage.setAttribute(
      "aria-hidden",
      "false"
    );


    /* Go to top */

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


    /* Create petals */

    requestAnimationFrame(
      () => {

        createPetals(45);

      }
    );

  }
);


/* =========================================
   GO BACK
========================================= */

goBackBtn.addEventListener(
  "click",
  () => {

    /* Move focus outside invitation
       before hiding it */

    openInvitation.focus();


    /* Show cover page */

    coverPage.style.display = "grid";


    /* Hide invitation page */

    invitationPage.classList.remove(
      "active"
    );

    invitationPage.inert = true;

    invitationPage.setAttribute(
      "aria-hidden",
      "true"
    );


    /* Remove petals */

    petals.innerHTML = "";


    /* Go to top */

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================================
   CREATE FALLING PETALS
========================================= */

function createPetals(count) {

  /* Remove old petals */

  petals.innerHTML = "";


  /* Get full invitation height */

  const pageHeight =
    invitationPage.scrollHeight;


  /* Create petals */

  for (
    let i = 0;
    i < count;
    i++
  ) {

    /* Create petal */

    const petal =
      document.createElement("span");


    /* Add class */

    petal.className =
      "petal";


    /* Random horizontal position */

    petal.style.left =
      `${Math.random() * 100}%`;


    /* Random animation duration */

    petal.style.animationDuration =
      `${8 + Math.random() * 8}s`;


    /* Random animation delay */

    petal.style.animationDelay =
      `${Math.random() * 3}s`;


    /* Random horizontal movement */

    petal.style.setProperty(
      "--x",
      `${-100 + Math.random() * 200}px`
    );


    /* Fall through entire page */

    petal.style.setProperty(
      "--fall-distance",
      `${pageHeight + 100}px`
    );


    /* Add petal */

    petals.appendChild(
      petal
    );

  }

}