var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    profile: {type: String, default: ''},
    text: {type: String, default: ''},
    date: {type: Date, default: Date.now}
});

CommentSchema.methods.summary = function() {
    var summary = {
        username: this.username,
        text: this.text,
        timestamp: this.timestamp,
        id: this._id.toString()
    }
    return summary;
}

module.exports = mongoose.model('CommentSchema', CommentSchema);