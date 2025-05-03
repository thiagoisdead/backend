const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid')

const generateId = () => {
    return nanoid(10)
}

const eventSchema = new mongoose.Schema({
    eventId: { type: String, default: generateId },
    name: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true },
    participants: { type: Number, required: true },
    creatorId: { type: String, cref: 'User', },
    permissions: { type: String },
    address: {type: Object, required: true},
}, {
    timestamps: true
});
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
