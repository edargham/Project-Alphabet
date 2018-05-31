//////////////////////////////////////////////////
//              PROJECT ALPHABET                //
// server.js                                    //
// Author: Elias Dargham (edargham)             //
// Date Created: 2018-07-05 @ 13:07             //
// Description: Server backend for project      //
//              alphabet                        //
//////////////////////////////////////////////////

const hapi = require('hapi');
const locals = require('hapi-locals');  
const mysql = require('promise-mysql');
const joi = require('joi');
const path = require('path');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "Alphabet"
});

const config = require(path.resolve('./config/config'));

const init = async () => {

    const server = hapi.server({
        port: 3001
    });

    await server.register([require('vision'), require('inert'), require('lout'), require('hapi-auth-jwt2')]);

    server.auth.strategy('jwt', 'jwt', {
        key: config.jwtKey,
        validate: async (decoded, req) => {
            try{
                var valid = false;
                var person;
                await con.then((conn)=>{
                    person = conn.query("SELECT * FROM `Person` WHERE `Username` = ?", decoded.Username);
                    valid = true;
                    return valid;
                });
                if(valid) {
                    req.user = person;
                    return {isValid: true};
                } else {
                    return {isValid: false};
                }
            } catch (err){
                console.log("Validation Error: ", err, "!");
                return {isValid: false};
            }
        },
        verifyOptions: {algorithms: ['HS256']}
    });
    server.auth.default('jwt');

    let routes = [];

    const auth = require(path.resolve('./routes/auth'));
    const skills = require(path.resolve('./routes/skills'));
    const manageSkills = require(path.resolve('./routes/student'));

    routes.push(auth);
    routes.push(skills);
    routes.push(manageSkills);
    routes = _.flatMapDeep(routes, (route) => {
        return route;
    });

    server.route(routes);
    await server.start();
    return server;
}

init().then(server => {
    console.log('Server running at:', server.info.uri);
}).catch(error => {
    console.log(error);
});