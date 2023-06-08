import {Request, Response} from "express";
import {Bot} from "../../models/bot.js";
import knex from "../../models/index.js";

export default async function getBot(req: Request, res: Response) {
    const bot = await knex<Bot>('bots').where('slug', req.params.slug).first();
    if (bot === undefined){
        return res.status(404).json({error: "Bot not found"});
    }
    return res.json(bot);
}
