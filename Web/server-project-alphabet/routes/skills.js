//////////////////////////////////////////////////
//              PROJECT Alphabet                //
// skills.js                                    //
// Author: Elias Dargham (edargham).            //
// Date Created: 2018-07-05 @ 10:22.            //
// Description: Skills routes for               //
//              server routing                  //
//////////////////////////////////////////////////

const hapi = require('hapi');
const path = require('path');
const boom = require('boom');
const joi = require('joi');
const mysql = require('promise-mysql');
const decode = require('jwt-decode');

const config = require(path.resolve('./config/config'));
const utils = require(path.resolve('./utils/utils'));

var today = new Date();

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "Alphabet"
});

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
};

Date.prototype.toMysqlFormat = () => {
    return today.getUTCFullYear() + "-" + twoDigits(1 + today.getUTCMonth()) + "-" + twoDigits(today.getUTCDate()) + " " + twoDigits(today.getUTCHours()) + ":" + twoDigits(today.getUTCMinutes()) + ":" + twoDigits(today.getUTCSeconds());
};

const endpoints  = [
    {
        method: 'GET',
        path: '/api/skills',
        config: {
            auth: 'jwt'
        },
        handler: async function(req, h) {

            var res;
            const token = req.headers.authorization.split(' ');
            const parsedToken = token[1];
            const user = decode(parsedToken);

            await con.then(function(conn){
                res = conn.query("SELECT * FROM `Skill` WHERE `Person_idPerson` = ?", user.idPerson);
                return res;
            });

            if(!res) return boom.badRequest("Error getting skills.");

            return res;
        }
    },
    {
        method: 'POST',
        path: '/api/skills',
        config: {
            auth: 'jwt',
            validate: { 
                payload: {
                    Skill_Name: joi.string().required(),
                    Skill_Description: joi.string().required(),
                    idParent_Skill: joi.number().required(),
                    rating: joi.number().max(11).required(),
                    idPerson: joi.number().required()
                }
            }
        },
        handler: async function(req, h) {
            
            var res;
            var desc = null;
            var date = Date.prototype.toMysqlFormat(); 
            console.log(date);
            if(req.payload.Skill_Description === '')
              desc = null;
            else
              desc = req.payload.Skill_Description;

            const newSkill = {
                Skill_Name: req.payload.Skill_Name,
                Skill_Description: desc,
                idParent_Skill: req.payload.idParent_Skill,
                Date: date,
                idPerson: req.payload.idPerson,
                rating: req.payload.rating
            };

            const payload = [[
                newSkill.Skill_Name,
                newSkill.Skill_Description,
                newSkill.idParent_Skill,
                newSkill.Date,
                newSkill.idPerson,
                newSkill.rating
            ]];
            console.log(newSkill);
            await con.then((conn) => {
                res = conn.query("INSERT INTO `Skill` (`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES ?", [payload]);
                return res;
            });
            console.log("Added Skill");
            if(!res) return boom.badRequest("Error posting skill.");

            return res;
        }
    }
];



module.exports = endpoints;