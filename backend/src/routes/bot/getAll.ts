import {Request, Response} from "express";
import {Bot} from "../../models/bot.js";
import knex from "../../models/index.js";

export default async function getBots(req: Request, res: Response<Bot[]>) {
    const bots = await knex<Bot>('bots').select();
    return res.json(bots);
}
