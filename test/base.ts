import * as  mongoose         from 'mongoose'
import * as  config           from 'config'
import { Mockgoose }          from 'mockgoose'

let mockgoose = new Mockgoose(mongoose);
// mockgoose.helper.setDbVersion("3.0.4");

export class Test {
  constructor(controller: Module, seed_data: Array, before_all: Function, after_all: Function) {
    beforeAll(done => {
      try{
        console.log("beforeAll");
        mockgoose.prepareStorage().then(() => {
          console.log("Preparing mockgoose data");
      		mongoose.connect(config.get("database.connection"), (err) =>{
            console.log("db connecting");
          });
          mongoose.connection.on('connected', () => {
            console.log('db connected');
          });
          controller.save(seed_data[1], done);
      	});
      }
      catch(error){
        console.log("Error while setting default connection", error)
        done();
      }
    });

    afterAll(done => {
      try{
        console.log("afterAll");
        mockgoose.helper.reset().then(() => {
          console.log("mockgoose reset");
          done();
        });
      }
      catch(error){
        console.log("Error while reseting mock db", err);
        done();
      }
    });
  }

  public execute = (testing_name: string, testing_method, validating_method: Function, params = {}, time_out?: number): void => {
    test(testing_name, done => {
      testing_method(params, validating_method(done));
    }, 60000);
  }
}
