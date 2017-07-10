import UserModel          from '../models/User' //or { default as User }
import { Crud }           from './base'


class User extends Crud {
  constructor(Model) { super(Model); }

  public get_byEmail = (params: any, done: Function): void => {
    let {email} = params
    UserModel.find({email}).exec(done);
  }
}

let user_object = new User(UserModel);

export default user_object
