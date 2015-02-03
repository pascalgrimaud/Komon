/**
 * Created by Komo on 27/01/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KomonerSchema = new Schema({
    komoner: Schema.Types.ObjectId,
    name: String,
    color: String,
    image: String
});

module.exports = mongoose.model('Tag', KomonerSchema);