const mongoose = require('mongoose');

const mongoOptions = {
  // useMongoClient: true 
}
//set Promise library for mongoose
mongoose.Promise = global.Promise
const db_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

mongoose.connect(db_uri, mongoOptions, err => {
  if(!err) console.log('Connection to database succeeded')
  else console.log('ERROR: FAILED TO CONNECT TO DATABASE \n' + err)
});

const db = mongoose.connection;
exports.db = db;