const mongoose = require('mongoose');

const ProfilePictureSchema = new mongoose.Schema({

userId:{
  type:String,
  required:true,
},
  image: {
    type: String,
    required: true 
  }
});

const ProfilePictureModel = mongoose.model('ProfilePicture', ProfilePictureSchema);

module.exports = ProfilePictureModel;
