var express = require("express");
var router = express.Router();

const users = [
  { "id": 1, name: "Mauri" },
  { "id": 2, name: "Pepe" }
];


router.get("/allUsers", (req, res)=>{
  res.json(users);
})

/* GET users by id */
router.get("/:id", function (req, res, next) {

  users.forEach(element => {
    if (element.id == req.params.id) {
      data = element
    }
  });

  res.json(data);
});

module.exports = router;
