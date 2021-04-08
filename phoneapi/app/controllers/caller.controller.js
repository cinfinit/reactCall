const db = require("../models");
const Caller = db.caller_details;
const Op = db.Sequelize.Op;
const plivo = require("plivo");

exports.create = (req, res) => {
  const caller = {
    name: req.body.name,
    user_number: req.body.user_number,
    receiver_number: req.body.receiver_number,
    call_details: req.body.call_details,
  };
  Caller.create(caller)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured ",
      });
    });
};

exports.getDetails = (req, res) => {
  let calluid = req.body.callUid;
  var client = new plivo.Client(
    "MAOTQ2M2M0NGRIOGRMMD",
    "NWIzNWRjM2E0OTNhM2Q2MzYyMWQzNDBlOTIxODU2"
  );
  client.calls
    .get(
      calluid // call uuid
    )
    .then(
      function (response) {
        console.log(response);
        res.send(response);
      },
      function (err) {
        console.error(err);
        res.send("error");
      }
    );
  //   console.log("request", req);
};

exports.makeCall = async (req, res) => {
  var client = new plivo.Client(
    "MAOTQ2M2M0NGRIOGRMMD",
    "NWIzNWRjM2E0OTNhM2Q2MzYyMWQzNDBlOTIxODU2"
  );
  let from = req.body.user_number;
  let to = req.body.receiver_number;
  let duration = req.body.duration * 60;
  // console.log(typeof duration, duration);
  console.log(duration);

  client.calls
    .create(
      "+17755350001", // from
      `+91${to}`, // to

      "http://s3.amazonaws.com/static.plivo.com/answer.xml", // answer url
      {
        answerMethod: "GET",
        callbackMethod: "GET",
        time_limit: `${duration}`,
        // sip_headers: `time_limit=${duration}`,
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
};

exports.checkActive = (req, res) => {
  console.log("the call has been started ");
  res.send("callstarted");
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Caller.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured in db",
      });
    });
};
