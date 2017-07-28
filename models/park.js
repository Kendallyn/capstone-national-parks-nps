var mongoose = require('mongoose');

var parkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }

});

var park = mongoose.model('park', parkSchema);

module.exports = park;
