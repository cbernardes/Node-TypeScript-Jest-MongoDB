import * as mongoose        from 'mongoose'
import * as cache_manager   from 'cache-manager'

let memoryCache = cache_manager.caching({store: 'memory', max: 100, ttl: 222220/*seconds*/});

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

  public getById = (params: any, done: Function): void => {
    let {id} = params
    this.model.findOne({_id: id}).exec(done);
  }

  // cached methods
  private cachedMethod = (name: string, method: Function) => {
    return (params: any, done: Function): void => {
      console.log("cache_manager", cache_manager);
      memoryCache.wrap(name, function (cacheCallback) {
          method(params, cacheCallback);
      }, {ttl: 30}, done);
    }
  }

  // todo define a key generator to name a cache method
  public getAllCached = this.cachedMethod("getAll", this.getAll);
  public getByIdCached = this.cachedMethod("getById", this.getById);

}
