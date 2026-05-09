const parser = require("./podcastParser");

// [TODO] ✓
// Copy your code for the objects "Podcast", "Episode", and "EpisodeAudio"
// from lab assignment 8 here (without example data!)
function Podcast(titel, beschreibung, autor, besitzerName, besitzerEmail, bildUrl,
                feedUrl, kategorien, letztesUpdate) {
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

  this.addEpisode = function(episode){
    this.episoden.push(episode);
    this.episoden.sort((e1, e2) => e2.datum - e1.datum);
  }
}

function Episode(titel, beschreibung, dauer, datum, audio){
  this.titel = titel;
  this.beschreibung = beschreibung;
  this.dauer = dauer;
  this.datum = datum;
  this.audio = audio;

  this.getDauerInStundenUndMinuten = function(){
    const stunden = Math.floor(this.dauer / (3600000));
    const minuten = Math.floor((this.dauer/60000) % 60);
    return `${stunden}h ${minuten}min`;
  } 
}

function EpisodeAudio(url, groesse, typ){
  this.url = url;
  this.groesse = groesse;
  this.typ = typ;
}
// end

const podcasts = [];

/**
 * Subscribes to a podcast by importing the data from the given feed URL.
 * The import itself is asynchronous, so a callback function is needed for subsequent actions.
 *
 * @param {String} url The feed URL of the podcast to subscribe to.
 * @param {Function} callback Callback function to be called after the import is complete.
 */
function subscribe(url, callback) {
  parser.parseFeed(url, (feed) => {
    podcasts.push(convert(url, feed));
    if (callback) callback();
  });
}

/**
 * Converts the feed data imported from a URL into data objects (Podcast, Episode, EpisodeAudio)
 * suitable for this web application.
 *
 * @param {String} url The feed URL of the podcast from which it was imported.
 * @param {Object} feed Feed object according to https://www.npmjs.com/package/podcast-feed-parser#default
 */
function convert(url, feed) {
  // [TODO] ✓
  const podcast = new Podcast(feed.meta.title, feed.meta.description, feed.meta.author,
    feed.meta.owner.name, feed.meta.owner.email, feed.meta.imageURL, url, feed.meta.categories, 
    feed.meta.lastUpdated);

  console.log(podcast);
  
  for(const ep of feed.episodes){
    const epAudio = new EpisodeAudio(ep.enclosure.url, ep.enclosure.length, ep.enclosure.type);
    const episode = new Episode(ep.title, ep.description, ep.duration, ep.pubDate, epAudio);
    podcast.addEpisode(episode);
    console.log(episode);
  }

  return podcast;
  // const eAudio = new EpisodeAudio(feed.meta.enclosure.url, );
  
  // Implement function
}

// [TODO]
module.exports = {
  podcasts: podcasts,
  subscribe: subscribe
}
// Define the module interface: make the podcasts array and subscribe function accessible from outside