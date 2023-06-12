import {Request, Response} from "express";
import {Bot} from "../../models/bot.js";
import knex from "../../models/index.js";
import {ErrorTypes, SimpleErrorType} from "../_interface.js";

export default async function getBot(req: Request, res: Response<Bot|SimpleErrorType>) {
    const bot = await knex<Bot>('bots').where('slug', req.params.slug).first();
    if (bot === undefined){
        return res.status(404).json({type: ErrorTypes.NotFound, message: "Bot not found"});
    }
    return res.json({
        ...bot,
        // Database stores JSON as string, so we need to parse it back.
        prefix: bot.prefix,
    });
}
