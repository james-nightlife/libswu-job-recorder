import mongoose from 'mongoose';

const schemaJobRecord = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true, 
    },
    workDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    progression: {
        type: String,
        required: true,
    },
    hours:{
        type: Number,
        required: true,
    },
    minutes: {
        type: Number,
        required: true,
    },
    fileNames: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

export const modelJobRecord = mongoose.model('JobRecord', schemaJobRecord);