/* ========================================
   PREVIEWS DEL ÍNDICE
======================================== */

const projectRows =
  document.querySelectorAll(
    '.project-row[data-preview]'
  );

const previewPanel =
  document.querySelector(
    '.preview-panel'
  );

const previews =
  document.querySelectorAll(
    '.preview-placeholder'
  );


if (
  previewPanel &&
  projectRows.length > 0
) {

  projectRows.forEach((row) => {

    row.addEventListener(
      'mouseenter',
      () => {

        const previewId =
          row.dataset.preview;


        previews.forEach(
          (preview) => {

            const isActive =
              preview.id === previewId;

            preview.classList.toggle(
              'is-active',
              isActive
            );

          }
        );


        previewPanel.classList.add(
          'is-visible'
        );

      }
    );


    row.addEventListener(
      'mouseleave',
      () => {

        previewPanel.classList.remove(
          'is-visible'
        );

      }
    );

  });

}


/* ========================================
   PLAYER DE MÚSICA
======================================== */

const playButtons =
  document.querySelectorAll(
    '.track-play'
  );

const audioTracks =
  document.querySelectorAll(
    '.track-row audio'
  );


function resetPlayers() {

  playButtons.forEach(
    (button) => {

      button.textContent =
        'PLAY';

    }
  );

}


function stopOtherTracks(
  activeAudio
) {

  audioTracks.forEach(
    (audio) => {

      if (
        audio !== activeAudio
      ) {

        audio.pause();

        audio.currentTime = 0;

      }

    }
  );

}


playButtons.forEach(
  (button) => {

    button.addEventListener(
      'click',
      () => {

        const audioId =
          button.dataset.audio;

        const selectedAudio =
          document.getElementById(
            audioId
          );


        if (!selectedAudio) {
          return;
        }


        /* ========================================
           SI YA ESTÁ SONANDO
        ========================================= */

        if (
          !selectedAudio.paused
        ) {

          selectedAudio.pause();

          button.textContent =
            'PLAY';

          return;

        }


        /* ========================================
           DETENER LAS DEMÁS
        ========================================= */

        stopOtherTracks(
          selectedAudio
        );

        resetPlayers();


        /* ========================================
           REPRODUCIR
        ========================================= */

        selectedAudio
          .play()
          .then(() => {

            button.textContent =
              'PAUSE';

          })
          .catch(
            (error) => {

              console.error(
                'No se pudo reproducir el audio:',
                error
              );

            }
          );

      }
    );

  }
);


/* ========================================
   CUANDO TERMINA UN TRACK
======================================== */

audioTracks.forEach(
  (audio) => {

    audio.addEventListener(
      'ended',
      () => {

        audio.currentTime = 0;

        resetPlayers();

      }
    );

  }
);
