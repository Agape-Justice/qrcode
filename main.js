const qrCodeBox = document.querySelector('.qrCodeBox');
const writeBox = document.querySelector('.writeBox');
const generateBtn = document.querySelector('.generateBtn');
const alertBox = document.querySelector('.alert');
const load = document.querySelector('.load');
const image = document.querySelector('#image');
let imageSrc = image.src;


// window.addEventListener('load', (e) => {
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker.register ('sw.js')
//         .then (reg => {
//             console.log('registration sucessful:', reg); 
//         }).catch(e => {
//             console.log('and error occured:',e);
//         })
//     }    
// })

(generateBtn.addEventListener('click', (e) => {
    let writeBoxValue = writeBox.value;
    e.preventDefault();
    if (writeBox.value === "") {
        alertBox.style.display = 'block';
        image.style.display = 'none';
        setTimeout (() => {
        alertBox.style.display = 'none';
        },1000)
    }

    else {
        if (navigator.onLine) {
            async function fetchData() {
                let apiString = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${writeBoxValue}`;
                let response = await fetch(apiString);
                let data = URL.createObjectURL(await response.blob())
                image.src = data;
                image.style.display = 'none';
                load.style.display = 'block';
                setTimeout(() => {
                    load.style.display = 'none';
                    image.style.display = 'block';
                }, 1000)
            }
            fetchData()
        }

        else {
            alertBox.innerHTML = "You're Offline";
            alertBox.style.display = 'block';
            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 1000)
        }
    }

})
)()
