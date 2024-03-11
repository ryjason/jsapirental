// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBe1xUqj036yNCdrE9qexTiCTrsndNg8is",
//   authDomain: "camerarental-d3ccd.firebaseapp.com",
//   projectId: "camerarental-d3ccd",
//   storageBucket: "camerarental-d3ccd.appspot.com",
//   messagingSenderId: "637223677110",
//   appId: "1:637223677110:web:cf55bbe627e40ebaf74a17",
//   measurementId: "G-BSF88S2WZ7"
// };

// var database = firebase.database()

const camerasElement = document.querySelector("#camera");
let cameraList = {};

// function get() {
//     var user_ref = database.ref('users/'+'')

// }

/* async displayCameras Function */
const displayCameras = (cameraList) => {
    cameraList.forEach((camera) => {
        const article = document.createElement("article");
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        h3.textContent = camera.cameraName;
        h4.textContent = camera.cost;
        const img = document.createElement("img");
        img.src = camera.imageUrl;
        img.alt = "img";
        article.appendChild(h3);
        article.appendChild(img);
        article.appendChild(h4);
        camerasElement.appendChild(article);
    });
};

/* async getCameras Function using fetch()*/
const getCameras = async () => {
    const response = await fetch("https://ryjason.github.io/jsapirental/api.json");
    cameraList = await response.json();
    displayCameras(cameraList);
};

/* reset Function */
const reset = () => {
    camerasElement.innerHTML = "";
};

/* filterCameras Function */
const filterCameras = (cameras) => {
    reset();
    const filter = document.getElementById("filtered").value;
    switch (filter) {
        case "sony":
            displayCameras(cameras.filter(camera => camera.brand.toLowerCase().includes("sony")));
            break;
        case "fuji":
            displayCameras(cameras.filter(camera => camera.brand.toLowerCase().includes("fujifilm")));
            break;
        case "nikon":
            displayCameras(cameras.filter(camera => camera.brand.toLowerCase().includes("nikon")));
            break;
        case "canon":
            displayCameras(cameras.filter(camera => camera.brand.toLowerCase().includes("canon")));
            break;
        case "all":
            displayCameras(cameras);
            break;
        default:
            break;
    }
};

/* Event Listener */
document.querySelector("#filtered").addEventListener("change", () => { filterCameras(cameraList) });
getCameras();
