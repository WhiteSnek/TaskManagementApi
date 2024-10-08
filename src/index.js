const dotenv = require('dotenv')
const {app} = require("./app.js")
const {connectDb} = require('./db/index.js')
dotenv.config({
    path: "./.env"
});

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDb connection error: ",err);
})