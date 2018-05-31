//////////////////////////////////////////////////
//              PROJECT Alphabet                //
// auth.js                                      //
// Author: Elias Dargham (edargham).            //
// Date Created: 2018-07-05 @ 10:22.            //
// Description: Authentication route for        //
//              server routing                  //
//////////////////////////////////////////////////

const hapi = require('hapi');
const path = require('path');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const mysql = require('promise-mysql');
const crypto = require('crypto');

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
        method: 'POST',
        path: '/api/login',
        config: {
            auth: false,
            validate: {
                payload: {
                    username: joi.string().min(5).required(),
                    password: joi.string().min(8).required()
                }
            }
        },
        handler: async function(req, h) {

            const pass = req.payload.password;
            const username = req.payload.username;
            var rows, result, res, response;

            /*Encrypt password */

            await con.then(function(conn) { 
                res = conn.query("SELECT * FROM `Person` WHERE `Username` = ? AND `Password` = ?", [username, pass]);
                return res;
            }).then(function(rows) {
                if(!rows){
                    return boom.badRequest("Invalid username/password.");
                }
                result = rows[0];
                return result;
            }).then(function(resp){
                if(!resp){
                    return boom.badRequest("Invalid username/password.");
                }
                response = utils.sanitizeUser(JSON.parse(JSON.stringify(resp)));
                var token = jwt.sign(response, config.jwtKey, {expiresIn: "10h"});
                response.token = token;
            });

            if(!response) return boom.badRequest("Invalid username/password.");

                
            return response;

        }
    }
];

module.exports = endpoints;


