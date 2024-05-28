import { Schema, model } from 'mongoose';

/*const ListickSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    id: {type: Number, required: true},
    top: {type: Number, required: true},
    left: {type: Number, required: true},
    text: {type: String},
})*/

const ListickSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    list:[
        {
            id: {type: Number, required: true},
            top: {type: Number, required: true},
            left: {type: Number, required: true},
            text: {type: String},
        }
    ]
    
})

export default model('Listick', ListickSchema);