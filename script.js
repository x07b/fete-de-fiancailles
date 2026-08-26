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


/* =========================================
   START MUSIC
========================================= */

async function startMusic() {

  try {

    await music.play();

    musicIcon.textContent = "❚❚";

  } catch (error) {

    console.log(
      "Music could not start:",
      error
    );

    musicIcon.textContent = "♫";

  }

}


/* =========================================
   MUSIC BUTTON
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
  async () => {

    /*
       User interaction allows
       the browser to start music.
    */

    await startMusic();


    /*
       Stop cover video when
       leaving the cover page.
    */

    const coverVideos = document.querySelectorAll(
      ".cover-video"
    );

    coverVideos.forEach((video) => {

      video.pause();

    });


    /*
       Hide cover page.
    */

    coverPage.style.display = "none";


    /*
       Activate invitation page.
    */

    invitationPage.classList.add(
      "active"
    );


    /*
       Remove inert so the invitation
       can receive focus and interaction.
    */

    invitationPage.inert = false;


    /*
       Scroll to top immediately.
    */

    window.scrollTo({

      top: 0,

      behavior: "auto"

    });


    /*
       Wait until the invitation
       is visible before focusing.
    */

    requestAnimationFrame(() => {

      goBackBtn.focus();

      createPetals(24);

    });

  }
);


/* =========================================
   GO BACK
========================================= */

goBackBtn.addEventListener(
  "click",
  () => {


    /*
       FIRST:
       Show the cover page.
    */

    coverPage.style.display = "grid";


    /*
       SECOND:
       Move focus OUTSIDE
       invitationPage.

       This is the important fix.
    */

    openInvitation.focus();


    /*
       Wait one animation frame
       so the browser registers
       the new focused element.
    */

    requestAnimationFrame(() => {


      /*
         Now it is safe to make
         invitationPage inert.
      */

      invitationPage.inert = true;


      /*
         Hide invitation.
      */

      invitationPage.classList.remove(
        "active"
      );


      /*
         Remove petals.
      */

      petals.innerHTML = "";


      /*
         Return to top.
      */

      window.scrollTo({

        top: 0,

        behavior: "auto"

      });


      /*
         Restart the appropriate
         cover video.
      */

      const coverVideos =
        document.querySelectorAll(
          ".cover-video"
        );

      coverVideos.forEach((video) => {

        video.play().catch(() => {});

      });

    });

  }
);


/* =========================================
   CREATE FALLING PETALS
========================================= */

function createPetals(count) {


  /*
     Remove existing petals first.
  */

  petals.innerHTML = "";


  /*
     Get invitation page height.
  */

  const pageHeight =
    invitationPage.scrollHeight;


  /*
     Create elements in memory first.

     This is slightly more efficient
     than repeatedly adding directly
     to the DOM.
  */

  const fragment =
    document.createDocumentFragment();


  /*
     Create petals.
  */

  for (let i = 0; i < count; i++) {


    const petal =
      document.createElement("span");


    petal.className =
      "petal";


    /*
       Random horizontal position.
    */

    petal.style.left =
      `${Math.random() * 100}%`;


    /*
       Random animation duration.
    */

    petal.style.animationDuration =
      `${8 + Math.random() * 8}s`;


    /*
       Random animation delay.
    */

    petal.style.animationDelay =
      `${Math.random() * 3}s`;


    /*
       Random horizontal movement.
    */

    petal.style.setProperty(

      "--x",

      `${-100 + Math.random() * 200}px`

    );


    /*
       Full falling distance.
    */

    petal.style.setProperty(

      "--fall-distance",

      `${pageHeight + 100}px`

    );


    /*
       Add to fragment.
    */

    fragment.appendChild(
      petal
    );

  }


  /*
     Add everything at once.
  */

  petals.appendChild(
    fragment
  );

}