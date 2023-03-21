const mongoose =  require('mongoose');
const schema = mongoose.Schema;
const shorId = require('shortid')

const shortUrlSchema = new schema({
    full : {
        type : String,
        required : true
    },
    short : {
        type : String,
        required : true,
        default : shorId.generate
    },
    clicks : {
        type : String,
        required : true,
        default : 0
    }
})

module.exports = mongoose.model('ShortUrl' , shortUrlSchema)