import {Request, Response} from "express";
import {Bot, DBBot} from "../../models/bot.js";
import knex from "../../models/index.js";

export default async function getBots(req: Request, res: Response<Bot[]>) {
    const bots = await knex<DBBot>('bots').select();
    return res.json(bots.map(bot => {
        return {
            ...bot,
            // Database stores JSON as string, so we need to parse it back.
            prefix: bot.prefix ? JSON.parse(bot.prefix as unknown as string) : null,
            // Convert integer to boolean
            slash_commands: !!bot.slash_commands
        }
    }));
}
