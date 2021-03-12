let currentHill = null;

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function calc(k, hs) {
    for (let i = 1; i <= 10; i++) {
        let min = -4 / 9 * Math.pow((i - 10), 2) + k * (.95 + .05 + .05 - (10 - i) / 400);
        let max = -4 / 9 * Math.pow((i - 10), 2) + hs * (1.025 + (0 + i) / 400);

        console.log(`${i} || ${min.toFixed(0)} - ${max.toFixed(0)}`);
    }
}

const startBtn = document.getElementById('start');
startBtn.addEventListener('click', function () {
    startBtn.style.display = 'none';
    divisions[0].startCompetition();
})
