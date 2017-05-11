import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import index from "./routes/index";

// import * as ejs from "ejs";
// import * as favicon from "serve-favicon";

class ExpressApp {

  private instance: express.Express;

  constructor() {
    this.instance = express();
    this.initMiddleware();
    this.initRoutes();
  }

  public getInstance = () => {
    return this.instance;
  }

  private initMiddleware = () => {

    this.instance.use(logger("dev"));
    this.instance.use(bodyParser.json());
    this.instance.use(bodyParser.urlencoded({ extended: false }));
    this.instance.use(cookieParser());

    // view engine setup

    // this.instance.set("views", path.join(__dirname, "views"));
    // this.instance.engine(".html", ejs.renderFile);
    // this.instance.set("view engine", "html");
    // this.instance.use(favicon(path.join(__dirname,'public','favicon.ico')));
    // this.instance.use(express.static(path.join(__dirname, "public")));
  }

  private initRoutes = () => {

    this.instance.use("/", index);

    // catch 404 and forward to error handler
    this.instance.use((req, res, next) => {
      const err: Error | any = new Error("Not Found");
      err.status = 404;
      next(err);
    });

    // development error handler
    if (process.env.NODE_ENV === "development") {
      this.instance.use((err: Error | any, req, res, next) => {
        res.status(err.status || 500);
        res.render("error", {
          title: "error",
          message: err.message,
          error: err,
        });
      });
    }

    // production error handler
    this.instance.use((err: Error | any, req, res, next) => {
      res.status(err.status || 500);
      res.render("error", {
        title: "error",
        message: err.message,
        error: {},
      });
    });
  }

}

export default new ExpressApp().getInstance();