export class Test {
  constructor(controller: Module, seed_data: Array, before_all: Function, after_all: Function) {
    beforeAll(done => {
      // console.log("beforeAll");
      controller.saveMany(seed_data, done);
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
}
