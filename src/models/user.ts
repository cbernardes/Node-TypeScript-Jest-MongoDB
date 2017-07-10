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

// var User1 = new Schema({});
//
// userSchema.statics.find = function (query, callback) {
//   var user = new User1({email:"teste"});
//   user.save(callback);
// };

const User = model("User", userSchema);
export default User;
