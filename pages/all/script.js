async function fetchRemoteData() {
    const data = await fetch(chrome.runtime.getURL('infoAnimes.json'))
    const json = await data.json()
    return json.animes
}
function animeCard(anime) {
    return `
        <div class="anime-card">
            <img src="${anime.img}" alt="${anime.name}">
            <h2>${anime.name}</h2>
        </div>
    `
}


const animeContainer = document.getElementById('anime-container')
const animes = await fetchRemoteData()
console.log(animes);
animeContainer.innerHTML = animes.map(animeCard).join('').replaceAll("normal","small")

const searchInput = document.getElementById('search-input')

searchInput.addEventListener('input',() => {
        const filteredAnimes = animes.filter(anime => anime.name.toLowerCase().includes(searchInput.value.toLowerCase()))
        animeContainer.innerHTML = filteredAnimes.map(animeCard).join('').replaceAll("normal","small")
    
})