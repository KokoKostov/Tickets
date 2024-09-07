

const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: false 
       
    },
    location: {
        type:String,
        required:true
    },
    date : {
        type: Date,
        required: true
        
    },
    address: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    image: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'username',
        required: true
    },
    buyer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'username',
    
    }]
});
const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket