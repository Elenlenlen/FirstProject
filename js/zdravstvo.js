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
    this.pregledi = [];
    var logString = `Kreiran pacijent ${this.ime}`;
    log(logString);
  }

  izaberiDoktora(doktor) {
    this.doktor = doktor;
    doktor.dodajPacijenta(this);
    var logString = `Pacijent ${this.ime} izabrao je doktora ${doktor.ime}`;
    log(logString);
  }

  dodajPregled(pregled) {
    this.pregledi.push(pregled);
  }

  obaviPregled(pregled) {
    pregled.simulirajProgled();
  }
}

class Doktor extends Osoba {
  constructor(ime, prezime, specijalnost) {
    super(ime, prezime);
    this.specijalnost = specijalnost;
    this.pacijenti = [];
    var logString = `Kreiran doktor ${this.ime}`;
    log(logString);
  }

  dodajPacijenta(pacijent) {
    this.pacijenti.push(pacijent);
  }

  zakaziPregled(pacijent, opcija) {
    if (pacijent.doktor == this) {
      var options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZone: 'Europe/Belgrade'
      };
      var formaterTime = new Intl.DateTimeFormat('sr-RS', options);
      var vreme = formaterTime.format(new Date());
      var formaterDate = new Intl.DateTimeFormat('sr-RS');
      var datum = formaterDate.format(new Date());
      var pregled = {};
      if (opcija === 1) {
        pregled = new KrvniPritisak(vreme, datum, pacijent, this);
      } else if (opcija === 2) {
        pregled = new NivoSecera(vreme, datum, pacijent, this);
      } else if (opcija === 3) {
        pregled = new NivoHolesterola(vreme, datum, pacijent, this);
      }
      pacijent.dodajPregled(pregled);
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
    return `Pacijent ${this.pacijent.ime} je po nalogu doktora ${
      this.doktor.ime
    } obavio pregled za `;
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
    this.gornja = Math.floor(Math.random() * 100 + 1);
    this.donja = Math.floor(Math.random() * 100 + 1);
    this.puls = Math.floor(Math.random() * 100 + 1);
    var logString = `krvni pritisak.\nRezultati:\ngornja: ${
      this.gornja
    }\ndonja: ${this.donja}\npuls: ${this.puls}`;
    log(this.opisi() + logString);
  }
}

class NivoHolesterola extends Pregled {
  constructor(datum, vreme, pacijent, doktor) {
    super(datum, vreme, pacijent, doktor);
    this.vrednost = null;
    this.vremeObroka = null;
  }

  simulirajProgled() {
    this.vrednost = Math.floor(Math.random() * 100 + 1);
    var options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'Europe/Belgrade',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    var formaterTime = new Intl.DateTimeFormat('sr-Latn', options);
    this.vremeObroka = formaterTime.format(new Date());
    var logString = `nivo holesterola \nRezultati:\nvreme poslednjeg obroka: ${
      this.vremeObroka
    }\nvrednost: ${this.vrednost}`;
    log(this.opisi() + logString);
  }
}

class NivoSecera extends Pregled {
  constructor(datum, vreme, pacijent, doktor) {
    super(datum, vreme, pacijent, doktor);
    this.vrednost = null;
    this.vremeObroka = null;
  }

  simulirajProgled() {
    this.vrednost = Math.floor(Math.random() * 100 + 1);
    var options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'Europe/Belgrade',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    var formaterTime = new Intl.DateTimeFormat('sr-Latn', options);
    this.vremeObroka = formaterTime.format(new Date());
    var logString = `nivo secera u krvi.\nRezultati:\nvreme poslednjeg obroka: ${
      this.vremeObroka
    }\nvrednost: ${this.vrednost}`;
    log(this.opisi() + logString);
  }
}

function log(logString) {
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'Europe/Belgrade'
  };
  var formaterTime = new Intl.DateTimeFormat('sr-Latn', options);
  this.vreme = formaterTime.format(new Date());
  console.log(`[${vreme}]\t` + logString);
}

function simulacija() {
  var milan = new Doktor('Milan', 'Milanovic', 'Ortopedija');
  var dragan = new Pacijent('Dragan', 'Draganovic', '123', '1a');
  dragan.izaberiDoktora(milan);
  milan.zakaziPregled(dragan, 1);
  milan.zakaziPregled(dragan, 2);
  milan.zakaziPregled(dragan, 3);
  simulirajPreglede(dragan);
}

function simulirajPreglede(pacijent) {
  pacijent.pregledi.forEach(element => {
    element.simulirajProgled();
  });
}
