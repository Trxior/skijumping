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
        <div class="results__points text--bold">${obj.general}</div>`;
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

function showResults(type, activeJumper) {
    results.innerHTML = '';

    if (type === 'competitions') {
        jumpers.sort((a, b) => a.points < b.points ? 1 : -1);
    }

    if (type === 'ranking') {
        jumpers.sort((a, b) => a.general < b.general ? 1 : -1);
    }

    for (let i = 0; i < jumpers.length; i++) {

        let active = false;
        if (activeJumper === jumpers[i]) {
            active = true;
        }

        createResultsTile(
            i,
            jumpers[i],
            type,
            active);
    }
}

function setGeneral() {
    for (let i = 0; i < 30; i++) {
        jumpers[i].general += pointsForPlace[i];
    }

    for (let i = 0; i < jumpers.length; i++) {
        if (i + 1 > jumpers[i].place && jumpers[i].form > 1) {
            jumpers[i].form -= 1;
        }

        if (i + 1 <= jumpers[i].place && jumpers[i].form < 10) {
            jumpers[i].form += 1;
        }

        jumpers[i].place = i + 1;
    }

    showResults('ranking', null);
};
