// js/comics.js
const ts = 1;
const publicKey = "e9f51575fb2e8b37eb1aff750cac4c8a";
const hash = "f0cd5b1d19316ea3dbd9462a7cd67b2e";

const params = new URLSearchParams(window.location.search);
const characterId = params.get("characterId");
const container = document.getElementById("comics-list");

if (!characterId) {
  container.innerHTML = "<p>No character selected. Go back to Characters.</p>";
} else {
  fetch(
    `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  )
    .then((res) => res.json())
    .then((json) => {
      json.data.results.forEach((comic) => {
        const card = document.createElement("div");
        card.className = "comic-card";
        card.innerHTML = `
          <h3>${comic.title}</h3>
          <img src="${comic.thumbnail.path}.${
          comic.thumbnail.extension
        }" alt="${comic.title}" />
          <p>${comic.description || "No description available."}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Fetch comics failed:", err);
      container.innerHTML = "<p>Unable to load comics right now.</p>";
    });
}
