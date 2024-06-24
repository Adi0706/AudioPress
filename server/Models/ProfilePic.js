const mongoose = require('mongoose');

const ProfilePictureSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true // Make sure image URL is required
  }
});

const ProfilePictureModel = mongoose.model('ProfilePicture', ProfilePictureSchema);

module.exports = ProfilePictureModel;
