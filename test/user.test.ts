import user_controller        from '../src/controllers/user'
import { Test }               from './base'


const seed_users = [
  {_id: "595f0ceba07958ed50bea641", email: "email_teste1@gmail.com", profile: {name: "cld1", gender: "M"}},
  {_id: "5962da585f1f3d604e721c8b", email: "email_teste2@gmail.com", profile: {name: "cld2", gender: "M"}},
  {_id: "5962da585f1f3d604e721c8a", email: "email_teste3@gmail.com", profile: {name: "cld3", gender: "M"}}
]

let user_test = new Test(user_controller, seed_users);

user_test.execute('user --> get_byEmail', user_controller.get_byEmail, (done) => {
  return function validate(err: any, user: any) {
    expect(user).toHaveLength(1);
    expect(user[0].email).toBe("email_teste1@gmail.com");
    done();
  }
}, {email:"email_teste1@gmail.com"});

user_test.testCruds("user");
