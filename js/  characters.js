// js/characters.js
const ts = 1;
const publicKey = "e9f51575fb2e8b37eb1aff750cac4c8a";
const hash = "f0cd5b1d19316ea3dbd9462a7cd67b2e"; // md5(ts + privateKey + publicKey)

const container = document.getElementById("character-list");

fetch(
  `https://gateway.marvel.com/v1/public/characters?limit=10&ts=${ts}&apikey=${publicKey}&hash=${hash}`
)
  .then((res) => res.json())
  .then((json) => {
    json.data.results.forEach((hero) => {
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `
        <h3>${hero.name}</h3>
        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${
        hero.name
      }" />
        <p>${hero.description || "No description available."}</p>
        <a class="detail-link" href="comics.html?characterId=${hero.id}">
          View Comics ▶
        </a>
      `;
      container.appendChild(card);
    });
  })
  .catch((err) => {
    console.error("Fetch characters failed:", err);
    container.innerHTML = "<p>Unable to load characters right now.</p>";
  });
