import * as  mongoose         from 'mongoose'
import * as  config           from 'config'
import { Mockgoose }          from 'mockgoose'
import { Test }               from './base'


let mockgoose = new Mockgoose(mongoose);
mongoose.Promise = global.Promise


async function mockgooseConnection() {
  // console.log("Preparing mockgoose data");
  await mockgoose.prepareStorage();
  mongoose.connect(config.get("database.connection"), {useMongoClient: true})
  mongoose.connection.on('connected', () => {
    let models = mongoose.models;
    // console.log('db connected', mongoose.models);
  });
  mongoose.connection.on('disconnected', function () {
    // console.log('db disconnected');
  });

}


try{
  mockgooseConnection();
}
catch(error){
  console.log("Error while setting default connection", error);
}


let information = 10
export information;
