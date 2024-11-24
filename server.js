

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var port = process.env.PORT || 4000;
var db, collection;
var configDB = require('./config/database.js');

    app.listen(port, () => {
    MongoClient.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(configDB.dbName);
        console.log("Connected to `" + configDB.dbName + "`!");
    
        console.log(`Server running on port ${port}`)
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {// default page happen on refresh
  db.collection('messages').find().sort({thumbUp:-1}).toArray((err, result) => {//go to db and finds all of the
    if (err) return console.log(err)//reading the html 
    let ratings = result.map(rating => rating.thumbUp + rating.thumbDown)
    console.log(ratings)
    res.render('index.ejs', {messages: result, ratings: ratings})
  })
});
app.post('/messages', (req, res) => {// this is taking the form and sending it to the database
  db.collection('messages').insertOne({name: req.body.name, location: req.body.location, thumbUp: 0, thumbDown: 0}, (err, result) => {
    if (err) return console.log(err)//^ this is telling the database to add one
    console.log('saved to database')
    res.redirect('/')//refrsh, back to homepage
  })
});


    app.put('/messages', (req, res) => {
      console.log(req.body)
        db.collection('messages')
        .findOneAndUpdate({name: req.body.name, location: req.body.location}, {
          $inc: {
            thumbUp: 1 || 0
          }
        }, {
          sort: {_id: -1},
          upsert: true
        }, (err, result) => {
          if (err) return res.send(err)
            console.log('saved to database')
          res.send(result)
        })
      })
  
      app.put('/messages2', (req, res) => {
        console.log(req.body.thumbDown + 1)
        db.collection('messages')
        .findOneAndUpdate({name: req.body.name, location: req.body.location}, {
          $inc: {
            thumbDown: 1 || 0
          }
       
        }, {
          sort: {_id: -1},
          upsert: true
        }, (err, result) => {
          if (err) return res.send(err)
            console.log('saved to database')
          res.send(result)
        })
      })
  


app.delete('/messages', (req, res) => {
  console.log(req.body)
  db.collection('messages').findOneAndDelete({name: req.body.name, location: req.body.location}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
