const express = require('express');
const stateRoute = express.Router();
var State = require('../models/statemodel');

// Ensure JSON parsing middleware is active in main app.js or server.js
// app.use(express.json());

/* Save state */
stateRoute.route('/save').post((req, res) => {
    var state = new State(req.body);
    state.save()
        .then(state => res.send("State Saved"))
        .catch(err => res.send(err));
});

/* Search state by ID */
stateRoute.route('/search/:stid').get((req, res) => {
    State.findOne({ "stid": req.params.stid })
        .then(state => res.send(state))
        .catch(err => res.send(err));
});

/* Update state */
stateRoute.route('/update').put((req, res) => {
    State.updateOne({ "stid": req.body.stid }, { "stname": req.body.stname, "status": req.body.status })
        .then(state => res.send('state updated successfully'))
        .catch(err => res.send(err));
});

/* Delete (disable) state */
stateRoute.route('/delete/:stid').delete((req, res) => {
    State.updateOne({ "stid": req.params.stid }, { "status": 0 })
        .then(state => res.send('state disable successfully'))
        .catch(err => res.send(err));
});

/* Show active states */
stateRoute.route('/show').get((req, res) => {
    State.find({ "status": 1 })
        .then(state => res.send(state))
        .catch(err => res.send(err));
});

/* Show all states */
stateRoute.route('/getall').get((req, res) => {
    State.find()
        .then(state => res.send(state))
        .catch(err => res.send(err));
});

/* Search by state name */
stateRoute.route('/searchbyname/:stname').get((req, res) => {
    State.findOne({ "stname": req.params.stname })
        .then(state => res.send(state))
        .catch(err => res.send(err));
});

module.exports = stateRoute;
