const {readFile} = require('fs-extra');

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const filesInput = form.querySelector('#files');
  const downloadLink = document.getElementById('download');
  const overlay = document.querySelector('.overlay');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    overlay.classList.remove('hide');
    let result = '';
    const files = Array.from(filesInput.files)
    for (let file of files) {
      const navFileContent = await readFile(file.path, 'utf-8');
      const line = `Line ${file.name.replace('.nav', '')}`;
      result += `${line}\n${navFileContent}`;
    }

    downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result));

    overlay.classList.add('hide');
    downloadLink.classList.add('show');
    form.classList.add('hide');
  });

  downloadLink.addEventListener('click', () => {
    overlay.classList.remove('hide');
    form.reset();
    setTimeout(() => {
      downloadLink.classList.remove('show');
      form.classList.remove('hide');
    }, 1500);
    setTimeout(() => {
      overlay.classList.add('hide');
    }, 2000);
  });

});
