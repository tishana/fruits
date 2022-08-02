const express = require('express')
require('dotenv').config()
const fruits = require('./models/fruits')
const app = express()
const port = process.env.PORT || 3003;

// middleware
app.use(express.urlencoded({extended:false}));

// setting up our views
app.set('view engine', 'jsx') // setting up our HTML template
app.engine('jsx', require('express-react-views').createEngine()) // Initializing our view engine

// our routes
// index
app.get('/fruits/', (req, res) =>{
    // res.send(fruits)
    res.render('Index', {fruits: fruits})
})

// new
app.get('/fruits/new', (req,res) => {
    res.render('New')
})

// create
app.post('/fruits', (req,res) => {
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    fruits.push(req.body);
    console.log(req.body)
    res.redirect('/fruits') // send user back to index
})

// show
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray])
    res.render('Show', { // second param must be an object
    fruit: fruits[req.params.indexOfFruitsArray]
    })
})


// our port
app.listen(port,() => {
    console.log('i am listening on port' , port);
});