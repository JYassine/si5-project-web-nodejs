const MongoClient = require('mongodb').MongoClient;

module.exports = function(callback) {

    var url = 'mongodb://'+process.env.HOST+':'+process.env.PORT_MONGODB+'/'+process.env.DBNAME;
    MongoClient.connect(url, { useUnifiedTopology: true }, callback)
}