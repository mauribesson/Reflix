var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express-101 - ReFlix 📹🎞',
                        content:'ReFlix: Lista de Videos'
                     });
});

module.exports = router;
