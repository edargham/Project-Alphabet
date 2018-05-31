//////////////////////////////////////////////////
//              PROJECT Alphabet                //
// student.js                                   //
// Author: Elias Dargham (edargham).            //
// Date Created: 2018-07-05 @ 10:22.            //
// Description: Student routes for              //
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

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "Alphabet"
});

const endpoints = [
    {
        method: 'GET',
        path: '/students',
        config: {
            auth: 'jwt'
        },
        handler: async function(req, h) {

            var res;
            const token = req.headers.authorization.split(' ');
            const parsedToken = token[1];
            const user = decode(parsedToken);

            await con.then((conn) => {

                res = conn.query("SELECT `idPerson`, `First_Name`, `Last_Name` FROM `Person` WHERE `Parent_Person_ID` = ?", user.idPerson);
                
                return res;

            });

            if (!res) return boom.badRequest("Error getting users");

            return res;
        }
    },
    {
        method: 'GET',
        path: '/students/skills',
        config: {
            auth: 'jwt'
        },
        handler: async function(req, h) {
            
            var res;
            const token = req.headers.authorization.split(' ');
            const parsedToken = token[1];
            const user = decode(parsedToken);

            await con.then((conn) => {

                res = conn.query(
                    "SELECT `idSkill`, `Skill_Name`, `Skill_Description`, `Parent_Skill_ID`, `Date_Created`, `Skill`.`Person_idPerson`, `Skill`.`Rating_idRating` FROM `Skill`, `Person_Skill_Progress`, `Person` WHERE `Person_Skill_Progress`.`Person_idPerson` = `Person`.`idPerson` AND `Person_Skill_Progress`.`Skill_idSkill` = `Skill`.`idSkill` AND `Person`.`idPerson` = ? ORDER BY `Skill`.`idSkill` ASC", 
                    user.idPerson
                );

                return res;

            });

            if (!res) return boom.badRequest("Error getting user.");

            return res;
        }
    },
    {
        method: 'GET',
        path: '/students/skill-progress',
        config: {
            auth: 'jwt'
        },
        handler: async function(req, h) {
            
            var res;
            const token = req.headers.authorization.split(' ');
            const parsedToken = token[1];
            const user = decode(parsedToken);

            await con.then((conn) => {

                res = conn.query(
                    "SELECT PSP.`idPerson_Skill_Progress`, PE.`First_Name`, PE.`Last_Name`, S.`Skill_Name`, PR.`Progress` FROM `Person_Skill_Progress` PSP, `Person` PE, `Skill` S, `Progress` PR WHERE PSP.`Person_idPerson` = PE.`idPerson` AND PSP.`Skill_idSkill` = S.`idSkill` AND PSP.`Progress_idProgress` = PR.`idProgress` AND PSP.`Person_idPerson` = ?", 
                    user.idPerson
                );

                return res;

            });

            if (!res) return boom.badRequest("Error getting user.");

            return res;
        }
    },
    {
        method: 'POST',
        path: '/students/skill-progress',
        config: {
            auth: 'jwt',
            validate: {
                payload: {
                    idPerson: joi.number().required(),
                    idSkill: joi.number().required()
                }
            }
        },
        handler: async function(req, h) {
            
            var res;
            const token = req.headers.authorization.split(' ');
            const parsedToken = token[1];
            const user = decode(parsedToken);

            const payload = [[
                req.payload.idSkill,
                req.payload.idPerson,
                1
            ]];     

            await con.then((conn) => {
                
                res = conn.query("INSERT INTO `Person_Skill_Progress` (`Skill_idSkill`, `Person_idPerson`, `Progress_idProgress`) VALUES ?", [payload]);

                return res;

            });

            if(!res) return boom.badRequest("Error posting user progress.");

            return res;
        }
    }
];

module.exports = endpoints;