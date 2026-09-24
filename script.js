/* ========================================
   PREVIEWS DEL ÍNDICE
======================================== */

const rows = document.querySelectorAll('.project-row');
const previewPanel = document.querySelector('.preview-panel');
const previews = document.querySelectorAll('.preview-placeholder');

rows.forEach((row) => {

  row.addEventListener('mouseenter', () => {

    const previewId = row.dataset.preview;

    previews.forEach((preview) => {

      preview.classList.toggle(
        'is-active',
        preview.id === previewId
      );

    });

    previewPanel.classList.add('is-visible');

  });


  row.addEventListener('mouseleave', () => {

    previewPanel.classList.remove('is-visible');

  });

});


/* ========================================
   PLAYER — 1992
======================================== */

const playButtons = document.querySelectorAll('.track-play');
const audioTracks = document.querySelectorAll('.track-row audio');


function resetTrackUI() {

  playButtons.forEach((button) => {
    button.textContent = 'PLAY';
  });

  document
    .querySelectorAll('.track-row')
    .forEach((row) => {
      row.classList.remove('is-playing');
    });

}


function stopOtherTracks(activeAudio) {

  audioTracks.forEach((audio) => {

    if (audio !== activeAudio) {

      audio.pause();
      audio.currentTime = 0;

    }

  });

}


playButtons.forEach((button) => {

  button.addEventListener('click', () => {

    const audioId = button.dataset.audio;
    const audio = document.getElementById(audioId);

    if (!audio) {
      return;
    }


    /* SI YA ESTÁ SONANDO, PAUSAR */

    if (!audio.paused) {

      audio.pause();

      button.textContent = 'PLAY';

      button
        .closest('.track-row')
        .classList.remove('is-playing');

      return;

    }


    /* DETENER LOS DEMÁS */

    stopOtherTracks(audio);

    resetTrackUI();


    /* REPRODUCIR */

    audio
      .play()
      .then(() => {

        button.textContent = 'PAUSE';

        button
          .closest('.track-row')
          .classList.add('is-playing');

      })
      .catch((error) => {

        console.error(
          'No se pudo reproducir el audio:',
          error
        );

      });

  });

});


/* ========================================
   CUANDO TERMINA UNA CANCIÓN
======================================== */

audioTracks.forEach((audio) => {

  audio.addEventListener('ended', () => {

    resetTrackUI();

    audio.currentTime = 0;

  });

});
