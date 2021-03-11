const pointsForPlace = [100, 80, 60, 50, 45, 40, 36, 32, 29, 26, 24, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let jump, currentHill;
let startingList = [];
let hill = 0;
let competitionRound = 0;

showResults('ranking', null);

function setHill() {
    currentHill = hills[hill];

    const hillTitle = document.getElementById('hill');
    hillTitle.textContent = `${currentHill.name} - ${currentHill.country} [K: ${currentHill.k}, HS: ${currentHill.hs}]`;
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function calc() {
    setHill();
    for (let i = 1; i <= 10; i++) {
        let min = -4 / 9 * Math.pow((i - 10), 2) + currentHill.k * (.95 + .05 + .05 - (10 - i) / 400);
        let max = -4 / 9 * Math.pow((i - 10), 2) + currentHill.hs * (1.025 + (0 + i) / 400);

        console.log(`${i} || ${min.toFixed(0)} - ${max.toFixed(0)}`);
    }
}

function start() {
    setHill();
    startingList = [];

    let country = countries.find(obj => obj.name === currentHill.country);
    country.limit += 6;

    if (currentHill !== undefined) {
        competitions();
    }
}

function jumping(jump, amount) {
    let participate = amount - 1;
    let inv = setInterval(() => {
        startingList[participate].jump(jump);

        participate--;
        if (participate < 0) {

            switch (jump) {
                case 'qualifications':
                    startingList.sort((a, b) => b.points - a.points);
                    startingList.splice(50, startingList.length);
                    startingList.sort((a, b) => b.general - a.general);
                    resetAllJumps();
                    setTimeout(() => {
                        competitions();
                    }, 10000);
                    break;
                case 'firstJump':
                    startingList.sort((a, b) => b.points - a.points);
                    startingList.splice(30, startingList.length);
                    setTimeout(() => {
                        competitions();
                    }, 10000);
                    break;
                case 'secondJump':
                    setTimeout(() => {
                        competitions();
                    }, 30000);
                default:
            }

            clearInterval(inv);
        }
    }, 100);
}


function competitions() {
    switch (competitionRound) {
        case 0:
            for (i = 0; i < jumpers.length; i++) {
                let country = countries.find(obj => obj.name === jumpers[i].country);
                if (country.limit > 0) {
                    country.limit--;
                    startingList.push(jumpers[i]);
                }
            }

            jumping('qualifications', startingList.length);
            break;
        case 1:
            jumping('firstJump', 50);
            break;
        case 2:
            jumping('secondJump', 30);
            break;
        case 3:
            jump = null;
            competitionRound = -1;

            setTimeout(() => {
                setGeneral();
                resetAllJumps();
                hill++;

                setTimeout(() => {
                    start();
                }, 10000);
            }, 5000);
            break;
        default:
    }
    competitionRound++;
}

function resetAllJumps() {
    for (let i = 0; i < jumpers.length; i++) {
        jumpers[i].firstJump = 0;
        jumpers[i].secondJump = 0;
        jumpers[i].points = 0;
    }
}

const startBtn = document.getElementById('start');
startBtn.addEventListener('click', function () {
    startBtn.style.display = 'none';
    start();
})
