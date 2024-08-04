var express = require('express');
var router = express.Router();

//test IP 
const { networkInterfaces } = require('os');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express-101 - ReFlix 📹🎞',
                        content:'ReFlix: Lista de Videos'
                     });
});


router.get('/getServerIP', (req, res) => {
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object
  for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
          // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
          // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
          const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
          if (net.family === familyV4Value && !net.internal) {
              if (!results[name]) {
                  results[name] = [];
              }
              results[name].push(net.address);
          }
      }
  }

  res.json(results)

})



module.exports = router;
