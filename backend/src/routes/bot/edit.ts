import {z} from "zod";
import {Request, Response} from "express";
import {Bot, DBBot} from "../../models/bot.js";
import knex from "../../models/index.js";
import {ErrorType, ErrorTypes} from "../_interface.js";
import {getCurrentTimeUTC} from "../_common.js";

const schema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string().min(1).max(64).optional(),
    short_description: z.string().min(1).max(512).optional(),
    description: z.string().min(1),
    slash_commands: z.boolean().optional(),
    prefix: z.array(z.string().min(1).max(64)).optional(),
    permissions: z.number().int().positive().optional(),
});

type EditBotBody = z.infer<typeof schema>;
export default async function editBot(req: Request<{slug: string}, any, EditBotBody>, res: Response<Bot|ErrorType<EditBotBody>>) {
    const errors = schema.safeParse(req.body);
    if (!errors.success){
        return res.status(400).json({type: ErrorTypes.Validation, errors: errors.error.flatten()});
    }
    const bot = await knex<DBBot>('bots').where('slug', req.params.slug).first();
    if (bot === undefined){
        return res.status(404).json({type: ErrorTypes.NotFound, message: "Bot not found"});
    }
    const updatedBot: Bot = {...bot, prefix: (typeof bot.prefix === "string" ? JSON.parse(bot.prefix) : bot.prefix), ...req.body};
    if (updatedBot.id !== bot.id && req.body.id !== undefined){
        const bot2 = await knex<DBBot>('bots').where('id', req.body.id).first();
        if (bot2 !== undefined && bot2.slug !== bot.slug){
            return res.status(409).json({type: ErrorTypes.Conflict, message: "ID already belongs to a different bot"});
        }
    }
    if (!updatedBot.slash_commands && (updatedBot.prefix || []).length === 0){
        return res.status(400).json({message: "Prefix must be specified if slash commands are disabled."});
    }
    const curtime = getCurrentTimeUTC();
    await knex<DBBot>('bots').where('slug', req.params.slug).update({
        ...req.body,
        prefix: req.body.prefix ? JSON.stringify(req.body.prefix) : null,
        slash_commands: !!req.body.slash_commands,
        updated: curtime
    });
    return res.json(updatedBot);
}
