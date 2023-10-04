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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

function isValidDateString(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

function isValidDateNumber(dateNumber) {
    const date = new Date(dateNumber);
    return date == "Invalid Date" ? false : true;
}


// your first API endpoint... 
app.get("/api", function (req, res) {
    const unix = new Date().getTime();
    const utc = new Date().toUTCString();
    res.json({ unix, utc });
});


app.get("/api/:date", function (req, res) {
    const { date } = req.params;
    let unix;
    let utc;

    if (String(date).includes("-") && isNaN(Number(date))) {
        if (!isValidDateString(date)) {
            res.json({ error: "Invalid Date" });
            return;
        }
        const myDate = new Date(String(date));
        unix = Number.parseInt(myDate.getTime());
        utc = myDate.toUTCString();

    } else {
        unix = parseInt(date);
        utc = new Date(unix).toUTCString();

        if (!isValidDateNumber(unix)) {
            res.json({ error: "Invalid Date" });
            return;
        }
    }

    res.json({ unix, utc });
});


// listen for requests :)
const listener = app.listen(process.env.PORT | 4000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
