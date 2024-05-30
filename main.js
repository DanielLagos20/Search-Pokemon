const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $loader = document.querySelector(".loader-container");
const $containerError = document.querySelector(".container-error");
const $containerPokemon = document.querySelector(".container-pokemon");

$loader.style.display = "none";
$containerError.style.display = "none";

$form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    $loader.style.display = "block";
    $containerError.style.display = "none";
    $containerPokemon.innerHTML = "";

    let pokemonInput = $input.value.toLowerCase();
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`
    );

    if (!response.ok) {
      throw new Error("Escriba bien el nombre NO SEA LARRY.");
    }
    let pokemonData = await response.json();
    let imageUrl =
      pokemonData.sprites.other["official-artwork"].front_default ||
      pokemonData.sprites.other.dream_world.front_default ||
      pokemonData.sprites.front_default;
    let $templatePokemon = `
    <article>
      <img src="${imageUrl}" alt="${pokemonData.name}">
      <h2>${pokemonData.name.toUpperCase()}</h2>
    </article>`;
    $containerPokemon.innerHTML = $templatePokemon;
  } catch (err) {
    $containerError.querySelector("h2").innerText =
      err.message || "Ocurrio un error al mostrar el pokemon";
    $containerError.style.display = "block";
  } finally {
    $loader.style.display = "none"; // Ocultar el loader independientemente del resultado
  }
});
