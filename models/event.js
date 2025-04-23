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
    nickname: { type: String, required: true },
}, {
    timestamps: true
});
eventSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch (err) {
        next(err);
    }
})
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
