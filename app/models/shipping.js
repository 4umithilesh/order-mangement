var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var shippingSchema   = new Schema({
	odr_shipment_id: Number,
	odr_invc_no: Number,
	shipping_user: String,
	deliveryboy_user: String,
	shipping_status: String
	
});

module.exports = mongoose.model('Shipping', shippingSchema);