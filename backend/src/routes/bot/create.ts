import {z} from "zod";
import {Request, Response} from "express";
import {Bot, InsertBot} from "../../models/bot.js";
import {InsertPage} from "../../models/page.js";
import knex from "../../models/index.js";
import {ErrorType, ErrorTypes} from "../_interface.js";

const schema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1).max(64),
    short_description: z.string().min(1).max(512),
    description: z.string().min(1).optional(),
    slash_commands: z.boolean(),
    prefix: z.array(z.string().min(1).max(64)).optional(),
    permissions: z.number().int().positive(),
});

type CreateBotBody = z.infer<typeof schema>;
interface RequestParams {
    slug: string;
}
type ResponseBody = Bot|ErrorType<CreateBotBody>;
export default async function createBot(req: Request<RequestParams, ResponseBody, CreateBotBody>, res: Response<ResponseBody>) {
    const errors = schema.safeParse(req.body);
    if (!errors.success){
        return res.status(400).json({type: ErrorTypes.Validation, errors: errors.error.flatten()});
    }
    const bot = await knex<Bot>('bots').where('slug', req.params.slug).or.where("id", req.body.id).first();
    if (bot !== undefined){
        return res.status(409).json({type: ErrorTypes.Conflict, message: "Bot already exists"});
    }
    if (!req.body.slash_commands && (req.body.prefix || []).length === 0){
        return res.status(400).json({message: "Prefix must be specified if slash commands are disabled."});
    }
    const description = req.body.description;
    if (description !== undefined && description.length > 0){
        delete req.body.description;
    }
    let page_id: number | null = null;
    let newBot: InsertBot | null = null;
    await knex.transaction(async trx => {
        newBot = (await trx<InsertBot>('bots').insert({
            ...req.body,
            prefix: req.body.prefix ? JSON.stringify(req.body.prefix) : null,
            slug: req.params.slug,
        }).returning('*'))[0];
        if (description){
            const dbPage = await trx<InsertPage>('pages').insert({
                slug: "home",
                bot_slug: req.params.slug,
                title: req.body.name,
                content: JSON.stringify([{type: "text", content: description}]),
            }).returning('*');
            await trx<Bot>('bots').where('slug', req.params.slug).update({page_id: dbPage[0].id});
            page_id = dbPage[0].id;
        }
    })
    return res.status(201).json({
        ...req.body,
        page_id,
        slug: req.params.slug,
        prefix: req.body.prefix || null,
        created_at: newBot!.created_at,
        updated_at: newBot!.updated_at,
    });
}
