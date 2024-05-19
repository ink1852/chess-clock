const images = [
    "pexels-1.jpg",
    "pexels-2.jpg",
    "pexels-3.jpg",
    "pexels-4.jpg",
    "pexels-5.jpg",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `IMG/${chosenImage}`;

document.body.appendChild(bgImage);

bgImage.classList.add("bgImgStyle"); 