export class Test {
  private controller;
  constructor(controller: Module, seed_data: Array, before_all?: Function, after_all?: Function) {
    this.controller = controller;
    this.seed_data = seed_data;
    beforeAll(done => {
      // console.log("beforeAll");
      this.controller.saveMany({obj_list: this.seed_data}, done);
    });

    afterAll(done => {
      try{
        console.log("afterAll", mockgoose);
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

  public execute = (testing_name: string, testing_method: Function, validating_method: Function, params = {}, time_out?=10000: number): void => {
    test(testing_name, done => {
      testing_method(params, validating_method(done));
    }, 2000);
  }

  public testCruds = (model_name: string): void => {
    let base_ids = ["5962cdc4422cd35d3547f608", "59642cb4a39cdcb48b989298", "59642cb4a39cdcb48b989299", "59642cb4a39cdcb48b98929a"]
    let base_objects = base_ids.map((id:string) => {
      return {_id: id}
    });
    let data_qtd = this.seed_data.length
    // console.log(base_objects);

    // this.execute(`${model_name} --> saveMany`, this.controller.saveMany, (done) => {
    //   return function validate(err: any, model_obj: any) {
    //     console.log("model_obj", model_obj);
    //     expect(1).toBe(1);
    //     done();
    //   }
    // }, {obj_list: base_objects});

    this.execute(`${model_name} --> save`, this.controller.save, (done) => {
      return function validate(err: any, model_obj: any) {
        expect(model_obj.id).toBe(base_ids[0]);
        done();
      }
    }, {_id: base_ids[0]});

    this.execute(`${model_name} --> getById`, this.controller.getById, (done) => {
      return function validate(err: any, model_obj: any) {
        expect(model_obj.id).toBe(base_ids[0]);
        done();
      }
    }, {id: base_ids[0]});

    this.execute(`${model_name} --> deleteById`, this.controller.deleteById, (done) => {
      return function validate(err: any, model_obj: any) {
        expect(err).toBeNull();
        done();
      }
    }, {id: base_ids[0]});

    this.execute(`${model_name} --> getAll`, this.controller.getAll, (done) => {
      return function validate(err: any, model_objs: any) {
        expect(model_objs).toHaveLength(data_qtd);
        done();
      }
    });

    this.execute(`${model_name} --> getAll cached`, this.controller.getAllCached, (done) => {
      return function validate(err: any, cached_data: any) {
        // console.log("cached_data", cached_data);
        expect(cached_data).toHaveLength(data_qtd);
        done();
      }
    });

  }
}
