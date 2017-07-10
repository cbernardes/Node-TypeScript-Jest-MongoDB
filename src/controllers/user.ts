// import * as mongooseMock  from 'mongoose-mock'
// import * as proxyquire    from 'proxyquire'
import UserModel          from '../models/User' //or { default as User }
import { Crud }           from './base'

// const UserMock = proxyquire('../models/User', { 'mongoose': mongooseMock });

// let user_model = UserMock.default

class User extends Crud {
  constructor(Model) { super(Model); }

  public get_byEmail = (params: any, done: Function): void => {
    let {email} = params
    UserModel.find({email:email}).exec(done);
  }
}
// for(var key in user_model) {
//   console.log("key", key, user_model[key]);
// }
// console.log("user_model", user_model.findOne);
// let user_object = new User(UserModel);
let user_object = new User(UserModel);

export default user_object
