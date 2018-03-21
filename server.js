// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://root:abc123@ds249415.mlab.com:49415/order'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

//  models lives here
var Order     = require('./app/models/order');
var TextPost     = require('./app/models/textpost');
var Invoice     = require('./app/models/invoice');
var Shipping     = require('./app/models/shipping');
var Stores     = require('./app/models/stores');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Vastusashtra Tips! welcome to our api!' });	
});



//vastushastra Api


router.route('/textpost')

	
	.post(function(req, res) {
		
		var textpost = new TextPost();		
		textpost.text_id = req.body.text_id;
		textpost.message = req.body.message;
		textpost.text_date = req.body.text_date;

		textpost.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'text created!' });
		});

		
	})

	
	.get(function(req, res) {
		TextPost.find(function(err, orders) {
			if (err)
				res.send(err);

			res.json(orders);
		});
	});





// on routes that end in /Orders
// ----------------------------------------------------
router.route('/orders')

	
	.post(function(req, res) {
		
		var order = new Order();		
		order.odr_id = req.body.odr_id;
		order.user_id = req.body.user_id;
		order.odr_details = req.body.odr_details;
		order.odr_amount = req.body.odr_amount;
		order.odr_date = req.body.odr_date;
        order.ordernumber = req.body.ordernumber; 

		order.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Order created!' });
		});

		
	})

	
	.get(function(req, res) {
		Order.find(function(err, orders) {
			if (err)
				res.send(err);

			res.json(orders);
		});
	});



router.route('/orders/:order_id')

	
	.get(function(req, res) {
		Order.findById(req.params.order_id, function(err, order) {
			if (err)
				res.send(err);
			res.json(order);
		});
	})

	
	.put(function(req, res) {
		Order.findById(req.params.order_id, function(err, order) {

			if (err)
				res.send(err);

			order.name = req.body.name;
			order.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Order updated!' });
			});

		});
	})

	
	.delete(function(req, res) {
		Order.remove({
			_id: req.params.bear_id
		}, function(err, order) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});




	// Invoice routes
// ----------------------------------------------------
router.route('/invoice')

	
	.post(function(req, res) {
		
		var order = new Invoice();		
		order.odr_invc_no = req.body.odr_invc_no;
		order.odr_id = req.body.odr_id;
		order.store_id = req.body.store_id;
		order.invc_amt = req.body.invc_amt;
		order.paid_amt = req.body.paid_amt;
		order.invc_status = req.body.invc_status;
		order.paid_date = req.body.paid_date;
        order.invc_date = req.body.invc_date; 

		order.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Invoice created!' });
		});

		
	})

	
	.get(function(req, res) {
		Invoice.find(function(err, orders) {
			if (err)
				res.send(err);

			res.json(orders);
		});
	});


router.route('/invoice/:invoice_id')

	
	.get(function(req, res) {
		Invoice.findById(req.params.invoice_id, function(err, order) {
			if (err)
				res.send(err);
			res.json(order);
		});
	})

	
	.put(function(req, res) {
		Invoice.findById(req.params.invoice_id, function(err, order) {

			if (err)
				res.send(err);

		order.odr_invc_no = req.body.odr_invc_no;
		order.odr_id = req.body.odr_id;
		order.store_id = req.body.store_id;
		order.invc_amt = req.body.invc_amt;
		order.paid_amt = req.body.paid_amt;
		order.invc_status = req.body.invc_status;
		order.paid_date = req.body.paid_date;
        order.invc_date = req.body.invc_date;
			order.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Invoice updated!' });
			});

		});
	})

	
	.delete(function(req, res) {
		Invoice.remove({
			_id: req.params.invoice_id
		}, function(err, order) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});





	
router.route('/shipping')

	
	.post(function(req, res) {
		
		var order = new Shipping();		
		order.odr_shipment_id = req.body.odr_shipment_id;
		order.odr_invc_no = req.body.odr_invc_no;
		order.shipping_user = req.body.shipping_user;
		order.deliveryboy_user = req.body.deliveryboy_user;
		order.shipping_status = req.body.shipping_status;
		

		order.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Shipping created!' });
		});

		
	})

	
	.get(function(req, res) {
		Shipping.find(function(err, orders) {
			if (err)
				res.send(err);

			res.json(orders);
		});
	});


router.route('/shipping/:shipping_id')

	
	.get(function(req, res) {
		Shipping.findById(req.params.shipping_id, function(err, order) {
			if (err)
				res.send(err);
			res.json(order);
		});
	})

	
	.put(function(req, res) {
		Shipping.findById(req.params.shipping_id, function(err, order) {

			if (err)
				res.send(err);

		order.odr_shipment_id = req.body.odr_shipment_id;
		order.odr_invc_no = req.body.odr_invc_no;
		order.shipping_user = req.body.shipping_user;
		order.deliveryboy_user = req.body.deliveryboy_user;
		order.shipping_status = req.body.shipping_status;
		
			order.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Shipping updated!' });
			});

		});
	})

	
	.delete(function(req, res) {
		Shipping.remove({
			_id: req.params.shipping_id
		}, function(err, order) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});







router.route('/stores')

	
	.post(function(req, res) {
		
		var order = new Stores();		
		order.store_id = req.body.store_id;
		order.name = req.body.name;
		order.address = req.body.address;
		order.latitude = req.body.latitude;
		order.longitude = req.body.longitude;
		order.city = req.body.city;
		order.zipcode = req.body.zipcode;
		order.country = req.body.country;
		order.contact_person = req.body.contact_person;
		order.store_url = req.body.store_url;
		order.store_logo = req.body.store_logo;
		order.store_contacts = req.body.store_contacts;
		order.created_at = req.body.created_at;
        order.updated_at = req.body.updated_at;
        order.store_status = req.body.store_status;  

		order.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Stores created!' });
		});

		
	})

	
	.get(function(req, res) {
		Stores.find(function(err, orders) {
			if (err)
				res.send(err);

			res.json(orders);
		});
	});


router.route('/stores/:stores_id')

	
	.get(function(req, res) {
		Stores.findById(req.params.stores_id, function(err, order) {
			if (err)
				res.send(err);
			res.json(order);
		});
	})

	
	.put(function(req, res) {
		Stores.findById(req.params.stores_id, function(err, order) {

			if (err)
				res.send(err);

		order.store_id = req.body.store_id;
		order.name = req.body.name;
		order.address = req.body.address;
		order.latitude = req.body.latitude;
		order.longitude = req.body.longitude;
		order.city = req.body.city;
		order.zipcode = req.body.zipcode;
		order.country = req.body.country;
		order.contact_person = req.body.contact_person;
		order.store_url = req.body.store_url;
		order.store_logo = req.body.store_logo;
		order.store_contacts = req.body.store_contacts;
		order.created_at = req.body.created_at;
        order.updated_at = req.body.updated_at;
        order.store_status = req.body.store_status;
			order.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Stores updated!' });
			});

		});
	})

	
	.delete(function(req, res) {
		Stores.remove({
			_id: req.params.stores_id
		}, function(err, order) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});






// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
