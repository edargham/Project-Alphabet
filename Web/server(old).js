/**
 * This file is based on Facebook's version of server.js, included in the
 * download for this tutorial: https://facebook.github.io/react/docs/tutorial.html
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();


var DONATIONS_FILE = path.join(__dirname, 'skills.json');

app.set('port', (process.env.PORT || 3000));

//app.use(logger('dev'));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//Insert two statements refer to: https://youtu.be/kI46_gNmmyI?t=2m24s
//app.use('/', routes);
//app.use('/skills', server);

app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err); 
});
var router = express.Router();

router.get('/',function(req, res, next){
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'Alphabet'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query('SELECT * FROM Skill', function(err, rows, fields) {
  if (!err){
    if(rows.length > 0){
      res.send(rows);
      console.log('The solution is: ', rows);
    }
    else{
      res.send('Skill is not valid');
    }
  }
  else
    console.log('Error while performing Query.');
});
con.end();
console.log('Hello World');
});

module.exports = router;

app.get('/api/skills', function(req, res) {
  fs.readFile(DONATIONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/skills', function(req, res) {
  fs.readFile(DONATIONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var skills = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newSkill = {
      id: Date.now(),
      contributor: req.body.contributor,
      amount: req.body.amount,
      comment: req.body.comment
    };
    skills.push(newSkill);
    fs.writeFile(DONATIONS_FILE, JSON.stringify(skills, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(skills);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});



