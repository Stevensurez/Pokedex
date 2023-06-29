const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemon = document.getElementById('pokeName');
const buttonSearch = document.getElementById('searchPokemon');
const appNode = document.getElementById('app');
const removePokemon = document.getElementById('borrarPokemon');

buttonSearch.addEventListener('click', insertarPokemon);
removePokemon.addEventListener('click', borrarPokemon);

function insertarPokemon(){

    fetch(`${baseUrl}${pokemon.value.toLowerCase()}`)
    .then(response => {
        if(response.status === 404){
            alert('Este pokemon no esta disponible. Revise nuevamente');
        }else {
            return response.json();
        }
    })
    .then(responseJson => {
        const allItems = [];
        const result = [];

        for(let pokemonInf in responseJson) {
            result.push([pokemonInf, responseJson[pokemonInf]])
        }

        console.table(result)

        const pokeImagen = document.createElement('img');
        pokeImagen.src = result[14][1].front_default;

        const pokemonName = document.createElement('h1');
        pokemonName.innerText = `Name: ${result[10][1]} | id: ${result[6][1]}`;

        const pokemonType = document.createElement('h3');
        pokemonType.innerText = `Type: ${result[16][1][0].type.name}`;

        const contenedor = document.createElement('div');
        contenedor.append(pokeImagen, pokemonName, pokemonType);

        allItems.push(contenedor);
        appNode.append(...allItems);
    })
}

function borrarPokemon(){
    let allPokemon = appNode.childNodes;
    allPokemon = Array.from(allPokemon)

    allPokemon.forEach(pokemons => {
        pokemons.remove(pokemons);
    })

}
