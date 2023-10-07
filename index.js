// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));
// some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


//valid date function
const isInvalidDate = (date) => date.toUTCString() == "Invalid Date";

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

//return current date
app.get("/api", function (req, res) {
    res.json({
        unix: new Date().getTime(),
        utc: new Date().toUTCString()
    });
});

//return date based on given string or number 
app.get("/api/:date", function (req, res) {
    let dateValue = req.params.date;
    let date = new Date(dateValue);

    if (isInvalidDate(date)) {
        date = new Date(+dateValue);
    }

    if (isInvalidDate(date)) {
        res.json({ error: "Invalid Date" });
        return;
    }

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});


// listen for requests :)
const listener = app.listen(process.env.PORT | 4000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
