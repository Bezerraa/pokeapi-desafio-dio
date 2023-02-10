const pokemonsList = document.getElementById('pokemon-list')
const loadMoreButton = document.getElementById('loadMoreButton')
let offset =0;
const limit = 5;
const maxRecords = 151;

function pokemonToList(convertPokemon){
    
    return `<li class="pokemon ${convertPokemon.type}">
        <span class="number">#${convertPokemon.number}</span>
        <span class="name">${convertPokemon.name}</span>
        
        <div class="details">
        <ol class="types">
            ${convertPokemon.types.map((type)=> `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${convertPokemon.photo}" alt="${convertPokemon.name}">
        </div> 
</li>`
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newList = pokemons.map((pokemon) => {return pokemonToList(pokemon)})
        const newHTML = newList.join('')
        pokemonsList.innerHTML += newHTML   
        
        ///OPÇÃO MAIS VERBOSA
        // const itemsList = []
        // for (let i = 0; i < pokemons.length; i++) {
        //     const pokemon = pokemons[i];
        //     itemsList.push(pokemonToList(pokemon))
        // }
        
    })
}
loadPokemonItems(offset,limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const recordsNextPage = offset + limit
    if(recordsNextPage >= maxRecords){
        const finalLimit = maxRecords - offset
        loadPokemonItems(offset, finalLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        
    }
    else{
    loadPokemonItems(offset,limit)
}
})
