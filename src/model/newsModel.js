const mongoose = require("mongoose");

const newsDetailSchema = new mongoose.Schema({
    newsTitle: {
        type: String,
        required: true,
    },
    newsContent: {
        type: String,
        required: true     
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    newsImage: {
        type: String,
        required: false
    },
    adminID: {
        /*
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
        */
       type: String,
       required: true
    }
});

const NewsDetail = mongoose.model("NewsDetail", newsDetailSchema);
module.exports = NewsDetail;
