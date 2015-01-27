/**
 * Created by Komo on 27/01/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KomonerSchema = new Schema({
    komoner: Schema.Types.ObjectId,
    time: Date,
    comment: String,
    tags: [Schema.Types.ObjectId],
    amount: String,
    price: Number
});

module.exports = mongoose.model('Expense', KomonerSchema);