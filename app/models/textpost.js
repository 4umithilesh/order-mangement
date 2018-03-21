var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var textSchema   = new Schema({
	text_id: String,
	
	message: String,
	
	text_date: { type: Date, defauly: Date.now}
});

module.exports = mongoose.model('TextPost', textSchema);