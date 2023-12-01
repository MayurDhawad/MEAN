const mongoose = require('mongoose')

let uri = process.env.MONGODB_URI;

let connect = mongoose.connect(uri)
    .then(() => {
        console.log("Connected to Mongo_DB successfully")
    }).catch((err) => {
        console.log("Failed to connect Mongo_DB", err)
    })

module.exports = connect   