// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
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



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


let convertToDate = (unix) => {
//To convert UNIX to GMT Date Time
let unixToDate = new Date(unix).toGMTString();
return unixToDate
}

let convertToUnix = (date) => {
  let dateToUnix = new Date(date);
  let unix = dateToUnix.getTime()
  return unix
}

app.get("/api/:date", (req,res)=>{
  let dateCheckRegex = /^\d{4}-\d{1,2}-\d{1,2}$/
  let unixCheckRegex = /^\d{13,13}$/
  let param = req.params.date
  if(dateCheckRegex.test(param)){
    let unixString = convertToUnix(param)
    res.json({"uri":unixString, "utc":param})
  } else if(unixCheckRegex.test(param)){
    let dateString = convertToDate(parseInt(param))
    res.json({"uri":param, "utc":dateString})
  } else{
    res.json({error: "Invalid Date"})
  }
})


