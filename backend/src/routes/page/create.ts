import {Request, Response} from "express";
import {InsertPage, Page} from "../../models/page.js";
import knex from "../../models/index.js";
import {ErrorType, ErrorTypes} from "../_interface.js";
import {z} from "zod";
import {zodContentType} from "../../shared-types.js";
import {PageRequestParams} from "./index.js";

const schema = z.object({
    title: z.string().min(1).max(64),
    content: zodContentType
})

type CreatePageBody = z.infer<typeof schema>;
type ResponseBody = Page|ErrorType<CreatePageBody>;

export default async function createPage(req: Request<PageRequestParams, ResponseBody, CreatePageBody>, res: Response<ResponseBody>) {
    const errors = schema.safeParse(req.body);
    if (!errors.success){
        return res.status(400).json({type: ErrorTypes.Validation, errors: errors.error.flatten()});
    }
    const page = await knex<Page>('pages').where('slug', req.params.slug).and.where('bot_slug', req.params.bot_slug).first();
    if (page !== undefined){
        return res.status(409).json({type: ErrorTypes.Conflict, message: "Page already exists"});
    }
    const newPage = (await knex<InsertPage>('pages').insert({
        ...req.body,
        bot_slug: req.params.bot_slug,
        slug: req.params.slug,
        content: JSON.stringify(req.body.content),
    }).returning('*'))[0];
    return res.status(201).json({
        ...newPage,
        bot_slug: req.params.bot_slug,
        content: req.body.content,
    });
}
