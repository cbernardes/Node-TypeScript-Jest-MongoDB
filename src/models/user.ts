import { Document, Schema, model}     from 'mongoose'
// import * as base                      from './base'

var userSchema = new Schema({
  email: { type: String, unique: true },

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });


const User = model("User", userSchema);
export default User;
