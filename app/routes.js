var express = require('express'),
    router  = express.Router(),
    _       = require('underscore');

  router.get('/', function (req, res) 
  {
    var data = _.groupBy(req.app.locals.data, 'theme');
    var newd = {};
    _.each(data, function(value, key, list)
    {
      var item = _.groupBy(value,'phase');
      newd[key] = item;
    });
    var phases = _.countBy(req.app.locals.data, 'phase');    
    res.render('index', {"data":newd, "counts":phases});  
  });

  router.get('/location/', function (req, res) 
  {
    var data = _.groupBy(req.app.locals.data, 'location');
    var newd = {};
    _.each(data, function(value, key, list)
    {
      var item = _.groupBy(value,'phase');
      newd[key] = item;
    });
    var phases = _.countBy(req.app.locals.data, 'phase');  
    res.render('index', {"data":newd, "counts":phases});  
  });

  router.get('/location/', function (req, res) 
  {

  });

module.exports = router;