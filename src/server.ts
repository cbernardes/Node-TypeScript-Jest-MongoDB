import * as express         from "express";
import * as bodyParser      from "body-parser";
import MainRouters          from "./routers/main";
import * as config          from "config";
import * as mongoose        from "mongoose";



/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(config.get("database.connection"));

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});
mongoose.connection.on("connected", () => {
  console.log(`MongoDB connected to ${config.get("database.connection")}`);
});

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
 next();
});

app.use('/', MainRouters);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
});

module.exports = app;
