import { Router, Request, Response, NextFunction}   from 'express';
import * as _                                       from 'underscore';

export function getParameters(req: Request) {
  return _.extend(req.params, req.query, req.body);
}

export function wrapper(method) {
  return (req: Request, res: Response, next: NextFunction) => {
    let params = getParameters(req);
    try{
      method(params, (err, result) => {
        if (err) {return next(err);}
        res.status(200).send(result);
      });
    }
    catch(err){
      console.log("Err:", err);
      res.status(200).send("internal error");
    }
  }
}
