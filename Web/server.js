var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Alphabet"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/api/skills', function(req, res){
  con.query('SELECT * FROM Skill', function(err, rows, fields) {
    if (!err){
      console.log('The solution is: ', rows);
      res.json(JSON.parse(JSON.stringify(rows)));
      return(rows);
    }
    else
      console.log('Error while performing Query: ' + err);
  });
});

app.post('/api/skills', function(req, res){
  var today = new Date();
  var desc = null;

  if(req.body.Skill_Description === '')
    desc = null;
  else
    desc = req.body.Skill_Description;

  var newSkill = {
    Skill_Name: req.body.Skill_Name,
    Skill_Description: desc,
    idParent_Skill: parseInt(req.body.idParent_Skill),
    Date: "0" + today.getMonth() + "/0" +  today.getDate()+ "/" + today.getFullYear(),
    idPerson: 3,
    rating: parseInt(req.body.rating)
  };
  var post = [[newSkill.Skill_Name, newSkill.Skill_Description, newSkill.idParent_Skill, newSkill.Date, newSkill.idPerson, newSkill.rating]];
  console.log("Posting Skill: " + post);
  con.query(
    'INSERT INTO `Skill` (`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES ? ;',[post], 
    function(err){
      if(err)
        console.log('Error while performing Query: ' + err);
      else{
        console.log('New Skill Added Successfuly');
      }
    }
  );

});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

console.log('Hello World');