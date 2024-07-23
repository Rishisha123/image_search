const accessKey = "tFiKaVNB1uqfxJ9Ra3n2svOfDSOhDlq0YuTo1Sk0WA8";
const searchForm = document.querySelector("form");
const imagescontainer = document.querySelector(".image-container");
const searchInput = document.querySelector(".search-input");
const loadmorebtn = document.querySelector(".loadmorebtn");

let page = 1;

//function to fetch images using unsplash api
const fetchImages = async (query, pageNo) => {
  try {
    if (pageNo === 1) {
      imagescontainer.innerHTML = "";
    }
    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);
    if (data.results.length > 0) {
      data.results.forEach((photo) => {
        //creatinf image div
        const imagesElement = document.createElement("div");
        imagesElement.classList.add("imageDiv");
        imagesElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

        //create overlay
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        //creating overlay text
        const overlayText = document.createElement("h3");
        overlayText.innerHTML = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);
        imagesElement.appendChild(overlayElement);
        imagescontainer.appendChild(imagesElement);
      });
      if (data.total_pages === pageNo) {
        loadmorebtn.style.display = "none";
      } else {
        loadmorebtn.style.display = "block";
      }
    } else {
      imagescontainer.innerHTML = `<h2>No Image Found.</h2>`;
      if (loadmorebtn.style.display === "block") {
        loadmorebtn.style.display = "none";
      }
    }
  } catch (error) {
    imagescontainer.innerHTML = `<h2>Fail to fetch images. Please Try again later.</h2>`;
  }
};

//adding event listner to search
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    page = 1;
    fetchImages(inputText, page);
  } else {
    imagescontainer.innerHTML = `<h2>Please Enter a search query.</h2>`;
    if (loadmorebtn.style.display === "block") {
      loadmorebtn.style.display = "none";
    }
  }
});

//adding event listner to load more images
loadmorebtn.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});
