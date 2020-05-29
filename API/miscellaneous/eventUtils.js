const Event = require("../models/eventModel");
const { Worker } = require('worker_threads');
const filepath = "./API/workers/handleEvents.js";

exports.registerNewEvent = (label, relativeId) => {
    Event.create({
        eventType: label,
        relativeId: relativeId
    }).then(event => {
        console.log("Event created with id: " + event.id);
        _useWorker(filepath, event);
    }).catch(error => {
        console.error(error);
    });
};

function _useWorker (filepath, event) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(filepath, {
        workerData: {
            eventType: event.eventType,
            relativeId: event.relativeId
        }
    });
    worker.on('online', () => { console.log('[Worker Started]') })
    worker.on('message', messageFromWorker => {
      console.log(messageFromWorker)
      return resolve
    })
    worker.on('error', reject)
    worker.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}
