import ArticleModel       from '../models/Article'
import { Crud }           from './base'


class Article extends Crud {
  constructor(Model) { super(Model); }
}

let article_object = new Article(ArticleModel);
export default article_object
