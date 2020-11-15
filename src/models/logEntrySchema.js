const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const requireString = { type:String, required: [true, " Title is Required"]};
const requireNumber = { type: Number, required: [true, " Title is Required"]};
const logEntrySchema = new Schema({
    title: requireString,
    description: String,
    comments: String,
    image: String,
    latitude :{...requireNumber, min:-90, max:90},
    longitude:{...requireNumber, min:-180, max:180},
    rating:{type: Number, min: 0, max: 10},
    visitDate:{
        required:true,
        type:Date,
    }
},{
    timestamps:true
})
const LogEntry = model("LogEntry", logEntrySchema)
module.exports  = LogEntry