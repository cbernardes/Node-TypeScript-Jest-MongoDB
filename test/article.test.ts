import article_controller     from '../src/controllers/article'
import { Test }               from './base'

// put it in an extra file if too big
const seed_articles = [
  {
    _id : "59002d435788d0a82e51c06d",title : "prem", subtitle : "then a new article for the latest",
    content : "<p>this article was created in order to guarantee the integrity of the new contents of the new features</p><p><br></p><img src=\"/images/rich-text/1493711314223-undefined.jpeg\" style=\"width: 819px;\"><p><br></p><blockquote>dflakdsfjl;ksdafdf<br>sdfadlkfajsdlfjasdklfjaklsdjfklsdjfa<br>dsfakldsjfadskljfd</blockquote><p><br></p>",
    dates : {modified : new Date("2017-06-13T23:45:18.821+0000"), created : new Date("2017-04-26T05:16:51.349+0000")},
    display : {test: true, live : true, active : true},
    planning : {start : new Date("2017-04-13T05:16:00.000+0000"), end: new Date("2018-06-14T05:16:00.000+0000")},
    url : "article-with-item"
  },
  {
    _id : "59080ebf47058966be91ee1d", title : "featured article", subtitle : "a featured article",
    content : "<p>this article was created in order to guarantee the integrity of the new contents of the new features</p>",
    dates : { modified : new Date("2017-06-13T23:48:37.258+0000"), created : new Date("2017-04-26T05:16:51.349+0000")},
    display : { test : true, live: true, active : true},
    planning: { start : new Date("2017-04-13T05:16:00.000+0000"), end: new Date("2018-06-14T05:16:00.000+0000")},
    url : "another-article-titlke-name"
  }
]

let article_test = new Test(article_controller, seed_articles);

article_test.testCruds("article");
