const fileSelector = document.querySelector('input');
const start = document.querySelector('button');
const img = document.querySelector('img');
const progress = document.querySelector('.progress');
const textarea = document.querySelector('textarea');

fileSelector.onchange = () => {
    const file = fileSelector.files[0];
    const imgUrl = window.URL.createObjectURL(file);
    img.src = imgUrl;
}

start.onclick = () => {
    textarea.innerHTML = '';
    progress.innerHTML = 'Recognizing text...';

    const rec = new Tesseract.TesseractWorker();
    rec.recognize(fileSelector.files[0])
        .progress(function (response) {
            if (response.status == 'recognizing text') {
                progress.innerHTML = response.status + '  ' + (response.progress * 100).toFixed(2) + '%';
            } else {
                progress.innerHTML = response.status;
            }
        })
        .then(function (data) {
            if (data && data.text) {
                textarea.innerHTML = data.text;
                progress.innerHTML = 'Text recognition completed';
            } else {
                progress.innerHTML = 'Error: No text recognized';
            }
        })
        .catch(function (error) {
            progress.innerHTML = 'Error: ' + error.message;
        });
}
