import {mongoose} from 'mongoose';

const MeetingSchema = new Schema({
    userId :{type:string},
    meetingCode:{type:string, required:true},
    date:{type:Date, default:Date.now},



})

const Meeting = mongoose.model('Meeting', MeetingSchema);
export {Meeting};