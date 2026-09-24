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
