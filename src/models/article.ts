import { Document, Schema, model}     from 'mongoose'
import { Dates, Planning, Display }   from './base'

var articleSchema = new Schema({
  title: String,
  subtitle: String,
  content: String,
  url: String,
  dates: Dates,
  planning: Planning,
  display: Display
}, { timestamps: true });

const Article = model("Article", articleSchema);
export default Article;
