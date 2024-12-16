const express=require("express");
const app=express();
const urlRoute=require('./routes/url')
const URL=require('./models/url')
const {connectToMongoDB}=require('./connect');
const PORT=8001;

connectToMongoDB('mongodb://localhost:27017/short-url')   // name of db is short-url
.then(()=>console.log("MongoDb connected"))
app.use(express.json());   
app.use('/url',urlRoute);
app.get('/:shortId', async(req,res)=>{
    const shortId=req.params.shortId;
  const entry=  await URL.findOneAndUpdate({
            shortId
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        },
    },
}
);
res.redirect(entry.redirectURL);
})
app.listen(PORT,()=>console.log(`server started at port ${8001}`))