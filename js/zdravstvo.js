class Osoba {
    constructor(ime, prezime) {
        this.ime = ime;
        this.prezime = prezime;
    }
}

class Pacijent extends Osoba {
    constructor(ime, prezime, jmbg, brojKartona) {
        super(ime, prezime);
        this.jmbg = jmbg;
        this.brojKartona = brojKartona;
        this.doktor = null;
    }
    izaberiDoktora(doktor) {
        this.doktor = doktor;
        doktor.pacijenti.push(this);
    }
}

class Doktor extends Osoba {
    constructor(ime, prezime, specijalnost) {
        super(ime, prezime);
        this.specijalnost = specijalnost;
        this.pacijenti = [];
    }
    zakaziPregled(pacijent, opcija) {
        if (pacijent.doktor == this) {
            var options = {
                hour: "numeric", minute: "numeric", second: "numeric", hour12: false, timeZone: "Europe/Belgrade"
            };
            var formaterTime = new Intl.DateTimeFormat("sr-RS", options);
            var vreme = formaterTime.format(new Date());
            var formaterDate = new Intl.DateTimeFormat("sr-RS");
            var datum = formaterDate.format(new Date());
            if (opcija === 1) {
                console.log("zakazan pregled za krvni pritisak " + pacijent.ime + "\ndatum" + datum + "\nvreme: " + vreme)
                return new KrvniPritisak(vreme, datum, pacijent, this);
            }
            else if (opcija === 2) {
                console.log("zakazan pregled za nivo secera u krvi " + pacijent.ime + "\ndatum" + datum + "\nvreme: " + vreme)
                return new NivoSecera(vreme, datum, pacijent, this);
            }
        }
    }
}

class Pregled {
    constructor(datum, vreme, pacijent, doktor) {
        this.datum = datum;
        this.vreme = vreme;
        this.pacijent = pacijent;
        this.doktor = doktor;
    }
    opisi() {
        console.log(this.doktor + "je zakazao pregled za" + this.pacijent.ime + "\ndatum" + datum + "\nvreme: " + vreme);
    }
}

class KrvniPritisak extends Pregled {
    constructor(datum, vreme, pacijent, doktor) {
        super(datum, vreme, pacijent, doktor);
        this.gornja = null;
        this.donja = null;
        this.puls = null;
    }
    simulirajProgled() {
        this.gornja = Math.floor((Math.random() * 100) + 1);
        this.donja = Math.floor((Math.random() * 100) + 1);
        this.puls = Math.floor((Math.random() * 100) + 1);
        console.log("simuliran pregled nivo secera.\ngornja: " + this.gornja + "\ndonja: " + this.donja + "\npuls: " + this.puls);
    }
}

class NivoSecera extends Pregled {
    constructor(datum, vreme, pacijent, doktor) {
        super(datum, vreme, pacijent, doktor);
        this.vrednost = null;
        this.vremeObroka = null;
    }
    simulirajProgled() {
        this.vrednost = Math.floor((Math.random() * 100) + 1);
        var options = {
            hour: "numeric", minute: "numeric", second: "numeric", hour12: false, timeZone: "Europe/Belgrade",
            year: 'numeric', month: 'long', day: 'numeric'
        };
        var formaterTime = new Intl.DateTimeFormat("sr-RS", options);
        this.vremeObroka = formaterTime.format(new Date());
        console.log("simuliran pregled nivo secera.\nvreme poslednjeg obroka: " + this.vremeObroka + "\nvrednost: " + this.vrednost);
    }
}

function simulacija() {
    var milan = new Doktor("Milan", "Milanovic", "Ortopedija");
    console.log("milan: ", milan);
    var dragan = new Pacijent("Dragan", "Draganovic", "123", "1a");
    console.log("dragan: ", dragan);
    dragan.izaberiDoktora(milan);
    var pregled = milan.zakaziPregled(dragan, 1);
    pregled.simulirajProgled();
    pregled = milan.zakaziPregled(dragan, 2);
    pregled.simulirajProgled();
}