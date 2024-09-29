import { ObjectId } from "mongodb";


export default class User {
    constructor(public user_first_name: string, public user_last_name: string, public user_email: string, public ingredients: Object[],  public id?: ObjectId) {}
}
