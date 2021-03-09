class Jumper {
    constructor(firstName, lastName, country, skill) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.country = country;
        this.skill = skill;
        this.form = skill;
        this.active = false;
        this.qualifications = 0;
        this.firstJump = 0;
        this.secondJump = 0;
        this.points = 0;
        this.general = 0;
        this.place = 30;
    }

    jump(jump) {
        let minusSkill = this.getDistance('min', this);
        let plusSkill = this.getDistance('max', this);

        this[jump] = getRandom(minusSkill, plusSkill);

        this.points += this.calculatePoints(this[jump]);

        showResults('competitions', this);

//        updateLastJump(this);
    }

    getDistance(minmax, jumper) {
        let bonus = 0;
        let skill = (this.skill + this.form) / 2;

        if (this.country === currentHill.country) {
            bonus = 0.05;

            if (skill < 9) {
                skill += 1;
            } else if (skill >= 9) {
                skill = 10;
            }
        }

        if (minmax === 'min') {
            return (-5 / 9 * Math.pow((skill - 10), 2) + currentHill.k * (.95 + bonus - (10 - skill) / 400)).toFixed(0);
        }

        if (minmax === 'max') {
            return (-5 / 9 * Math.pow((skill - 10), 2) + currentHill.hs * (1.025 + (0 + skill) / 400)).toFixed(0);
        }
    }

    getNotes(pts, max) {
        let arr = [];

        for (let i = 0; i < 5; i++) {
            let points = pts + 0.5 * (getRandom(0, max));
            arr.push(points);
        }

        arr.sort();
        arr.shift();
        arr.pop();

        return arr.reduce((a, b) => a + b);
    }

    calculatePoints(distance) {
        let points, notes, k, hill = currentHill.k;

        if (hill > 170) {
            k = 1.2;
        } else if (hill > 100) {
            k = 1.8;
        } else if (hill <= 100) {
            k = 2;
        }

        if (distance > hill + 15) {
            notes = this.getNotes(16, 8);
        } else if (distance > hill + 5) {
            notes = this.getNotes(17, 4);
        } else if (distance > hill - 5) {
            notes = this.getNotes(16, 5);
        } else if (distance <= hill - 5) {
            notes = this.getNotes(15, 6);
        }

        points = 60 + (distance - hill) * k + notes;
        (points <= 0) ? points = 0.001: null;

        return points;
    }
}

