var express = require("express");
var router = express.Router();

router.get("/",(req, res) => {
    res.render('about', { title: 'Express-101 - ReFlix 📹🎞',
        content:'ReFlix: About: Pruebas de Node.js con express + pug 🐶'
     });
})


module.exports = router;