var express = require('express'),
    router  = express.Router(),
    _       = require('underscore');

var theme_order = [
      'Health & Disability',
      'Working Age',
      'Retirement Provision',
      'Fraud & Debt',
      'Platforms'
    ];

var phase_order = ['backlog','discovery','alpha','beta','live'];

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
      newd[key] = {};
      _.each(item, function(v,k,l)
      {        
        var piece = _.groupBy(v,'facing');
        newd[key][k] = piece;
      });
      // newd[key] = item;
    });

    var phases = _.countBy(req.app.locals.data, 'phase');    
    res.render('index', {
      "data":newd, 
      "counts":phases, 
      "view":"theme",
      "theme_order":theme_order,
      "phase_order":phase_order
      }
    );  
  });

  /*
    - - - - - - - - - -  LOCATION INDEX PAGE - - - - - - - - - - 
  */
  router.get('/location/', function (req, res) 
  {
    var data = _.groupBy(req.app.locals.data, 'location');
    var newd = {}, loc_order = [];
    _.each(data, function(value, key, list)
    {
      var item = _.groupBy(value,'phase');
      newd[key] = item;
      loc_order.push(key);
    });

    loc_order.sort();

    var phases = _.countBy(req.app.locals.data, 'phase');  
    res.render('index', {
      "data":newd, 
      "counts":phases, 
      "view":"location",
      "theme_order":loc_order,
      "phase_order":phase_order
    });  
  });

  /*
    - - - - - - - - - -  PROJECT PAGE - - - - - - - - - - 
  */
  router.get('/projects/:id/:slug', function (req, res) 
  {    
    var data = _.findWhere(req.app.locals.data, {id:parseInt(req.params.id)});
    res.render('project', {"data":data});  
  });

module.exports = router;