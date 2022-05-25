function topAnime(event) {
    event.preventDefault();
    let limit = 0;

    /* Deciding what the limit query argument should be, based on what was clicked on the page */
    if (event.target.id == 'btn5') {
        limit = 5;
    }
    else if (event.target.id == 'btn10') {
        limit = 10;
    }
    else if (event.target.id == 'btn15') {
        limit = 15;
    }
    else if (event.target.id == 'btn20') {
        limit = 20;
    }
    else if (event.target.id == 'btn25') {
        limit = 25;
    }

    /* This is the logic for getting the top anime and fitlering */
    let filter = "finished";
    let page = 1;

    fetch(`https://api.jikan.moe/v4/top/anime?&page=${page}&limit=${limit}`)
    .then(response => response.json())
    .then(arAdd)
    .catch(error => console.warn(error));
}

function arAdd(data) {
    const randomResults = document.getElementById('random-results');

    randomResults.innerHTML = data.data.map(an => {
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

/* Function that waits for a response from the button */
function pageLoaded() {
    const form = document.getElementById('btn5');
    form.addEventListener("click", topAnime);

    const form2 = document.getElementById('btn10');
    form2.addEventListener("click", topAnime);

    const form3 = document.getElementById('btn15');
    form3.addEventListener("click", topAnime);

    const form4 = document.getElementById('btn20');
    form4.addEventListener("click", topAnime);

    const form5 = document.getElementById('btn25');
    form5.addEventListener("click", topAnime);
}

/* waits for the "load" event and searches for the button and waits for a response */
window.addEventListener("load", pageLoaded);