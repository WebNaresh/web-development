const express = require ("express");
const path = require("path")
const app = express();
const nodemailer = require('nodemailer');
const port = 3000;
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser: true,useUnifiedTopology: true});

// define mongoose schema
var contactSchema = new mongoose.Schema({
    name : String ,
    phone : String ,
    email : String ,
    address : String ,
    desc : String
});

var Contact = mongoose.model('Contact',contactSchema);



// EXPRESS SPECIFIC STUFF


app.use('/static' , express.static('static'))// serving static files

// PUG SPECIFIC STUFF

app.set('view engine','pug')// set the template engine as pug
app.set('views', path.join(__dirname,'views'))// set the views  directiory


// END POINTS
app.get('/',(req,res)=>{
    const params ={ }
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params ={ }
    res.status(200).render('contact.pug',params);
})
app.get('/contact1',(req,res)=>{
    const params ={ }
    res.status(200).render('contact1.pug',params);
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this items has been saved to the database")
    })
    .catch(()=>{
        res.status(400).send("The items was not saved to the database")
    });

})
app.post('/contact1',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this items has been saved to the database")
    })
    .catch(()=>{
        res.status(400).send("The items was not saved to the database")
    });

})

// START THE SERVER
app.listen(port,()=>{
    console.log(`Server running at port ${port}/`);
});