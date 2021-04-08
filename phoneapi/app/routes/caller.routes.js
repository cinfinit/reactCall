module.exports = (app) => {
  const callers = require("../controllers/caller.controller");
  var router = require("express").Router();

  router.get("/", callers.findAll);
  router.post("/makecall", callers.makeCall);
  router.post("/getdetails", callers.getDetails);
  router.get("/active", callers.checkActive);

  router.post("/create", callers.create);

  app.use("/api/caller", router);
};
