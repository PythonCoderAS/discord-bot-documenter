import {Request, Response} from "express";
import {Bot} from "../../models/bot.js";
import knex from "../../models/index.js";
import {ErrorTypes, SimpleErrorType} from "../_interface.js";

export default async function deleteBot(req: Request, res: Response<SimpleErrorType>) {
    const bot = await knex<Bot>('bots').where('slug', req.params.slug).first();
    if (bot === undefined){
        return res.status(404).json({type: ErrorTypes.NotFound, message: "Bot not found"});
    }
    await knex<Bot>('bots').where('slug', req.params.slug).delete();
    return res.status(204).send();
}
