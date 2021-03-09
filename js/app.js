const pointsForPlace = [100, 80, 60, 50, 45, 40, 36, 32, 29, 26, 24, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let jump, currentHill;
let startingList = [];
let hill = 0;
let competitionRound = 0;

jumpers.sort((a, b) => a.skill < b.skill ? 1 : -1);

function setHill() {
    currentHill = hills[hill];
    console.log(currentHill);
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function calc() {
    setHill();
    for (let i = 1; i <= 10; i++) {
        let min = -5 / 9 * Math.pow((i - 10), 2) + currentHill.k * (.95 + .05 + .05 - (10 - i) / 400);
        let max = -5 / 9 * Math.pow((i - 10), 2) + currentHill.hs * (1.025 + (0 + i) / 400);

        console.log(`${i} || ${min.toFixed(0)} - ${max.toFixed(0)}`);
    }
}

//wyłonienie zawodników z kwoty startowej - 50 - 70

function start() {
    setHill();

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
                    startingList.sort((a, b) => a.points < b.points ? 1 : -1);
                    startingList.splice(50, startingList.length);
                    startingList.sort((a, b) => a.general < b.general ? 1 : -1);
                    resetAllJumps();
                    setTimeout(() => {
                        competitions();
                    }, 10000);
                    break;
                case 'firstJump':
                    startingList.sort((a, b) => a.points < b.points ? 1 : -1);
                    startingList.splice(30, startingList.length);
                    setTimeout(() => {
                        competitions();
                    }, 10000);
                    break;
                case 'secondJump':
                    setTimeout(() => {
                        competitions();
                    }, 10000);
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
                startingList[i] = jumpers[i];
            }
            /*
                        startingList.splice(70, startingList.length);
            */
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

showResults('ranking', null);
