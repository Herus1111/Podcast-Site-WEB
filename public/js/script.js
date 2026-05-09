const getViewportWidth = () => window.innerWidth ||
    document.documentElement.clientWidth;
console.log(`Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`)

if(getViewportWidth() < (0.3 * screen.width)){
    alert("Die Viewport-Breite ist kleiner als 30 % der Bildschirmbreite.")
}

/* Projekt 08 */
class Podcast {
  constructor(titel, beschreibung, autor, besitzerName, besitzerEmail, bildUrl, feedUrl, kategorien, letztesUpdate) {
    this.titel = titel;
    this.beschreibung = beschreibung;
    this.autor = autor;
    this.besitzerName = besitzerName;
    this.besitzerEmail = besitzerEmail;
    this.bildUrl = bildUrl;
    this.feedUrl = feedUrl;
    this.kategorien = kategorien;
    this.letztesUpdate = letztesUpdate;
    this.episoden = [];
  }

  addEpisode(episode){
    this.episoden.push(episode);
    this.episoden.sort((e1, e2) => e2.datum-e1.datum)
  }

}


class Episode{
    constructor(titel, beschreibung, dauer, datum, audio){
        this.titel = titel;
        this.beschreibung = beschreibung;
        this.dauer = dauer;
        this.datum = datum;
        this.audio = audio;
    }

    getDauerInStundenUndMinuten(){
        const minutenGesamt = Math.floor(this.dauer / 60000); // ms → Minuten
        const stunden = Math.floor(minutenGesamt / 60);
        const minuten = minutenGesamt % 60;
        return stunden + "h " + minuten + "min";
    }

}

class EpisodeAudio {
  constructor(url, groesse, typ) {
    this.url = url;       
    this.groesse = groesse; 
    this.typ = typ;        
  }
}



let audio1 = new EpisodeAudio("https://webtalk.de/ep1.mp3", 20000000, "audio/mpeg");
let audio2 = new EpisodeAudio("https://webtalk.de/ep2.mp3", 18000000, "audio/mpeg");
let audio3 = new EpisodeAudio("https://aiweekly.de/ep1.mp3", 22000000, "audio/mpeg");
let audio4 = new EpisodeAudio("https://aiweekly.de/ep2.mp3", 24000000, "audio/mpeg");

let ep1 = new Episode(
  "Einführung",
  "Vorstellung des Podcasts",
  3600000,
  new Date("2025-01-05T10:00:00"),
  audio1
);

let ep2 = new Episode(
  "JavaScript Basics",
  "Grundlagen von JavaScript",
  5400000,
  new Date("2025-01-10T12:00:00"),
  audio2
);

let ep3 = new Episode(
  "Was ist KI?",
  "Einführung in künstliche Intelligenz",
  4200000,
  new Date("2025-01-03T09:00:00"),
  audio3
);

let ep4 = new Episode(
  "Machine Learning",
  "Grundlagen von ML",
  4800000,
  new Date("2025-01-12T14:00:00"),
  audio4
);

let podcast1 = new Podcast(
  "Web Tech Talk",
  "Podcast über Web-Technologien",
  "Max Mustermann",
  "Tech Media",
  "info@techmedia.de",
  "https://techmedia.de/logo.png",
  "https://techmedia.de/feed.xml",
  ["Technology", "Web"],
  new Date()
);

let podcast2 = new Podcast(
  "AI Weekly",
  "Podcast über künstliche Intelligenz",
  "Anna Beispiel",
  "AI Studio",
  "contact@aistudio.com",
  "https://aistudio.com/logo.png",
  "https://aistudio.com/rss.xml",
  ["AI", "Technology"],
  new Date()
);

podcast1.addEpisode(ep1);
podcast1.addEpisode(ep2);

podcast2.addEpisode(ep3);
podcast2.addEpisode(ep4);

let podcasts = [podcast1, podcast2];


for (let p of podcasts) {
  console.log(p.titel + ":");

  for (let e of p.episoden) {
    console.log(" " + e.titel + " (" + e.getDauerInStundenUndMinuten() + ")");
  }
}