import { Model } from "mongoose";
import { IUserModel } from "./user";
import { IBuCertificationTicketModel } from "./bu_certification_ticket";

export interface IModel {
  user: Model<IUserModel>;
  bu_certification_ticket: Model<IBuCertificationTicketModel>;
}
