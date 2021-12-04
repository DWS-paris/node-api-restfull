/*
Import
*/
    const mongoose = require('mongoose');
    const { Schema } = mongoose;
//

/*
Definition
*/
    const MySchema = new Schema({
        headline: {
            type: String,
            required: true,
        },
        abstract: {
            type: String,
            required: true,
        },

        dateCreated: { 
            type: Date, 
            default: new Date() 
        },
    })
//

/* 
Export
*/
    module.exports = mongoose.model('item', MySchema)
//