import { setupCardClickListeners, closeDetails, getCategoryItems, loading } from './game.js';
class game {
    constructor({ id, title, thumbnail, short_description, game_url, genre, platform, publisher, developer, release_date, freetogame_profile_url }) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.short_description = short_description;
        this.game_url = game_url;
        this.genre = genre;
        this.platform = platform;
        this.publisher = publisher;
        this.developer = developer;
        this.release_date = release_date;
        this.freetogame_profile_url = freetogame_profile_url;
    }
}


export class gameDetail {
    constructor({
        id,
        title,
        thumbnail,
        status,
        short_description,
        description,
        game_url,
        genre,
        platform,
        publisher,
        developer,
        release_date,
        freetogame_profile_url,
        minimum_system_requirements,
        screenshots
    }) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.status = status;
        this.short_description = short_description;
        this.description = description;
        this.game_url = game_url;
        this.genre = genre;
        this.platform = platform;
        this.publisher = publisher;
        this.developer = developer;
        this.release_date = release_date;
        this.freetogame_profile_url = freetogame_profile_url;

        // Optional — handle undefined or missing nested objects safely
        this.minimum_system_requirements = minimum_system_requirements || {
            os: '',
            processor: '',
            memory: '',
            graphics: '',
            storage: ''
        };

        // Optional — handle undefined screenshots
        this.screenshots = Array.isArray(screenshots) ? screenshots : [];
    }

    // Example method to display game info

}

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'bf1d2b4a3dmsh19598150da62f4ap14704cjsn9ce4c92f0522',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

export async function getGamesData(gategory = '') {
    console.log('getitemData');
    console.log('search' + gategory);
    loading.classList.remove('d-none');
    let currentGategory = `&category=${gategory}`
    try {
        if (gategory == '' || gategory == null) {

            currentGategory = `&category=mmorpg`
            console.log('currentLocation' + currentGategory);

        }

        console.log('currentLocation:' + currentGategory);

        console.log('url:' + `https://free-to-play-games-database.p.rapidapi.com/api/games?${currentGategory}`, options);

        let data = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?${currentGategory}`, options)
        // console.log('data:', data);

        data = await data.json();
        console.log('data:', data);
        let gameList = data.map(g => new game(g));
        console.log('gameList:', gameList);
        showGames(gameList);
        loading.classList.add('d-none');
        setupCardClickListeners();
    }
    catch (e) {
        console.log('error getitemData:' + e.message);
        loading.classList.add('d-none');
    }
}


export async function getGamesDetial(gameId) {
    console.log('getitemData');

    loading.classList.remove('d-none');

    try {

        console.log('currentLocation:' + gameId);

        console.log('url:' + `https://free-to-play-games-database.p.rapidapi.com/api/games?id=4${gameId}`, options);

        let data = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options)
        // console.log('data:', data);

        data = await data.json();
        console.log('data:', data);
        let gameDetails = new gameDetail(data);
        console.log('gameList:', gameDetails);
        showGameDetails(gameDetails);
        loading.classList.add('d-none');
        closeDetails();
    }
    catch (e) {
        console.log('error getGamesDetial:' + e.message);
        loading.classList.add('d-none');
    }
}

function showGames(gameList) {
    const gamesContainer = document.getElementById('gameData');
    gamesContainer.innerHTML = ''; // Clear previous content
    var data = '';
    gameList.forEach(game => {
        data += ` <div class="col">
                            <div data-id="${game.id}" class="card h-100 bg-transparent" role="button">
                                <div class=" card-body">
                                    <figure class="position-relative">
                                        <img class="card-img-top object-fit-cover h-100"
                                            src="${game.thumbnail}" alt="${game.title}">

                                    </figure>

                                    <figcaption>

                                        <div class="hstack justify-content-between">
                                            <h3 class="h6 small text-white">${game.title}</h3>
                                            <span class="badge text-bg-primary p-2">Free</span>
                                        </div>

                                        <p class="card-text small text-center opacity-50 text-white">
                                           ${game.short_description}
                                        </p>

                                    </figcaption>
                                </div>

                                <footer class="card-footer small hstack justify-content-between">

                                    <span class="badge badge-color">${game.genre}</span>
                                    <span class="badge badge-color">${game.platform}</span>

                                </footer>
                            </div>
                        </div>`;
    });
    gamesContainer.innerHTML = data;
}

function showGameDetails(gameData) {
    const gamesContainer = document.getElementById('detailsContent');
    gamesContainer.innerHTML = ''; // Clear previous content

    gamesContainer.innerHTML = `  <div class="col-md-4">
                    <img src="${gameData.thumbnail}" class="w-100" alt="image details">
                </div>
                <div class="col-md-8">
                    <h3>${gameData.title}</h3>
                    <p>Category: <span class="badge text-bg-info"> ${gameData.genre}</span> </p>
                    <p>Platform: <span class="badge text-bg-info"> ${gameData.platform}</span> </p>
                    <p>Status: <span class="badge text-bg-info"> ${gameData.status}</span> </p>
                    <p class="small">${gameData.description}</p>
                    <a class="btn btn-outline-warning text-white" target="_blank"
                        href="${gameData.game_url}">Show Game</a>
                </div>`;
}