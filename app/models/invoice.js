var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var invoiceSchema   = new Schema({
	odr_invc_no: Number,
	odr_id: Number,
	store_id: Number,
	invc_amt: String,
	paid_amt: String, 
	invc_status : String, //0 deactive 1 Active
	paid_date: { type: Date, default: Date.paid_date},
	invc_date: { type: Date, default: Date.invc_date}
});

module.exports = mongoose.model('Invoice', invoiceSchema);