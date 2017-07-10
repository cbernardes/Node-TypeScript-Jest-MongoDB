import * as cache_manager   from 'cache-manager'

let memoryCache = cache_manager.caching({store: 'memory', max: 100, ttl: 222220/*seconds*/});


export function cacheWrapper(name: string, method: Function) {
  return (params: any, done: Function): void => {
    memoryCache.wrap(name, function (cacheCallback) {
        method(params, cacheCallback);
    }, {ttl: 30}, done);
  }
}
