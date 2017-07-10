import user_controller        from '../src/controllers/user'
import { Test }               from './base'

const seed_users = [
  {_id: "595f0ceba07958ed50bea641", email: "email_teste1@gmail.com", profile: {name: "cld1", gender: "M"}},
  {_id: "5962da585f1f3d604e721c8b", email: "email_teste2@gmail.com", profile: {name: "cld2", gender: "M"}},
  {_id: "5962da585f1f3d604e721c8a", email: "email_teste3@gmail.com", profile: {name: "cld3", gender: "M"}}
]

let user_test = new Test(user_controller, seed_users);


user_test.execute('user --> save', user_controller.save, (done) => {
  return function validate(err: any, user: any) {``
    expect(user.id).toBe("5962cdc4422cd35d3547f608");
    done();
  }
}, {_id: "5962cdc4422cd35d3547f608", email: "email_teste@gmail.com", profile: {name: "cld", gender: "M"}});

user_test.execute('user --> deleteById', user_controller.deleteById, (done) => {
  return function validate(err: any, user: any) {
    expect(err).toBeNull();
    done();
  }
}, {_id: "5962cdc4422cd35d3547f608"});

user_test.execute('user --> getAll', user_controller.getAll, (done) => {
  return function validate(err: any, users: any) {
    expect(users).toHaveLength(3);
    done();
  }
});

user_test.execute('user --> getById', user_controller.getById, (done) => {
  return function validate(err: any, user: any) {
    expect(user.id).toBe("595f0ceba07958ed50bea641");
    done();
  }
}, {id:"595f0ceba07958ed50bea641"});

user_test.execute('user --> get_byEmail', user_controller.get_byEmail, (done) => {
  return function validate(err: any, user: any) {
    expect(user).toHaveLength(1);
    expect(user[0].email).toBe("email_teste1@gmail.com");
    done();
  }
}, {email:"email_teste1@gmail.com"});

user_test.execute('user --> getAll cached', user_controller.getAllCached, (done) => {
  return function validate(err: any, cached_users: any) {
    console.log("cached_users", cached_users);
    expect(cached_users).toHaveLength(3);
    done();
  }
});
