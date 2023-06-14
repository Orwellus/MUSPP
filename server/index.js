const express = require("express");
const { spawn } = require("child_process");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const fs = require("fs");
const swaggerDocument = YAML.load("./swagger.yaml");
const port = 3005;
var sqlite3 = require("sqlite3").verbose();
const DBSOURCE = " db.sqlite ";
var bodyParser = require("body-parser");
const googleAuth = require("../server/passport/googleAuth")
const session = require("express-session");
const passport = require('passport');
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());


app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { customCss })
);
app.use(cors());

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Wy± wietlenie bª¦du poª¡ czenia
        console.error(err.message);
    } else {
        // Je» eli uda ªo si¦ poª¡czy ¢ z baz ¡ danych
        // próba stworzenia bazy tabeli
        console.log("Connected to the SQLite database. ");
        db.run(
            ` CREATE TABLE Assessments (
                id INTEGER PRIMARY KEY AUTOINCREMENT ,
                name text ,
                assessment text,
                date text) `,
            (err) => {
                if (err) {
                    // Je» eli błąd - np. tabela istnieje
                    var insert =
                        "INSERT INTO Assessments (name , assessment, date ) VALUES (? ,?, ?) ";
                    db.run(insert, ["Pan Rafał", " 5.0", "2022-04-24"]);
                    db.run(insert, ["Pan Michał ", " 4.0", "2022-04-24"]);
                    console.error(err.message);
                } else {
                    // Jeżeli udało si¦ stworzy  tabel ¦ - dodanie 2 pozycji
                    var insert =
                        "INSERT INTO Assessments (name , assessment,date ) VALUES (? ,?, ?) ";
                    db.run(insert, ["Pan Rafał", " 5.0", "2022-04-24"]);
                    db.run(insert, ["Pan Michał ", " 4.0 ", "2022-04-24"]);
                }
            }
        );
    }
});
app.get('/auth/google',  passport.authenticate('google', { scope: ['profile'] }),
function(req, res) {
    res.redirect('/~' + req.user.username);
  }





);
app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Redirect or respond with a success message
   //   console.log(res.data.json)
      res.send('Authentication successful!');
    }
  );
app.get('/logout', function(req, res, next){
    console.log(req.isAuthenticated());
    req.logout();
  });


app.get('/isloggedin', (req, res, next) => {
    if (req.user) res.send(req.user)
    else res.send({ error: 'error' })
})
app.post("/api/image", upload.single("file"), (req, res) => {
    let dataTemp = __dirname + "\\" + req.file.path;
    let dataToSend = "";
    const python = spawn("py", ["pythonScriptImage.py", dataTemp]);
    python.stdout.on("data", function (data) {
        console.log("Pipe data from python script");
        dataToSend = data.toString();
    });
    python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend);
    });
});
app.get("/api/getAllGrades", (req, res) => {
    var select = "select * from Assessments";
    db.all(select, [], (err, row) => {
        if (err) {
            res.status(400).json({ " error ": err.message });
            return;
        }
        res.json({ data: row });
    });
});
app.get("/api/getAllGrades/:id", (req, res) => {
    var select = "select * FROM Assessments WHERE name=?";
    var params = req.params.id;
    db.get(select, [params], (err, row) => {
        if (err) {
            console.log(error);
            res.status(400).json({ " error ": err.message });
            return;
        }
        console.log(row, err, params);
        res.json({ data: row });
    });
});
app.post("/api/addStudent", (req, res) => {
    var select =
        "INSERT INTO Assessments (name , assessment, date ) VALUES (? ,?, ?)";

    var name = req.body.name || "";
    var assessment = req.body.assessment || "";
    var date = req.body.date || "";
    var params = [assessment, name, date];

    db.run(select, params, (err, row) => {
        console.log(err);
        if (err) {
            console.log(error);
            res.status(400).json({ " error ": err.message });
            return;
        }
        console.log(row, err, params);
        res.json({ result: "ok" });
    });
});

app.post("/api/csv", upload.single("file"), (req, res) => {
    let dataTemp = __dirname + "\\" + req.file.path;
    let dataToSend = "";
    console.log(req);
    const python = spawn("py", ["pythonScriptCsv.py", dataTemp]);

    python.stdout.on("data", function (data) {
        var json = JSON.parse(data);
        for (var temp in json) {
            var insert =
                "INSERT INTO Assessments (name , assessment, date ) VALUES (? ,?, ?) ";
            db.run(insert, [
                json[temp]["name"],
                json[temp]["assessment"],
                json[temp]["date"],
            ]);
        }
        dataToSend = json;
        console.log(dataToSend);
    });
    python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend);
    });
});
app.put("/api/updateStudent/:id", (req, res) => {
    var select =
        "UPDATE Assessments set assessment= ?, name = ?, date = ? WHERE id=?";

    var name = req.body.name || "";
    var assesment = req.body.assessment || "";
    var date = req.body.date || "";
    var params = [assesment, name, date, req.params.id];

    db.run(select, params, (err, row) => {
        console.log(err);
        if (err) {
            console.log(error);
            res.status(400).json({ " error ": err.message });
            return;
        }
        console.log(row, err, params);
        res.json({ result: "ok" });
    });
});

app.delete("/api/deleteStudent/:id", (req, res) => {
    var select = `DELETE FROM Assessments WHERE id=?`;
    var params = req.params.id;
    db.run(select, [params], (err, row) => {
        if (err) {
            console.log(error);
            res.status(400).json({ " error ": err.message });
            return;
        }
        res.json({ status: "ok" });
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
