import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import mongoose = require("mongoose"); //import mongoose

//routes
import { IndexRoute } from "./routes/index";

//interfaces
import { IUser } from "./interfaces/user"; //import IUser
import { IBuCertificationTicket } from "./interfaces/bu_certification_ticket";

//models
import { IModel } from "./models/model"; //import IModel
import { IUserModel } from "./models/user"; //import IUserModel
import { IBuCertificationTicketModel } from "./models/bu_certification_ticket";

//schemas
import { userSchema } from "./schemas/user"; //import userSchema
import { buCertificationTicketSchema } from "./schemas/bu_certification_ticket";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  private model: IModel; //an instance of IModel

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //instance defaults
    this.model = Object(); //initialize this to an empty object

    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    //empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    const MONGODB_CONNECTION: string = "mongodb://10.24.155.57:27017/eci_bot";

    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    //mount logger
    this.app.use(logger("dev"));

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    //mount cookie parker
    this.app.use(cookieParser("SECRET_GOES_HERE"));

    //mount override
    this.app.use(methodOverride());

    //use q promises
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    //connect to mongoose
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

    //create models
    //this.model.user = connection.model<IUserModel>("User", userSchema);

    this.model.bu_certification_ticket = connection.model<IBuCertificationTicketModel>("BuCertificationTicket", buCertificationTicketSchema);

    //this.model.user.find({}, function (err, docs) {
    //  if (err) {
    //    //res.status(504);
    //    //res.end(err);
    //    console.log('Error :', err);
     // } else {
     //   for (var i = 0; i < docs.length; i++) {
     //    console.log('user:', docs[i].firstName);
     //   }
     //   //res.end(JSON.stringify(docs));
     // }
    //});
    console.log('Calling bu_certification_ticket');
    this.model.bu_certification_ticket.find({}, function (err, docs) {
      if (err) {
        //res.status(504);
        //res.end(err);
        console.log('Error :', err);
      } else {
        for (var i = 0; i < docs.length; i++) {
         console.log('user:', docs[i].name);
        }
        //res.end(JSON.stringify(docs));
      }
    });

    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });

    //error handling
    this.app.use(errorHandler());
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);

    //use router middleware
    this.app.use(router);
  }

}
