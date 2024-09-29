import next, { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Users from "../app/models/recipe";

export const gamesRouter = express.Router();

gamesRouter.use(express.json());




