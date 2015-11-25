var express = require('express'),
    router  = express.Router(),
    _       = require('underscore');

  /*
    - - - - - - - - - -  INDEX PAGE - - - - - - - - - - 
  */
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
    res.render('index', {"data":newd, "counts":phases, "view":"theme"});  
  });

  /*
    - - - - - - - - - -  LOCATION INDEX PAGE - - - - - - - - - - 
  */
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
    res.render('index', {"data":newd, "counts":phases, "view":"location"});  
  });

  /*
    - - - - - - - - - -  PROJECT PAGE - - - - - - - - - - 
  */
  router.get('/projects/:id/:slug', function (req, res) 
  {    
    var data = _.findWhere(req.app.locals.data, {id:parseInt(req.params.id)});
    res.render('project', {"data":data, "slug":req.params.slug});  
  });

module.exports = router;