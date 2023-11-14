const express = require("express");
const app = new express;
const portNr = 8080;

const bodyParser = require("body-parser")
const fs = require("fs");
const jsonFilePath = "./data.json";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Listen metod som meddelar när server är igång
app.listen(portNr, () => {
    console.log("Server ligger nu på port nr 8080");
})

//Get Request som returnerar Hello World
app.get("/", (req, res) => {
    console.log("Mottagit ett anropp");
    res.send("Hello World, this is a response");
});

//Get endpoint som returnerar en HTML vy
app.get("/about", (req, res) => {
    res.sendFile("about.html", {root: __dirname});
})

//Post endpoint som sparar payload i JSON format till en fil
app.post("/", (req, res) => {
    //Hämta data från Payload
    const data = req.body;
    const jsonData = JSON.stringify(data, null, 2);

    //Skriva data till fil
    fs.writeFile(jsonFilePath, jsonData, (err) => {
        if (err) console.log(err);
    });

    res.send("Data mottagits: " + jsonData);
})

//Endpoint för att läsa av och returnera data i JSON fil
app.get("/users", (req, res) => {
    //Kontrollera att JSON filen finns
    if (fs.existsSync(jsonFilePath)) {
        fs.readFile(jsonFilePath, "utf8", (err, data) => {
            //Kontrollerar om error finns
            if (err) {
                console.log(err);
                res.send("Något har gått fel");
            }

            //returnera data
            res.send(data);
        })
    } else {
        res.send("Filen finns inte");
    }
})