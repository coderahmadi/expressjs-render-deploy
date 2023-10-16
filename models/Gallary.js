import { Schema, model } from "mongoose";

const gallary = new Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    uploadDate: {
        type: Date,
        required: true
    },
    user: {
        ip: {
            type: String,
            required: true
        }
    }
});

const Gallary = model('gallary', gallary);
export default Gallary;