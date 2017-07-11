import * as mongoose        from 'mongoose'
import { cacheWrapper }     from './cache'


export class Crud {
  private model;  // we dont want the model being accessed outside the class
  constructor(Model) {
    this.model = Model;
  }

  // alert!!! in this case, the object this is undefined
  // getAll (params, done) {
  //   this.model.find({}).exec(done);
  // }

  //  methodos accessing DB
  public getAll = (params: any, done: Function): void => {
    this.model.find({}, done);
  }

  public save = (params: any, done: Function): void => {
    let db_model = new this.model(params);
    db_model.save(done);
  }

  public deleteById = (params: any, done: Function): void => {
    let {id, _id} = params
    this.model.remove({_id: id || _id}).exec(done);
  }

  public deleteByQuery = (params: any, done: Function): void => {
    let {query} = params
    this.model.remove({query}).exec(done);
  }

  public saveMany = (params: any, done: Function): void => {
    let {obj_list} = params
    this.model.create(obj_list, done);
  }

  public getById = (params: any, done: Function): void => {
    let {id, _id} = params
    this.model.findOne({_id: id || _id}).exec(done);
  }

  // todo define a key generator to name a cache method
  public getAllCached = cacheWrapper("getAll", this.getAll);
  public getByIdCached = cacheWrapper("getById", this.getById);

}
