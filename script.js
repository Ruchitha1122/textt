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

            const formData = new FormData();
            formData.append('file', fileSelector.files[0]);
            formData.append('apikey', 'K84186434788957'); // Replace 'YOUR_API_KEY' with your actual API key

            fetch('https://api.ocr.space/parse/image', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.ParsedResults && data.ParsedResults.length > 0 && data.ParsedResults[0].ParsedText) {
                    textarea.innerHTML = data.ParsedResults[0].ParsedText;
                    progress.innerHTML = 'Text recognition completed';
                } else {
                    progress.innerHTML = 'Error: No text recognized';
                }
            })
            .catch(error => {
                progress.innerHTML = 'Error: ' + error.message;
            });
}
        
