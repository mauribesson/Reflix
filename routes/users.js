var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/:id", function (req, res, next) {

  let users = [
    { "id": 1, name: "Mauri" },
    { "id": 2, name: "Pepe" }
  ];

  users.forEach(element => {
    if (element.id == req.params.id) {
      data = element
    }
  });

  res.json(data);
});

module.exports = router;
