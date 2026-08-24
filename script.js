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

    console.log(
      "Autoplay blocked. Music will start after user interaction."
    );

  }
}


/* =========================================
   AUTOPLAY ON PAGE LOAD
========================================= */

window.addEventListener("load", () => {

  startMusic();

});


/* =========================================
   FALLBACK:
   START MUSIC ON FIRST USER INTERACTION
========================================= */

document.addEventListener(
  "pointerdown",
  () => {

    if (music.paused) {

      startMusic();

    }

  },
  {
    once: true
  }
);


/* =========================================
   MUSIC TOGGLE BUTTON
========================================= */

musicToggle.addEventListener(
  "click",
  async (event) => {

    event.stopPropagation();


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

    /* Make sure music is playing */

    if (music.paused) {

      startMusic();

    }


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


    /* Move keyboard focus */

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

  }
);


/* =========================================
   GO BACK
========================================= */

goBackBtn.addEventListener(
  "click",
  () => {

    /* Show cover page first */

    coverPage.style.display = "grid";


    /* Move focus outside invitation */

    openInvitation.focus();


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


  /*
    Get the complete height
    of the invitation page
  */

  const pageHeight =
    invitationPage.scrollHeight;


  /*
    Create petals
  */

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


    /*
      Make the petal fall
      through the complete page
    */

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