var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var orderSchema   = new Schema({
	odr_id: Number,
	user_id: Number,
	odr_details: String,
	odr_amount: String,
	odr_status: String, //0 deactive 1 Active
	ordernumber : String,
	odr_date: { type: Date, defauly: Date.now}
});

module.exports = mongoose.model('Order', orderSchema);