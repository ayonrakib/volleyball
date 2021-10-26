const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now
    },
    yesVoters: [String],
    noVoters: [String]
})

module.exports = mongoose.model('Poll', pollSchema)