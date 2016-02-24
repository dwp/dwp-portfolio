var express     = require('express'),
    _           = require("underscore"),
    // moment      = require('moment');
    router      = express.Router();

router.get('/display/:number?', function(req,res,next)
{
  req.data = {};
  var number = req.params.number;
  if (!number) number = 0;
  if (number >= req.app.locals.data.length) number = 0;

  req.data.data = req.app.locals.data[number];
  req.data.total = req.app.locals.data.length;
  req.data.number = number;
  req.url = '/display/';
  next();
});

module.exports = router;
