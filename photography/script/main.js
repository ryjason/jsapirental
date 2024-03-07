const camerasElement = document.querySelector("#camera");
let cameraList = {};

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
    const response = await fetch("https://ryjason.github.io/cse121b/finalapi.json");
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
