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
                country.limit--;
                this.participants.push(jumpers[i]);
            }
        }
        this.jumping('qualifications', this.participants.length);
    }

    qualifications() {
        this.participants.sort((a, b) => b.points - a.points);
        this.participants.splice(50, this.participants.length);
        this.participants.sort((a, b) => b.general - a.general);
        this.resetAllJumps();
        setTimeout(() => {
            this.jumping('firstJump', 50);
        }, 10000);

    }

    firstRound() {
        this.participants.sort((a, b) => b.points - a.points);
        setTimeout(() => {
            this.jumping('secondJump', 30);
        }, 10000);
    }

    secondRound() {
        this.participants.sort((a, b) => b.points - a.points);
        setTimeout(() => {
            this.final();
        }, 30000);
    }

    final() {
        setTimeout(() => {
            setGeneral();
            this.resetAllJumps();
            this.division.currentCompetition++;
            setTimeout(() => {
                this.division.startCompetition();
            }, 15000);
        }, 5000);
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
        }, 200);
    }
}
