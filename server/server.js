//----------importing modules------------

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//-----------------mongodb---------------
//importing config info
const db = require('./app/config/database');
const db_url = process.env.NODE_ENV ? db.production.url : db.development.url;
//connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(db_url);
//on connection
mongoose.connection.on('connected', ()=> {
	console.log('Connected to Database mongodb');
})
//db connection error hook
mongoose.connection.on('error', (err)=> {
	if (err) {
		console.log("Error in Database connection:" + err);	
	}
})

//---------app configuration-------------
const app = express();
//port no
const port = process.env.PORT || 5030;

//----------adding middlewares------------
//Compress all routes
app.use(compression());
//Using Helmet to protect against well known vulnerabilities
app.use(helmet());
//cors
app.use(cors());
//body - parser
//parse application/json
app.use(bodyParser.json());
//parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));
//cookie - parser
app.use(cookieParser());

//------------routes-------------------
const apiRoute = require('./app/routes/api');
app.use('/api', apiRoute);

app.listen(port, () => {	
	console.log('RealEstate Server started at port:' + port);
});

//shoutout to the user
console.log('Magic happens on port ' + port);
//expose app
exports = module.exports = app;

// const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
// const jwksRsa = require('jwks-rsa');

// const checkJwt = jwt({
//     // Dynamically provide a signing key
//     // based on the kid in the header and 
//     // the signing keys provided by the JWKS endpoint.
//     secret: jwksRsa.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: `https://realestate05.auth0.com/.well-known/jwks.json`
//     }),

//     // Validate the audience and the issuer.
//     audience: 'https://realestate05.auth0.com/api/v2/',
//     issuer: `https://realestate05.auth0.com/`,
//     algorithms: ['RS256']
// });

// app.get('/api/public', function (req, res) {
//     res.json({
//         message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
//     });
// });

// // Enable the use of the jwtCheck middleware in all of our routes
// app.use(checkJwt);

// // If we do not get the correct credentials, we’ll return an appropriate message
// app.use(function (err, req, res, next) {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).json({ message: 'Missing or invalid token' });
//     }
// });

// // This route need authentication
// app.get('/api/private', function (req, res) {
//     res.json({
//         message: 'Hello from a private endpoint! You need to be authenticated to see this.'
//     });
// });

// const checkScopes = jwtAuthz(['read:messages']);

// app.get('/api/private-scoped', checkScopes, function (req, res) {
//     res.json({
//         message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//     });
// });

// Launch our API Server and have it listen on port 8080.