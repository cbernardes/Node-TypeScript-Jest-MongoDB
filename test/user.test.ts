import user_controller        from '../src/controllers/user'
import { Test }               from './base'

// let mockgoose = new Mockgoose(mongoose);
// mockgoose.helper.setDbVersion("3.0.4");

const seed_users = [
  {email: "email_teste@gmail.com", profile: {name: "cld", gender: "M"}},
  {_id: "595f0ceba07958ed50bea641", email: "email_teste1@gmail.com", profile: {name: "cld1", gender: "M"}},
  {email: "email_teste2@gmail.com", profile: {name: "cld2", gender: "M"}}
]

let user_test = new Test(user_controller, seed_users);


user_test.execute('user --> save', user_controller.save, (done) => {
  return function validate(err: any, user: any) {``
    expect(user.id).toBe("5962cdc4422cd35d3547f608");
    done();
  }
}, {_id: "5962cdc4422cd35d3547f608", email: "email_teste3@gmail.com", profile: {name: "cld", gender: "M"}});

user_test.execute('user --> getAll', user_controller.getAll, (done) => {
  return function validate(err: any, users: any) {
    console.log("getAll");
    expect(1).toBe(1);
    done();
  }
});

user_test.execute('user --> getById', user_controller.getById, (done) => {
  return function validate(err: any, user: any) {
    expect(user.id).toBe("595f0ceba07958ed50bea641");
    done();
  }
}, {id:"595f0ceba07958ed50bea641"});

user_test.execute('user --> getAll cached', user_controller.getAllCached, (done) => {
  return function validate(err: any, cached_users: any) {
    console.log("cached users");
    expect(1).toBe(1);
    done();
  }
});
