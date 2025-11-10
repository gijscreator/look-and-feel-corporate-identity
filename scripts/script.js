document.addEventListener("DOMContentLoaded", () => {
  // All our picture info
  const pictures = [
    { src: "assets/handgeschaaft.jpg", alt: "Handgeschaaft", name: "Anna van Veen", place: "Amsterdam Oost" },
    { src: "assets/autofiat.jpg", alt: "Auto Fiat", name: "Bram de Groot", place: "Rotterdam Centrum" },
    { src: "assets/bikerental.jpg", alt: "Bike rental", name: "Clara Meijer", place: "Utrecht Zuid" },
    { src: "assets/fietaanpaal.jpg", alt: "Fiets aan paal", name: "Daan Visser", place: "Den Haag" },
    { src: "assets/fietsbijtrap.jpg", alt: "Fiets bij trap", name: "Eva Janssen", place: "Leiden" },
    { src: "assets/fietsbord.jpg", alt: "Fietsbord", name: "Finn Bakker", place: "Haarlem" },
    { src: "assets/onibus.jpg", alt: "Bus", name: "Gwen Vos", place: "Eindhoven" },
    { src: "assets/stoplicht.jpg", alt: "Stoplicht", name: "Hugo Peters", place: "Groningen" }
  ];

  // ------------------------------------------------Code gemaakt door ai alleen voor voor voorbeeld display van de detailpagina

  // Get elements from dom
  const button = document.querySelector(".grid-list-toggle");
  const gallery = document.querySelector("article.images ul");
  const bigImage = document.getElementById("detail-image");
  const nameText = document.getElementById("detail-name");
  const placeText = document.getElementById("detail-location");
  const onDetailPage = bigImage && nameText && placeText;

  if (onDetailPage) {
    // Find out which picture to show
    const urlBits = new URLSearchParams(window.location.search);
    const index = parseInt(urlBits.get("i"));
    const chosenPic = pictures[index];

    if (chosenPic) {
      bigImage.src = chosenPic.src;
      bigImage.alt = chosenPic.alt;
      nameText.textContent = chosenPic.name;
      placeText.textContent = chosenPic.place;
    } else {
      bigImage.remove();
      const spot = document.querySelector(".detail-card") || document.querySelector("figure");
      if (spot) spot.insertAdjacentHTML("beforeend", "<p>Sorry, picture not found.</p>");
    }
    return;
  }

  // If no gallery, stop
  if (!gallery) return;

  // Make sure gallery looks like a grid first
  if (!gallery.classList.contains("images-grid") && !gallery.classList.contains("images-list")) {
    gallery.classList.add("images-grid");
  }

  // Show all the little pictures
  gallery.innerHTML = pictures.map((pic, i) => `
    <li data-index="${i}">
      <figure>
        <img src="${pic.src}" alt="${pic.alt}" loading="lazy">
        <article><p>${pic.name}</p><p>${pic.place}</p></article>
      </figure>
    </li>
  `).join("");

  // When you click a little picture, go to the detail page
  gallery.addEventListener("click", event => {
    const item = event.target.closest("li");
    if (!item) return;
    window.location.href = `detailpagina.html?i=${item.dataset.index}`;
  });

  // When you click the toggle button, switch grid <-> list
  if (button) {
    button.addEventListener("click", () => {
      const isGrid = gallery.classList.contains("images-grid");
      gallery.classList.toggle("images-grid", !isGrid);
      gallery.classList.toggle("images-list", isGrid);
    });
  }
});

// tot hier door ai 

// Camera input voor mobiel de camera en desktop de file browser
document.getElementById("cameraInput").addEventListener("change", event => {
  const file = event.target.files[0];
  if (file) console.log("You took a picture!", file);
});
