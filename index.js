// index.js
// where your node app starts

// init project
require('dotenv').config()
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/', (req, res) =>{
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
})

app.get('/api/:datetime', (req, res) =>{
  let date = new Date(req.params['datetime']);

  if(!(date instanceof Date && !isNaN(date))){
    date = new Date(parseInt(req.params['datetime']));
  }

  if((date instanceof Date && !isNaN(date))){
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  }else{
    res.json({error: "Invalid Date"})
  }
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


