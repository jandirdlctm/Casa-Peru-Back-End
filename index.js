const express = require("express");
var moment = require("moment");
const cors = require("cors");

const model = require("./model");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended : false}));
app.use(cors());


// REVIEW METHODS

//LIST ALL THE REVIEWS

app.get("/reviews", function(req,res){
    model.Review.find().sort({date: 'asc'}).then(function(reviews){
        for (var i = 0; i < reviews.length; i++){
            var dateCreated = new Date(reviews[i].date);
            reviews[i].date = moment(dateCreated).fromNow();
            reviews[i].image = reviews[i].experience;
        }
        res.json(reviews);
    })
})


app.post("/reviews", function(req,res){
    
    var dateCreated = new Date();

    var review = new model.Review({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        experience: req.body.experience,
        details: req.body.details,
        date: dateCreated.toString()
    });

    review.save().then(()=>{
        res.sendStatus(201);
    }).catch(function(error){
        if (error.errors){
            var messages = {};
            for (var e in error.errors){
                messages[e] = error.errors[e].message;
            }
            res.status(422).json(messages);
        }
        else{
            res.sendStatus(500)
        }
    })
})

app.listen(port, function(){
    console.log(`app listening at http://localhost:${port}`);
})