const pokemonCount = 151; 
var pokedex = {}; 
// {1 : {'name' : 'eevee', 'img': url, 'type': ['grass', 'poison'], 'description': '...'}}

const imagePokeball = document.getElementById('pokeball-img');
const message = document.getElementById('message'); 

window.onload = async function () {
    getPokemon(1);

    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);

        //<div id="1" class="pokemon-name">BULBASAUR</div>
        let pokemon = document.createElement('div');
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]['name'].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener('click', updatePokemon);
        document.getElementById('pokemon-list').append(pokemon);
    }

    document.getElementById("pokemon-description").innerText = pokedex[1]['desc'];

    console.log(pokedex);
}

async function getPokemon(num) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json(); 
    console.log(pokemon);


let pokemonName = pokemon['name'];
let pokemonType = pokemon['types'];
let pokemonImg = pokemon['sprites']['front_default'];

res = await fetch(pokemon['species']['url']);

let pokemonDesc = await res.json();

// console.log(pokemonDescription);
pokemonDesc = pokemonDesc['flavor_text_entries'][9]['flavor_text'];

pokedex[num] = {'name' : pokemonName, 'img' : pokemonImg, 'types' : pokemonType, 'desc' : pokemonDesc}

} 

function updatePokemon(){

    // Supprime la classe "selected" de tous les Pokémon
    document.querySelectorAll('.pokemon-name').forEach(pokemon => {
        pokemon.classList.remove('selected');
    });

    // Ajoute la classe "selected" au Pokémon cliqué
    this.classList.add('selected');

    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    // clear previous type

    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //Update types
    let types = pokedex[this.id]['types'];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement('span');
        type.innerText = types[i]['type']["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]['type']["name"]); 
        typesDiv.append(type);
    }

    // Update description

    document.getElementById('pokemon-description').innerText = pokedex[this.id]["desc"];
}

// Select the pokeball img and add event on click to see the message during 3secs

imagePokeball.addEventListener('click', () => {
    message.classList.add('visible');

    setTimeout(() => {
        message.classList.remove('visible');
    }, 2000);
});