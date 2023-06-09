import {z} from "zod";
import {Request, Response} from "express";
import {Bot, DBBot} from "../../models/bot.js";
import knex from "../../models/index.js";
import {ErrorType, ErrorTypes} from "../_interface.js";
import {getCurrentTimeUTC} from "../_common.js";

const schema = z.object({
    slug: z.string().min(1).max(32),
    id: z.number().int().positive(),
    name: z.string().min(1).max(64),
    short_description: z.string().min(1).max(512),
    description: z.string().min(1),
    slash_commands: z.boolean(),
    prefix: z.array(z.string().min(1).max(64)).optional(),
    permissions: z.number().int().positive(),
});

type CreateBotBody = z.infer<typeof schema>;
export default async function createBot(req: Request<{}, any, CreateBotBody>, res: Response<Bot|ErrorType<CreateBotBody>>) {
    const errors = schema.safeParse(req.body);
    if (!errors.success){
        return res.status(400).json({type: ErrorTypes.Validation, errors: errors.error.flatten()});
    }
    const bot = await knex<DBBot>('bots').where('slug', req.body.slug).or.where("id", req.body.id).first();
    if (bot !== undefined){
        return res.status(409).json({type: ErrorTypes.Conflict, message: "Bot already exists"});
    }
    if (!req.body.slash_commands && (req.body.prefix || []).length === 0){
        return res.status(400).json({message: "Prefix must be specified if slash commands are disabled."});
    }
    const curtime = getCurrentTimeUTC();
    await knex<DBBot>('bots').insert({
        ...req.body,
        prefix: req.body.prefix ? JSON.stringify(req.body.prefix) : null,
        slash_commands: !!req.body.slash_commands,
        created: curtime,
        updated: curtime
    }).returning('*');
    return res.json({
        ...req.body,
        prefix: req.body.prefix || null,
        created: curtime,
        updated: curtime,
    });
}
