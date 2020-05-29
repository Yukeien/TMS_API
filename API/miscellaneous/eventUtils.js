const Event = require("../models/eventModel")

exports.registerNewEvent = (label, relativeId) => {
    Event.create({
        label: label,
        relativeId: relativeId
    }).then(event => {
        console.log("Event created with id: " + event.id);
    }).catch(error => {
        console.error("Wallah something went wrong");
    });
};