const jumpers = [
    // Poland
    new Jumper('Kamil', 'Stoch', 'Poland', 10),
    new Jumper('Dawid', 'Kubacki', 'Poland', 9),
    new Jumper('Piotr', 'Żyła', 'Poland', 9),
    new Jumper('Andrzej', 'Stękała', 'Poland', 6),
    new Jumper('Jakub', 'Wolny', 'Poland', 5),
    new Jumper('Klemens', 'Murańka', 'Poland', 5),
    new Jumper('Aleksander', 'Zniszczoł', 'Poland', 4),
    new Jumper('Paweł', 'Wąsek', 'Poland', 3),
    new Jumper('Maciej', 'Kot', 'Poland', 2),
    new Jumper('Stefan', 'Hula', 'Poland', 2),
    new Jumper('Tomasz', 'Pilch', 'Poland', 2),
    // Germany
    new Jumper('Pius', 'Paschke', 'Germany', 7),
    new Jumper('Constantin', 'Schmid', 'Germany', 6),
    new Jumper('Karl', 'Geiger', 'Germany', 9),
    new Jumper('Markus', 'Eisenbichler', 'Germany', 9),
    new Jumper('Martin', 'Hamann', 'Germany', 5),
    new Jumper('Severin', 'Freund', 'Germany', 5),
    new Jumper('Richard', 'Freitag', 'Germany', 3),
    new Jumper('Moritz', 'Baer', 'Germany', 2),
    new Jumper('Luca', 'Roth', 'Germany', 2),
    new Jumper('Kilian', 'Maerkl', 'Germany', 1),
    new Jumper('David', 'Siegel', 'Germany', 2),
    new Jumper('Andreas', 'Wellinger', 'Germany', 1),
    new Jumper('Felix', 'Hoffmann', 'Germany', 2),
    new Jumper('Andreas', 'Wank', 'Germany', 2),
    // Norway
    new Jumper('Daniel Andre', 'Tande', 'Norway', 8),
    new Jumper('Halvor Egner', 'Granerud', 'Norway', 10),
    new Jumper('Robert', 'Johannson', 'Norway', 9),
    new Jumper('Marius', 'Lindvik', 'Norway', 8),
    new Jumper('Johann Andre', 'Forfang', 'Norway', 6),
    new Jumper('Sander Vossan', 'Eriksen', 'Norway', 3),
    new Jumper('Anders', 'Haare', 'Norway', 3),
    new Jumper('Thomas Aasen', 'Markeng', 'Norway', 3),
    new Jumper('Robin', 'Pedersen', 'Norway', 2),
    new Jumper('Andreas Granerud', 'Buskum', 'Norway', 2),
    // Austria
    new Jumper('Stefan', 'Kraft', 'Austria', 9),
    new Jumper('Daniel', 'Huber', 'Austria', 7),
    new Jumper('Philipp', 'Aschenwald', 'Austria', 7),
    new Jumper('Michael', 'Hayboeck', 'Austria', 7),
    new Jumper('Thomas', 'Lackner', 'Austria', 3),
    new Jumper('Jan', 'Hoerl', 'Austria', 4),
    new Jumper('Markus', 'Schiffner', 'Austria', 4),
    new Jumper('Manuel', 'Fettner', 'Austria', 3),
    new Jumper('Daniel', 'Tschofenig', 'Austria', 3),
    new Jumper('Clemens', 'Leitner', 'Austria', 3),
    new Jumper('Ulrich', 'Wohlgenannt', 'Austria', 3),
    new Jumper('Stefan', 'Huber', 'Austria', 3),
    new Jumper('Maximilian', 'Steiner', 'Austria', 2),
    new Jumper('David', 'Haagen', 'Austria', 2),
    new Jumper('Timon-Pascal', 'Kahofer', 'Austria', 2),
    new Jumper('Gregor', 'Schlierenzauer', 'Austria', 3),
    new Jumper('Stefan', 'Rainer', 'Austria', 1),
    new Jumper('Thomas', 'Hofer', 'Austria', 1),
    // Slovenia
    new Jumper('Anze', 'Lanisek', 'Slovenia', 8),
    new Jumper('Bor', 'Pavlovcic', 'Slovenia', 7),
    new Jumper('Cene', 'Prevc', 'Slovenia', 6),
    new Jumper('Peter', 'Prevc', 'Slovenia', 6),
    new Jumper('Domen', 'Prevc', 'Slovenia', 5),
    new Jumper('Ziga', 'Jelar', 'Slovenia', 5),
    new Jumper('Timi', 'Zajc', 'Slovenia', 3),
    new Jumper('Tilen', 'Bartol', 'Slovenia', 3),
    new Jumper('Anze', 'Semenic', 'Slovenia', 3),
    new Jumper('Jernej', 'Presecnik', 'Slovenia', 2),
    new Jumper('Zak', 'Mogel', 'Slovenia', 2),
    new Jumper('Justin', 'Rok', 'Slovenia', 2),
    new Jumper('Jaka', 'Hvala', 'Slovenia', 1),
    // Japan
    new Jumper('Yukiya', 'Sato', 'Japan', 8),
    new Jumper('Keiichi', 'Sato', 'Japan', 6),
    new Jumper('Ryoyu', 'Kobayashi', 'Japan', 9),
    new Jumper('Junshiro', 'Kobayashi', 'Japan', 5),
    new Jumper('Naoki', 'Nakamura', 'Japan', 5),
    new Jumper('Daiki', 'Ito', 'Japan', 2),
    new Jumper('Yuken', 'Iwasa', 'Japan', 3),
    new Jumper('Shohei', 'Tochimoto', 'Japan', 1),
    new Jumper('Taku', 'Takeuchi', 'Japan', 1),
    // Russia
    new Jumper('Evgeniy', 'Klimov', 'Russia', 6),
    new Jumper('Danil', 'Sadreev', 'Russia', 3),
    new Jumper('Michail', 'Nazarov', 'Russia', 4),
    new Jumper('Denis', 'Kornilov', 'Russia', 2),
    new Jumper('Mankov', 'Ilya', 'Russia', 2),
    new Jumper('Roman Sergeevich', 'Trofimov', 'Russia', 3),
    new Jumper('Ilmir', 'Hazetdinov', 'Russia', 1),
    new Jumper('Dmitriy', 'Vassiliev', 'Russia', 1),
    // Switzerland
    new Jumper('Kilian', 'Peier', 'Switzerland', 6),
    new Jumper('Simon', 'Ammann', 'Switzerland', 5),
    new Jumper('Gregor', 'Deschwanden', 'Switzerland', 5),
    new Jumper('Dominik', 'Peter', 'Switzerland', 3),
    new Jumper('Andreas', 'Schuler', 'Switzerland', 2),
    new Jumper('Sandro', 'Hauswirth', 'Switzerland', 1),
    new Jumper('Luca', 'Egloff', 'Switzerland', 1),
    // Finland
    new Jumper('Niko', 'Kytosaho', 'Finland', 5),
    new Jumper('Antti', 'Aalto', 'Finland', 6),
    new Jumper('Eetu', 'Nousiainen', 'Finland', 2),
    new Jumper('Jarkko', 'Maatta', 'Finland', 2),
    new Jumper('Andreas', 'Alamommo', 'Finland', 1),
    new Jumper('Arttu', 'Pohjola', 'Finland', 1),
    new Jumper('Juho', 'Ojala', 'Finland', 1),
    // Czech
    new Jumper('Cestmir', 'Kozisek', 'Czech', 3),
    new Jumper('Viktor', 'Polasek', 'Czech', 3),
    new Jumper('Filip', 'Sakala', 'Czech', 2),
    new Jumper('Vojtech', 'Stursa', 'Czech', 2),
    new Jumper('Roman', 'Koudelka', 'Czech', 2),
    new Jumper('Tomas', 'Vancura', 'Czech', 1),
    // Kazakhstan
    new Jumper('Sergey', 'Tkachenko', 'Kazakhstan', 3),
    new Jumper('Sabirzan', 'Muminov', 'Kazakhstan', 2),
    new Jumper('Danil', 'Vasiliev', 'Kazakhstan', 1),
    new Jumper('Nikita', 'Devyatkin', 'Kazakhstan', 1),
    new Jumper('Nurshat', 'Tursunzhanov', 'Kazakhstan', 1),
    // USA
    new Jumper('Decker', 'Dean', 'USA', 2),
    new Jumper('Kevin', 'Bickner', 'USA', 2),
    new Jumper('Casey', 'Larson', 'USA', 1),
    new Jumper('Andrew', 'Urlaub', 'USA', 1),
    new Jumper('Erik', 'Belshaw', 'USA', 1),
    // Canada
    new Jumper('Mackenzie', 'Boyd-Clowes', 'Canada', 5),
    new Jumper('Matthew', 'Soukup', 'Canada', 1),
    // Italy
    new Jumper('Giovanni', 'Bresadola', 'Italy', 3),
    new Jumper('Daniel', 'Moroder', 'Italy', 1),
    new Jumper('Francesco', 'Cecon', 'Italy', 1),
    new Jumper('Davide', 'Bresadola', 'Italy', 1),
    new Jumper('Alex', 'Insam', 'Italy', 2),
    // Estonia
    new Jumper('Artti', 'Aigro', 'Estonia', 4),
    new Jumper('Kevin', 'Maltsev', 'Estonia', 1),
    new Jumper('Martti', 'Nomme', 'Estonia', 1),
    // Bulgaria
    new Jumper('Vladimir', 'Zografski', 'Bulgaria', 4),
    // France 
    new Jumper('Mathis', 'Contamine', 'France', 1),
    new Jumper('Jonathan', 'Learoyd', 'France', 1),
    new Jumper('Valentin', 'Foubert', 'France', 1),
    new Jumper('Paul', 'Brasme', 'France', 1),
    // Ukraine
    new Jumper('Vitalij', 'Kalinichenko', 'Ukraine', 2),
    new Jumper('Yevhen', 'Marusiak', 'Ukraine', 1),
    new Jumper('Anton', 'Korchuk', 'Ukraine', 1),
    new Jumper('Andrii', 'Vaskul', 'Ukraine', 1),
    // Romania
    new Jumper('Daniel Andrei', 'Cacina', 'Romania', 1),
    new Jumper('Andrei', 'Feldorean', 'Romania', 1),
    new Jumper('Nicolae', 'Mitrofan', 'Romania', 1),
    new Jumper('Mihnea Alexandru', 'Spulber', 'Romania', 1),
];
