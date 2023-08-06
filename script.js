const apikey = "5y9O_EUf9txqh2QRgfSKDFlGrtE-3LN2qK75ki_gI6Q"
const formE1 = document.querySelector("form")
const inputE1 = document.getElementById("search-bar")
const searchResults = document.querySelector(".search-result-section")
const showMore = document.getElementById("show-more-btn")

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apikey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = ""
    }
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description

        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description
        imageLink.style.textDecoration = "none"
        imageLink.style.color = "white"

        // js for download button 
        const downloadIcon = document.createElement("i");
        downloadIcon.classList.add("fa-solid", "fa-download", "download-icon");
        downloadIcon.title = "Download Image";
        downloadIcon.addEventListener("click", () => downloadImage(result.urls.full, result.alt_description));

        // Apply styles for min-width: 425px using JavaScript
        const applyStyles = () => {
            if (window.innerWidth >= 425) {
                imageLink.style.textDecoration = "none";
                imageLink.style.color = "black";
            } else {
                imageLink.style.textDecoration = "none";
                imageLink.style.color = "white";
            }
        };

        // Apply styles initially
        applyStyles();



        // Add an event listener to handle changes when the screen is resized
        window.addEventListener("resize", applyStyles);

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(downloadIcon);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });
    page++
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1;
    searchImages()
});
function downloadImage(imageUrl, imageName) {
    fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = imageName || "image";
            link.target = "_blank";
            link.click();
        })
        .catch((error) => {
            console.error("Error downloading image:", error);
        });
}

showMore.addEventListener("click", () => {

    searchImages();
});