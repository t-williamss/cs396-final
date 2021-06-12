"use strict";

const Module = require("../../src/schema/Module");
const Child = require("../../src/schema/Child");
const data = require("../data.json");
require("dotenv").config();

const env = "" + process.env.NODE_ENV;

const configObj = require("../config");
const config = configObj[env || "development"];
const mongoose = require("mongoose");


const populate = (callback) => {
    // console.log("Trying to connect to database...");
    mongoose.connect(config.database, config.mongoConfig, err => {
        if (err) {
            console.log("Could not connect to database.");
        }
        // console.log("Clearing database...");
        const schemas = [ Module, Child ];
        Promise
            .all(
                // first delete any data that currently exists:
                schemas.map(schema => schema.deleteMany())
            )
            .then(() => {
                return Module.insertMany(data.Module);
            })
            .then(() => {
                return Child.insertMany(data.Child);
            })
            .catch(err => {
                console.log(err);
                process.exit(1);
            })
            .finally(() => {
                // console.log("Database populated successfully.");
                if (callback) {
                    callback();
                } else {
                    console.log('Exiting');
                    process.exit(0);
                }
            });
    });
};

module.exports = populate;
