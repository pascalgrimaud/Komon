/**
 * Created by Komo on 27/01/2015.
 */

function KomonerController(db) {
    this._database = db;
}

KomonerController.prototype.setDatabase = function setDatabase(db) {
    this._database = db;
};

KomonerController.prototype.findKomonerByEmail = function findKomonerByEmail(email, callback) {
    this._database.collection('komoners').findOne({email: email}, callback);
};

KomonerController.prototype.findKomonerById = function findKomonerById(userId, callback) {
    this._database.collection('komoners').find({ _id: userId }).toArray(callback);
};

module.exports = KomonerController;