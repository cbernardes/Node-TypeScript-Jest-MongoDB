export class Test {
  private controller;
  constructor(controller: Module, seed_data: Array, before_all: Function, after_all: Function) {
    this.controller = controller;
    this.seed_data = seed_data;
    beforeAll(done => {
      // console.log("beforeAll");
      this.controller.saveMany(this.seed_data, done);
    });

    afterAll(done => {
      try{
        // console.log("afterAll");
        mockgoose.helper.reset().then(() => {
          // console.log("mockgoose reset");
          done();
        });
      }
      catch(error){
        console.log("Error while reseting mock db", err);
        done();
      }
    });
  }

  public execute = (testing_name: string, testing_method, validating_method: Function, params = {}, time_out?=10000: number): void => {
    test(testing_name, done => {
      testing_method(params, validating_method(done));
    }, 2000);
  }

  public testCruds = (model_name: string): void => {
    let base_id= "5962cdc4422cd35d3547f608"
    let data_qtd = this.seed_data.length
    this.execute(`${model_name} --> save`, this.controller.save, (done) => {
      return function validate(err: any, user: any) {
        expect(user.id).toBe(base_id);
        done();
      }
    }, {_id: base_id});

    this.execute('user --> getById', this.controller.getById, (done) => {
      return function validate(err: any, user: any) {
        expect(user.id).toBe(base_id);
        done();
      }
    }, {id: base_id});

    this.execute('user --> deleteById', this.controller.deleteById, (done) => {
      return function validate(err: any, user: any) {
        expect(err).toBeNull();
        done();
      }
    }, {_id: base_id});

    this.execute('user --> getAll', this.controller.getAll, (done) => {
      return function validate(err: any, users: any) {
        expect(users).toHaveLength(data_qtd);
        done();
      }
    });

    this.execute('user --> getAll cached', this.controller.getAllCached, (done) => {
      return function validate(err: any, cached_users: any) {
        expect(cached_users).toHaveLength(data_qtd);
        done();
      }
    });

  }
}
