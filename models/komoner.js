/**
 * Created by Komo on 27/01/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KomonerSchema = new Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Komoner', KomonerSchema);