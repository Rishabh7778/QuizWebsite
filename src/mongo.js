const mongoose = require("mongoose")


mongoose.connect('mongodb://127.0.0.1:27017/myapp')
.then(()=>{
    console.log("mongo connected");
})
.catch(e=>{
    console.log("Error");
    console.log(e);
})

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
})

const Collection = new mongoose.model("AuthCollection", Schema)

module.exports = Collection

// const RegSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     email:{
//         type: String,
//         required: true
//     },
//     Message:{
//         type: String,
//         required: true
//     }
// })

// const RegisterCollection = new mongoose.model('form', RegSchema)

// module.exports = RegisterCollection
