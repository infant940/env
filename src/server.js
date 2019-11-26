const express = require('express')
var router = express.Router();

const bodyParser = require('body-parser')
const cors = require('cors')
const mongo = require('mongodb')
const key = require('./key').mongoURI

let dbo
const app = express()

app.use(bodyParser.json())
app.use(cors())
mongo.connect(key, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    dbo = client.db("test")
    console.log("DB Connected")
});

router.get('/infant', (req, res) => {
    dbo.collection('infant').find().toArray( (err, data) => {
        console.log(data)
        res.send(data)
    })
  })

  router.post('/infant', function (req, res) { 
      
      dbo.collection('infant').insertOne("Name:INFANT", function(err, obj) {
      if (err) throw err;
      console.log("inserted");
      res.send('Successs');
    });
 });    

 router.delete('/infant', function (req, res) {  

  
dbo.collection('infant').deleteOne("Name:INFANT", function(err, obj) {
        if (err) throw err;
        console.log("deleted");
        res.send('deleted');  
    });
    });

    router.put('/infant', function (req, res) {  

   
  
    dbo.collection('infant').updateOne( "Name:INFANT","Name:Ananth", function(err, obj) {
        if (err) throw err;
        console.log("updated");
        res.send('update');  

      });
 }) ;


  app.listen(4000, 'localhost', () => console.log('Running'))