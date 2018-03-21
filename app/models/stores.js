var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var storesSchema   = new Schema({
	store_id: Number,
	name: String,
	address: String,
	latitude: String,
	longitude: String, 
	city : String,
	zipcode: Number,
	country: String,
	contact_person: String, 
	store_url : String,
	store_logo : String,
	store_contacts: String,
	created_at: { type: Date, default: Date.invc_date},
	updated_at: { type: Date, default: Date.invc_date}, 
	store_status : String
	
});

module.exports = mongoose.model('Stores', storesSchema);