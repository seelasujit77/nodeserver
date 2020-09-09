var express = require('express'),
  router = express.Router(),
  xml = require('xml2js'),
  builder = new xml.Builder({ rootName: 'TranzPayRequest' }),
  request = require('request');
var parseString = require('xml2js').parseString;
const NlrUrl = "https://www.tranzpaydev.com/api/transaction.php";

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* NLR CC void  refund  */

router.post('/nlrVoidRefund', function (req, res) {

  var xmlData = builder.buildObject(req.body);
  var options = {
    'method': 'POST',
    'url': NlrUrl,
    'headers': {
      'Content-Type': 'application/xml'
    },
    body: JSON.stringify(xmlData)

  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    parseString(response.body, { trim: true }, function (err, result) {
      let results = JSON.parse(JSON.stringify(result).replace(/\[|\]/g, ""));
      //console.dir(results);
      res.send(results.TranzPayResponse)
    });
  });


})


/*NLR CC Partial refund */
router.post('/nlrPartialRefund', function (req, res) {

  var xmlData = builder.buildObject(req.body);
  var options = {
    'method': 'POST',
    'url': NlrUrl,
    'headers': {
      'Content-Type': 'application/xml'
    },
    body: JSON.stringify(xmlData)

  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    parseString(response.body, { trim: true }, function (err, result) {
      let results = JSON.parse(JSON.stringify(result).replace(/\[|\]/g, ""));
      //console.dir(results);
      res.send(results.TranzPayResponse)
    });
  });


})


module.exports = router;
