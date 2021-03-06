class Competition {
    constructor(division, hill) {
        this.division = division;
        this.hill = hills[hill];
        this.participants = [];
    }

    registration() {
        jumpers.sort((a, b) => {
            if (a.general === b.general) {
                return b.getSkill() - a.getSkill();
            }

            return b.general - a.general;
        });

        for (let i = 0; i < jumpers.length; i++) {
            let country = countries.find(obj => obj.name === jumpers[i].country);
            if (country.limit > 0) {
                if (jumpers[i].division === 1 || country.name === this.hill.country || jumpers[i].general >= 1) {
                    country.limit--;
                    this.participants.push(jumpers[i]);
                } else {
                    if (country.points > 0 || getRandom(1, (4 + jumpers[i].skill)) > 4) {
                        country.limit--;
                        this.participants.push(jumpers[i]);
                    } else if (this.participants.length < 56 && getRandom(1, (4 + jumpers[i].skill)) >= 3) {
                        country.limit--;
                        this.participants.push(jumpers[i]);
                    } else if (this.participants.length < 62 && getRandom(1, (2 + country.limit + jumpers[i].skill)) >= 4) {
                        country.limit--;
                        this.participants.push(jumpers[i]);
                        console.log(jumpers[i].lastName, country.limit);
                    } else {
                        if (jumpers[i].form < 4.95) {
                            jumpers[i].form += .05;
                        }
                    }
                }
            } else {
                if (jumpers[i].form < 4.95) {
                    jumpers[i].form += .05;
                }
            }
        }
        
        // Add waiting list

        this.jumping('qualifications', this.participants.length);
    }

    qualifications() {
        this.participants.sort((a, b) => b.points - a.points);
        for (let i = 0; i < this.participants.length; i++) {
            this.participants[i].general += (this.participants[i].points * 0.00001);
        }
        this.participants.splice(50, this.participants.length);
        this.participants.sort((a, b) => b.general - a.general);
        this.resetAllJumps();
        setTimeout(() => {
            this.jumping('firstJump', 50);
        }, 15000);
    }

    firstRound() {
        this.participants.sort((a, b) => b.points - a.points);
        setTimeout(() => {
            this.jumping('secondJump', 30);
        }, 15000);
    }

    secondRound() {
        this.participants.sort((a, b) => b.points - a.points);
        setTimeout(() => {
            this.final();
        }, 20000);
    }

    final() {
        setTimeout(() => {
            this.addPoints();
            this.setForm();
            setGeneral();
            this.resetAllJumps();
            this.division.currentCompetition++;
            setTimeout(() => {
                this.division.startCompetition();
            }, 20000);
        }, 5000);
    }

    addPoints() {
        const pointsForPlace = [100, 80, 60, 50, 45, 40, 36, 32, 29, 26, 24, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        const jumper = this.participants;

        for (let i = 0; i < 30; i++) {
            let country = countries.find(obj => obj.name === jumper[i].country);

            jumper[i].general += pointsForPlace[i];
            country.points += pointsForPlace[i];
        }
    }

    setForm() {
        const jumper = this.participants;
        for (let i = 0; i < jumper.length; i++) {
            let place = i + 1;

            if (jumper[i].place > place) {
                if (jumper[i].form > 4.5) {
                    jumper[i].form = 5;
                } else {
                    jumper[i].form += .5;
                }
            } else {
                if (jumper[i].form < .5) {
                    jumper[i].form = 0;
                } else {
                    jumper[i].form -= .5;
                }
            }

            jumper[i].place = place;
        }
    }

    resetAllJumps() {
        for (let i = 0; i < jumpers.length; i++) {
            jumpers[i].firstJump = 0;
            jumpers[i].secondJump = 0;
            jumpers[i].points = 0;
        }
    }

    jumping(jump, amount) {
        let participate = amount - 1;
        let inv = setInterval(() => {
            this.participants[participate].jump(jump);

            showResults('competitions', this.participants, participate);

            participate--;
            if (participate < 0) {

                switch (jump) {
                    case 'qualifications':
                        this.qualifications();
                        break;
                    case 'firstJump':
                        this.firstRound();
                        break;
                    case 'secondJump':
                        this.secondRound();
                    default:
                }

                clearInterval(inv);
            }
        }, 100);
    }
}
