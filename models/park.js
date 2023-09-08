const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkSchema = new Schema ({
    parkName: String,
    parkActive: Boolean,
    parkType: String,
    parkLocation: String,
    parkLink: String
}, {timestamps: true });

module.exports = mongoose.model('Park', parkSchema);
