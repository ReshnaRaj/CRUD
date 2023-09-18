const mongoose=require('mongoose')
const dbConnection=async ()=>{
    try {
        mongoose.connect("mongodb+srv://reshnarajan84:JKcw4SbUakEUgCNn@cluster0.gvpjfjg.mongodb.net/Dummydata",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Database is connected")
    } catch (error) {
        console.log("Database error",error)
        
    }
}
module.exports=dbConnection