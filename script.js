const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

const openInvitation = document.getElementById("openInvitation");
const goBackBtn = document.getElementById("goBackBtn");

const coverPage = document.getElementById("coverPage");
const invitationPage = document.getElementById("invitationPage");

const petals = document.getElementById("petals");

music.volume = 0.55;


/* =========================================
   MUSIC
========================================= */

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

  /* Start music after user interaction */

  await startMusic();


  /* Stop cover videos */

  const coverVideos =
    document.querySelectorAll(".cover-video");

  coverVideos.forEach((video) => {
    video.pause();
  });


  /* Hide cover */

  coverPage.style.display = "none";


  /* Show invitation */

  invitationPage.classList.add("active");

  invitationPage.inert = false;


  /*
     IMPORTANT:

     Start at the very top.
  */

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });


  /*
     Wait until the invitation
     has been rendered.
  */

  requestAnimationFrame(() => {

    /*
       Make sure we stay at the top.

       We focus the invitation container,
       NOT the Retour button.
    */

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
    });


    /*
       Focus without causing scroll.
    */

    invitationPage.focus({
      preventScroll: true
    });


    /* Create petals */

    createPetals(24);

  });

});


/* =========================================
   GO BACK
========================================= */

goBackBtn.addEventListener("click", () => {


  /*
     Show the cover first.
  */

  coverPage.style.display = "grid";


  /*
     Move focus outside invitation.
  */

  openInvitation.focus({
    preventScroll: true
  });


  requestAnimationFrame(() => {


    /*
       Make invitation inactive.
  */

    invitationPage.inert = true;

    invitationPage.classList.remove("active");


    /*
       Remove petals.
  */

    petals.innerHTML = "";


    /*
       Return to top.
  */

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
    });


    /*
       Restart cover videos.
  */

    const coverVideos =
      document.querySelectorAll(".cover-video");

    coverVideos.forEach((video) => {

      video.play().catch(() => {});

    });

  });

});


/* =========================================
   CREATE FALLING PETALS
========================================= */

function createPetals(count) {

  /* Remove old petals */

  petals.innerHTML = "";


  /* Get page height */

  const pageHeight =
    invitationPage.scrollHeight;


  /*
     Create petals in memory first.
  */

  const fragment =
    document.createDocumentFragment();


  for (let i = 0; i < count; i++) {

    const petal =
      document.createElement("span");

    petal.className = "petal";


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


    /* Falling distance */

    petal.style.setProperty(
      "--fall-distance",
      `${pageHeight + 100}px`
    );


    fragment.appendChild(petal);

  }


  /* Add all petals at once */

  petals.appendChild(fragment);

}