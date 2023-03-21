const express = require('express');
const app = express();
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrls')
const connect = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/urlShortner");
    console.log("DB Connect");
}
connect();
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const shortUrls = await shortUrl.find()
    res.render('index' , { shortUrls : shortUrls });
})

app.post("/shortUrls" , async ( req, res ) => {
    await shortUrl.create( {
        full : req.body.fullurl
    })
    res.redirect("/")
})

app.get("/:shorturl", async (req, res) => {
    const shortUrls = await shortUrl.findOne({short : req.params.shorturl})
    if ( shortUrls == null ) {
        res.sendStatus(404)
    }
    shortUrls.clicks++;
    shortUrls.save();
    res.redirect(shortUrls.full)
})

app.listen(process.env.PORT || 8000 , () => {
    console.log(`server is start`);
})