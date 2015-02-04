/**
 * Created by Komo on 27/01/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KomonerSchema = new Schema({
    _komoner: {type: Schema.Types.ObjectId, ref: 'Komoner'},
    name: String,
    date: Date,
    comment: String,
    _tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    amount: String,
    price: Number
});

module.exports = mongoose.model('Expense', KomonerSchema);