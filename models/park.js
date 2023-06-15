const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkSchema = new Schema ({
    parkName: String,
    parkPhoto: String,
    parkLink: String
}, {timestamps: true });

module.exports = mongoose.model('Park', parkSchema);
