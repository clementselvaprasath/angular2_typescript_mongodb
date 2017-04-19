import { Document } from "mongoose";
import { IBuCertificationTicket } from "../interfaces/bu_certification_ticket";

export interface IBuCertificationTicketModel extends IBuCertificationTicket, Document {
  //custom methods for your model would be defined here
}
