let mongoose = require('mongoose');
mongoose.promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true});

mongoose.connection.once('open', () => {
  console.log(`Mongoose connnected to : ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;