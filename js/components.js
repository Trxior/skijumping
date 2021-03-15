const results = document.querySelector('.results__jumpers');

function updateLastJump(obj) {

    const firstMetres = (obj.firstJump > 0) ? `${obj.firstJump} m` : `-`;
    const secondMetres = (obj.secondJump > 0) ? `${obj.secondJump} m` : `-`;

    const lastJump = document.querySelector('.last-jump');
    lastJump.innerHTML = `
        <div class="last-jump__info">
            <div class="last-jump__country">
                <img class="last-jump__country-flag" src="./img/${obj.country}.png">
            </div>
            <div class="last-jump__name">
                ${obj.firstName} <span class="text--bold">${obj.lastName}</span>
            </div>
        </div>
        <div class="last-jump__result">
            <div class="last-jump__points" id="first-jump">
                <span>1st jump</span>
                <span class="text--bold">${firstMetres}</span>
            </div>
            <div class="last-jump__points" id="second-jump">
                <span>2nd jump</span>
                <span class="text--bold">${secondMetres}</span>
            </div>
            <div class="last-jump__points">
                <span class="text--bold">Points</span>
                <span class="text--bold">${obj.points.toFixed(1)}</span>
            </div>
        </div>`;
}

function createResultsTile(index, obj, rank, active) {

    const firstMetres = (obj.firstJump > 0) ? `${obj.firstJump} m` : `-`;
    const secondMetres = (obj.secondJump > 0) ? `${obj.secondJump} m` : `-`;
    const generalPoints = (obj.general > 0) ? `${obj.general.toFixed(0)}` : `-`;
    let clasification;

    const resultTile = document.createElement('div');
    resultTile.classList.add('results__tile');
    if (rank === 'competitions') {
        (active) ? resultTile.classList.add('results__tile--active'): null;
        clasification = `
        <div class="results__points">${firstMetres}</div>
        <div class="results__points">${secondMetres}</div>
        <div class="results__points text--bold">${obj.points.toFixed(1)}</div>`;
    }

    if (rank === 'ranking') {
        clasification = `
        <div class="results__points"></div>
        <div class="results__points"></div>
        <div class="results__points text--bold">${generalPoints}</div>`;
    }
    resultTile.innerHTML = `
        <div class="results__place">${++index}</div>
        <div class="results__country">
            <img class="results__country-flag" src="./img/${obj.country}.png">
        </div>
        <div class="results__name">
            <span class="text--bold">${obj.lastName}</span> ${obj.firstName}
        </div>
        ${clasification}`;
    results.appendChild(resultTile);
}

function showResults(type, arr, index) {

    let sortedArray = [...arr];

    results.innerHTML = '';

    if (type === 'competitions') {
        sortedArray.sort((a, b) => b.points - a.points);
    }

    if (type === 'ranking') {
        sortedArray.sort((a, b) => {
            if (a.general === b.general) {
                return b.getSkill() - a.getSkill();
            }

            return b.general - a.general;
        });
    }

    for (let i = 0; i < arr.length; i++) {

        let active = false;
        if (arr[index] === sortedArray[i]) {
            active = true;
        }

        createResultsTile(
            i,
            sortedArray[i],
            type,
            active);
    }
}

function setGeneral() {
    for (let i = 0; i < countries.length; i++) {
        countries[i].limit = 0;
    }
    
    jumpers.sort((a, b) => {
        if (a.general === b.general) {
            return b.getSkill() - a.getSkill();
        }

        return b.general - a.general;
    });

    showResults('ranking', jumpers, null);

    for (let i = 0; i < jumpers.length; i++) {
        let country = countries.find(obj => obj.name === jumpers[i].country);

        (i < 55 && country.limit < 6) ? country.limit++: null;
    }

    for (let i = 0; i < countries.length; i++) {
        let limit = countries[i].limit;
        if (limit === 2 || limit === 3) {
            countries[i].limit = 4;
        } else if (limit === 1) {
            countries[i].limit = 3;
        } else if (limit === 0) {
            countries[i].limit = 2;
        }
    }

    for (let i = 0, x = 0; i < jumpers.length; i++) {
        let country = countries.find(obj => obj.name === jumpers[i].country);

        if (country.limit !== 7) {
            country.limit++;
            x++;
        }

        if (x === 3) {
            break;
        }
    }

    countries.sort((a, b) => {
        if (a.limit === b.limit) {
            return b.points - a.points;
        }

        return b.limit - a.limit;
    });
    console.table(countries);
};
