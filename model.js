const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://jandir_17:PtiOpPuiU8jdjXMs@cluster0.vqspd.mongodb.net/casaPeruReviews?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


const reviewsSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
})

const Review = mongoose.model("Review", reviewsSchema);

module.exports ={
    Review: Review
}