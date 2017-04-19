import { suite, test } from "mocha-typescript";
import { IUser } from "../interfaces/user";
import { IUserModel } from "../models/user";
import { userSchema } from "../schemas/user";
import { IBuCertificationTicket } from "../interfaces/bu_certification_ticket";
import { IBuCertificationTicketModel } from "../models/bu_certification_ticket";
import { buCertificationTicketSchema } from "../schemas/bu_certification_ticket";
import mongoose = require("mongoose");

@suite
class UserTest {

  //store test data
  private data: IBuCertificationTicket;

  //the User model
  //public static User: mongoose.Model<IUserModel>;
  public static BuCertificationTicket: mongoose.Model<IBuCertificationTicketModel>;

  public static before() {
    //use q promises
    global.Promise = require("q").Promise;

    //use q library for mongoose promise
    mongoose.Promise = global.Promise;

    //connect to mongoose and create model
    const MONGODB_CONNECTION: string = "mongodb://10.24.155.57:27017/heros";
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
    //UserTest.User = connection.model<IUserModel>("User", userSchema);
    UserTest.BuCertificationTicket = connection.model<IBuCertificationTicketModel>("BuCertificationTicket", buCertificationTicketSchema);

    //require chai and use should() assertions
    let chai = require("chai");
    chai.should();
  }

  constructor() {
    this.data = {
      pre_certified: 2,
      none: 3,
      name: "Love",
      in_dashboard : 4,
      auto_certified : 5
    };
  }

  @test("should create a new User")
  public create() {
    //create user and return promise
    //return new UserTest.User(this.data).save().then(result => {
     // //verify _id property exists
    //  result._id.should.exist;

    //  //verify email
    //  result.email.should.equal(this.data.email);

     // //verify firstName
     // result.firstName.should.equal(this.data.firstName);

    //  //verify lastName
     // result.lastName.should.equal(this.data.lastName);
   // });
      console.log('In create');
   return new UserTest.BuCertificationTicket(this.data).save().then(result => {
      console.log('Entering save');
      //verify _id property exists
      result._id.should.exist;

      //verify email
      result.name.should.equal(this.data.name);

      //verify firstName
      //result.firstName.should.equal(this.data.firstName);

      //verify lastName
      //result.lastName.should.equal(this.data.lastName);
      console.log('Exiting');
   });
  }
}
