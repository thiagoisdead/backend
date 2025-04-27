const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});
blacklistTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

module.exports = BlacklistToken;