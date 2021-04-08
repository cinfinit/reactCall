const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const plivo = require("plivo");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to simple application." });
});

app.get("/sampler", (req, res) => {
  var client = new plivo.Client(
    "MAOTQ2M2M0NGRIOGRMMD",
    "NWIzNWRjM2E0OTNhM2Q2MzYyMWQzNDBlOTIxODU2"
  );
  client.calls
    .create(
      "+17755350001", // from
      "+919464101536", // to
      "http://s3.amazonaws.com/static.plivo.com/answer.xml", // answer url

      {
        answerMethod: "GET",
        // callbackUrl: "http://e1590cd742bd.ngrok.io/api/calldetails",
        callbackMethod: "GET",
      }
    )
    .then(
      function (response) {
        console.log("resposne", response);
        res.send(response);
      },
      function (err) {
        console.error(err);

        res.send("Error occured");
      }
    );
});

require("./app/routes/caller.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
