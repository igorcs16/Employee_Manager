const mongoose = require('mongoose');
const url = 'mongodb://localhost/employees';

mongoose.set('useCreateIndex', true );
mongoose.connect(url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;