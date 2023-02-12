const express = require('express')
const {spawn} = require('child_process');
const multer = require('multer')
const upload = multer({ dest: "uploads/" });
const cors = require('cors')
const app = express()
const port = 3000
var sqlite3 = require ('sqlite3') . verbose ()
const DBSOURCE = " db.sqlite "
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let db = new sqlite3.Database ( DBSOURCE , (err) => {
    if ( err ) {
    // Wy± wietlenie bª¦du poª¡ czenia
    console.error ( err.message )
    } else {
    // Je» eli uda ªo si¦ poª¡czy ¢ z baz ¡ danych
    // próba stworzenia bazy tabeli
    console.log ('Connected to the SQLite database. ')
    db.run (` CREATE TABLE Assessments (
                id INTEGER PRIMARY KEY AUTOINCREMENT ,
                name text ,
                assessment text,
                date text) `, ( err ) => {
    if ( err ) {
    // Je» eli błąd - np. tabela istnieje
        var insert = 'INSERT INTO Assessments (name , assessment, date ) VALUES (? ,?, ?) '
        db.run (insert , ["Pan Rafał"," 5.0", "2022-04-24"])
        db.run (insert , ["Pan Michał "," 4.0", "2022-04-24"])
        console.error ( err.message )
    } else {
    // Jeżeli udało si¦ stworzy  tabel ¦ - dodanie 2 pozycji
        var insert = 'INSERT INTO Assessments (name , assessment,date ) VALUES (? ,?, ?) '
        db.run (insert , ["Pan Rafał"," 5.0" , "2022-04-24"])
        db.run (insert , ["Pan Michał "," 4.0 " , "2022-04-24"])
    }
    }) ;
    }
    }) ;

    
    app.post('/image', upload.single('file'), (req, res) => {
        let dataTemp = req.file.path;
        const python = spawn('py', ['pythonScriptImage.py', dataTemp]);
        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script');
            dataToSend = data.toString();
        });
        python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
        });
    })

    app.post('/csv',upload.single('file'), (req, res) => {
        let dataTemp = req.file.path;
        const python = spawn('py', ['pythonScriptCsv.py', dataTemp]);
        python.stdout.on('data', function (data) {
            var json = JSON.parse(data)
         for(var temp in json){
            var insert = 'INSERT INTO Assessments (name , assessment, date ) VALUES (? ,?, ?) '
            db.run (insert , [json[temp]['name'], json[temp]['asessment'] , json[temp]['date']])
        }
            dataToSend = json;
        });
            python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
        });
    
    })


    

app.listen(port, () => console.log(`App listening on port ${port}!`))