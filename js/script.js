function searchAnime(event) {
    event.preventDefault();

    /*  Creating memory for the form data and then saving the search 'query' inside a variable for use*/
    const form = new FormData(this);
    let query = form.get("search");

    /* If someone clears the search bar, then we use a query that gives no results */
    if (query == "") query = "qw27g";

    /* This fetches the API using the search query and converts to JSON and does manipulation by calling JSadd() */
    fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw`)
    .then(response => response.json())
    .then(sbAdd)
    .catch(error => console.warn(error));

    fetch(`https://api.jikan.moe/v4/random/anime`)
    .then(response => response.json())
    .then(function (anime) {
        console.log(anime["data"]);
        console.log("RANDOM Anime: ", anime["data"].title);
        console.log("Episodes:", anime["data"].episodes);
        console.log("MAL:", anime["data"].url);
    });
}

function sbAdd(data) {
    const searchResults = document.getElementById('search-results');
    
    searchResults.innerHTML = data.data.map(an => {
        return `    
        <div class="box">
            <div class="card-image">
                <a href = "${an.url}" target = "_blank"><img src="${an["images"]["jpg"]["image_url"]}"></a>
            </div>
            <div class="card-content">
                <a href = "${an.url}" target = "_blank"><h3 class="card-title">${an.title}</h3></a>
                <a href = "${an.url}" target = "_blank"><p>${an.episodes} EP</p></a>
            </div>
        </div>
    `}).join("");
}

/* Function that waits for a response from the search entry */
function pageLoaded() {
    const form = document.getElementById('search-bar');
    form.addEventListener("submit", searchAnime);
}

/* waits for the "load" event and searches for the search bar and then waits for the submit entry */
window.addEventListener("load", pageLoaded);