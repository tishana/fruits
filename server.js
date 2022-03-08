require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Fruit = require('./models/fruits.js')
const PORT = process.env.PORT || 3000

app.use((req, res, next) => {
    console.log('I run for all routes')
    next();
})
app.use(express.urlencoded({extended:false}))


// set up view engine... ALWAYS above routes
app.set('view engine', 'jsx')
  app.engine('jsx', require('express-react-views').createEngine())
 
app.get('/fruits/seed', (req, res)=>{
    Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:false
        }
    ], (err, data)=>{
        res.redirect('/fruits');
    })
});
  // Get Index : Show ALL
  app.get('/fruits/', (req, res) => {
      Fruit.find({}, (error, allFruits)=>{
    res.render('Index', {
        fruits: allFruits
        })
    })
})

// GET new fruit form
app.get('/fruits/new', (req, res) => {
    res.render('New');
});


// POST: New fruit / Create Route
app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    Fruit.create(req.body, (error, createdFruit) =>{
        res.redirect('/fruits')
    })
});
// GET: Show one
app.get('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) =>{
        res.render('Show', {
            fruit:foundFruit
        })
    })
})   
   
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

app.listen(PORT, () => {
    console.log('Melvin the Martian computing on ')
})