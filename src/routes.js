"use strict";

const resetDB = require("../config/scripts/populateDB")

const Module = require("./schema/Module");
const Child = require("./schema/Child");

const express = require("express");
const { find } = require("./schema/Module");
// const { find } = require("./schema/Child");
const router = express.Router();


// completely resets your database.
// really bad idea irl, but useful for testing
router.route("/reset")
    .get((_req, res) => {
        resetDB(() => {
            res.status(200).send({
                message: "Data has been reset."
            });
        });
    });

router.route("/")
    .get((_req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "App is running."
        });
    });

// ---------------------------------------------------
// Edit below this line
// ---------------------------------------------------


// function getDoctorID(doctorID) {
//     var matches = data.doctors.filter(doc => doc._id == req.params.id);
//     if (matches.length != 1) {
//         return("The following doctor does not exist: " + req.params.id);
//     }
//     else {
//         return (matches[0]);
//     }
// }
router.route("/Module")
    .get((req, res) => {
        console.log("GET /Module");

        // already implemented:
        Module.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log("POST /Module");
        Module.create(req.body)
            .save()
            .then((data) => {
                res.status(201).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });

router.route("/Module/:id")
    .get((req, res) => {
        console.log(`GET /Module/${req.params.id}`);
        let currModule;
        let children;
        Module.findById(req.params.id)
        .then((data) => {
            console.log(data);
            currModule = data;
            Child.find({module_id: currModule._id})
            .then((data) => {
                children = data;
                res.status(200).send({module: currModule, children: children});
            })
        })
        // .catch(err => {
        //     res.status(404).send({message: "Module with id "+req.params.id+" does not exist."});
        // });
    })
    .patch((req, res) => {
        console.log(`PATCH /Module/${req.params.id}`);
        Module.findOneAndUpdate({_id: req.params.id},req.body,{ new: true } )
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(404).send({message: `some other error`,err: err});
        });
    })
    .delete((req, res) => {
        console.log(`DELETE /Module/${req.params.id}`);
        Module.findOneAndDelete({_id : req.params.id})
        .then ((data) => {
            if (data) {
                res.status(200).send(null);
            } else {
                res.status(404).send({message:'Module with id does not exist.'});
            }
        })
        .catch (err => {
            res.status(404).send(err);
        });
    });

router.route("/Module/:id/children")
    .get((req, res) => {
        console.log(`GET /Module/${req.params.id}/children`);
        Module.findById(req.params.id)
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(404).send({message: "Module with id "+req.params.id+" does not exist."});
        });
    })
    .patch((req, res) => {
        console.log(`PATCH /Module/${req.params.id}`);
        Module.findOneAndUpdate({_id: req.params.id},req.body,{ new: true } )
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(404).send({message: `some other error`,err: err});
        });
    })
    .delete((req, res) => {
        console.log(`DELETE /Module/${req.params.id}`);
        Module.findOneAndDelete({_id : req.params.id})
        .then ((data) => {
            if (data) {
                res.status(200).send(null);
            } else {
                res.status(404).send({message:'Module with id does not exist.'});
            }
        })
        .catch (err => {
            res.status(404).send(err);
        });
    });



module.exports = router;
