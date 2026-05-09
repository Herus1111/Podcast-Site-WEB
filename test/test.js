const http = require("http");
const db = require("../models/persistence");

// Importiert nacheinander die Feeds der Podcasts
// "Syntax" und "Working Draft"
db.subscribe("https://feeds.megaphone.fm/FSI1483080183", () => {
    db.subscribe("https://workingdraft.de/feed/", () => {
        console.log("Podcasts importiert.");
        serverErzeugen();
    });
});

function htmlErzeugen(){
    let html =
        `
            <!DOCTYPE html>
            <html lang="de">
            <head>
                <meta charset="utf-8">
                <title>Podcast App Test</title>
            </head>
            <body> 
                <h1>Podcast App Test</h1>`;
            
    for(const p of db.podcasts){
        html += `<hr>
                <h2>${p.titel}</h2>
                <p>${p.beschreibung}</p>
                <img src="${p.bildUrl}" width="100" height="100" alt="logo">
                <ul>`;
        for(const e of p.episoden){
            html += `<li>${e.titel}</li>`;
        }
        html += `</ul>`;
    }

    html += `</body>
            </html>
            `;
    return html;
}

function serverErzeugen() {
    

    http.createServer(function (req, res) {
        console.log("Anfrage!");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(htmlErzeugen());
    }).listen(8844, function () {
        console.log("Der Server läuft!");
    });
}
