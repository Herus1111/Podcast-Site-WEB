const express = require("express");
const app = express();

const router = require("./routes/routes.js");

// Надо что-то делать с aside?

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.use(express.urlencoded( { extended: false } ));

app.use(router);

app.use(function(req, res){
    res.status(404).render("fehlerseite");
});

app.listen(8020, function(){
    console.log("Der Server läuft!");
})