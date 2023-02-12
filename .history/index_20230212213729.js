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
app.use(cors())

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
    date text
    ) `, ( err ) => {
    if ( err ) {
    // Je» eli bª¡d - np. tabela istnieje
        var insert = 'INSERT INTO Assessments (name , assessment, date ) VALUES (? ,?, ?) '
        db.run (insert , ["Pan Rafał"," 5.0", "2022-04-24"])
        db.run (insert , ["Pan Michał "," 4.0", "2022-04-24"])
        console.error ( err.message )
    } else {
    // Je» eli uda ªo si¦ stworzy ¢ tabel ¦ - dodanie 2 pozycji
        var insert = 'INSERT INTO Assessments (name , assessment,date ) VALUES (? ,?, ?) '
        db.run (insert , ["Pan Rafał"," 5.0" , "2022-04-24"])
        db.run (insert , ["Pan Michał "," 4.0 " , "2022-04-24"])
    }
    }) ;
    }
    }) ;


    
app.post('/image', upload.single('file'), (req, res) => {

    console.log(req.file.path);
    let dataTemp = req.file.path;
    const python = spawn('py', ['script1.py', dataTemp]);
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

    let dataToSend=""
    let dataTemp = req.file.path;
    const python = spawn('py', ['script2.py', dataTemp]);
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
app.get('/assessment', (req,res) => {
    var select = 'select * from Assessments'
    db.all (select , [] , (err , row) => {
        if ( err ) {
            res.status (400).json ({" error ": err.message }) ;
            return;
        }
        res.json ({"data":row})
        }) ;
})
app.delete('/assessment/:id', (req,res) => {
    var select = `DELETE FROM Assessments WHERE id=?`
    var params = req.params.id;
    db.run (select , [params] , (err , row) => {
        if ( err ) {
            console.log(error)
            res.status (400).json ({" error ": err.message }) ;
            return;
        }
        res.json ({"status":"ok"})
    });
})
app.get('/assessment/:id', (req,res) => {
    var select = "select * FROM Assessments WHERE id=?"
    var params = req.params.id;
    db.get (select , [params] , (err , row) => {
        if ( err ) {
            console.log(error)
            res.status (400).json ({" error ": err.message }) ;
            return;
        }
        console.log(row, err,params)
        res.json ({"data":row})
    });
})

app.put('/assessment/:id', (req,res) => {
    var select = "UPDATE Assessments set assessment= ?, name = ?, date = ? WHERE id=?"
   
    var name = req.body.name || '';
    var assesment = req.body.assesment || '';
    var date = req.body.date || '';
    var params = [assesment,name,date,req.params.id]
    
    db.run (select , params , (err , row) => {
        console.log(err)
        if (err) {
            console.log(error)
            res.status (400).json ({" error ": err.message }) ;
            return;
        }
        console.log(row, err,params)
        res.json ({"result":"ok"})});
})

app.post('/assessment', (req,res) => {
    var select = "INSERT INTO Assessments (name , assessment, date ) VALUES (? ,?, ?)"
   
    var name = req.body.name || '';
    var assessment = req.body.assessment || '';
    var date = req.body.date || '';
    var params = [assessment,name,date]
    
    db.run (select , params , (err , row) => {
        console.log(err)
        if (err) {
            console.log(error)
            res.status (400).json ({" error ": err.message }) ;
            return;
        }
        console.log(row, err,params)
        res.json ({"result":"ok"})});
})




   app.listen(port, () => console.log(`App listening on port ${port}!`))