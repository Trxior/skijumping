class Division {
    constructor(name, season) {
        this.name = name;
        this.competitions = [];
        this.currentCompetition = 0;
    }

    startCompetition() {
        this.competitions.push(new Competition(this, this.currentCompetition));
        currentHill = this.competitions[this.currentCompetition].hill;

        if (currentHill !== undefined) {
            const hillTitle = document.getElementById('hill');
            hillTitle.textContent = `${currentHill.name} - ${currentHill.country} [K: ${currentHill.k}, HS: ${currentHill.hs}] - Season ${this.name}`;

            let country = countries.find(obj => obj.name === currentHill.country);

            country.limit += 6;
            this.competitions[this.currentCompetition].registration();
        }
    }
}

const divisions = [
    new Division('20/21')
];
