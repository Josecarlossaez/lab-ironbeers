const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// ITERATION 3.1
app.get("/beers", (req, res) => {
  
  punkAPI.getBeers()
  .then((response) => {
    res.render("beers.hbs", {
    beerList : response
  }) 
})
  .catch(error => console.log(error));
}) 

// ITERATION 3.2 CREADA EN BEERS.HBS

// ITERATION 4
app.get("/random-beer", (req, res) => {
  punkAPI.getRandom()
  .then((response) => {
    res.render("random-beer.hbs", {
      randomBeer : response
    })
  })
  .catch((error) => console.log(error))
})


 //ITERATION 6

 app.get("/beers/:beer", (req, res) => {
  console.log("entrando iteración 6");
  let {beer} = req.params
  punkAPI.getBeer(beer)
  .then((response) => {
    console.log(response)
    res.render("beer-selected.hbs", {
beerList:response
    })

    })
    .catch((error) => {
      console.log(error)
    })
  })

  



app.listen(3000, () => console.log('🏃‍ on port 3000'));
