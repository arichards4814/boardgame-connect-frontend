const fetchCatan = (game) => {
    return fetch(`https://www.boardgameatlas.com/api/search?name=${game}&client_id=SB1VGnDv7M`)
}


export default fetchCatan