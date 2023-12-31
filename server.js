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
    //res.send("Hello World, this is a response");
    res.sendFile("index.html", {root: __dirname});
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

//Endpoint för inloggning
app.post("/login", (req, res) => {
    const userDataPath = "./user.json";

    //Hämta payload data
    const loginUser = req.body;

    if (fs.existsSync(userDataPath)) {
        fs.readFile(userDataPath, "utf8", (err, users) => {
            //Kontrollerar om error finns
            if (err) {
                console.log(err);
                res.send("Något har gått fel");
            }

            users = JSON.parse(users);
            //console.log(loginUser);

            let userFound = false;
            users.forEach( (user) => {
                //console.log(user);
                //Kontrollera om username matchar, samt även password
                if (user.username === loginUser.username) {
                    userFound = true;
                    //Kontrollera lösenordet
                    if (user.password === loginUser.password) {
                        //Hittat en match. Login lyckas.
                         res.sendFile("profile.html", {root: __dirname});
                    }
                    //Returnera Fail om fel lösenord
                     else res.sendFile("failed.html", {root: __dirname});
                }
            })
        
            //Returnera fail om ingen user hittades
               if (userFound == false) res.sendFile("failed.html", {root: __dirname});
            // if (!userFound)         res.sendFile("failed.html", {root: __dirname});

        })
    } else {
        res.send("Filen finns inte");
    }

})

//Endpoint för att komma till registrerings sidan
app.get("/register", (req, res) => {
    res.sendFile("register.html", {root: __dirname} );
})

//Endpoint för att registrera ny user
app.post("/register", (req, res) => {
    //Sökväg till user.json
    const userDataPath = "./user.json";

    //Hämta payload data
    const newUser = req.body;

    fs.readFile(userDataPath, "utf8", (err, users) => {
        //TODO: Kontrollera err om något har gått fel

        //Konvertera users från string till Array
        users = JSON.parse(users);

        //Lägger till ny user till listan
        users.push(newUser);

        //Spara tillbaka till user.json fil
        fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
            console.log("NewUserSaved");
        });
    });

    res.redirect("/");
})

//Endpoint för att ta boty user
app.post("/register/remove", (req, res) => {
    //Sökväg till user.json
    const userDataPath = "./user.json";

    //Hämta payload data
    const userToRemove = req.body;

    fs.readFile(userDataPath, "utf8", (err, users) => {
        //TODO: Kontrollera err om något har gått fel

        //Konvertera users från string till Array
        users = JSON.parse(users);

        users.forEach((user, i, arr) => {
            //Kontrollerar om user är den som skall tas bort
            if (user.username == userToRemove.username) {
                arr.splice(i, 1);
            }
        })

        //Spara tillbaka till user.json fil
        fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
            console.log("NewUserSaved");
        });
    });

    res.redirect("/");
})