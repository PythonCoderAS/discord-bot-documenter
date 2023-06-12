import {Request, Response} from "express";
import {InsertPage, Page} from "../../models/page.js";
import knex from "../../models/index.js";
import {ErrorType, ErrorTypes} from "../_interface.js";
import {z} from "zod";
import {zodContentType} from "../../shared-types.js";
import {getCurrentTimeUTC} from "../_common.js";
import {PageRequestParams} from "./index.js";

const schema = z.object({
    title: z.string().min(1).max(64).optional(),
    content: zodContentType.optional()
})

type EditPageBody = z.infer<typeof schema>;
type ResponseBody = Page|ErrorType<EditPageBody>;

export default async function editPage(req: Request<PageRequestParams, ResponseBody, EditPageBody>, res: Response<ResponseBody>) {
    const errors = schema.safeParse(req.body);
    if (!errors.success){
        return res.status(400).json({type: ErrorTypes.Validation, errors: errors.error.flatten()});
    }
    const page = await knex<Page>('pages').where('slug', req.params.slug).and.where('bot_slug', req.params.bot_slug).first();
    if (page === undefined){
        return res.status(404).json({type: ErrorTypes.NotFound, message: "Page not found"});
    }
    const curtime = getCurrentTimeUTC();
    const newPage = (await knex<InsertPage>('pages').where('slug', req.params.slug).and.where('bot_slug', req.params.bot_slug).update({
        ...req.body,
        content: JSON.stringify(req.body.content),
        updated_at: curtime,
    }, '*'))[0] as unknown as Page;
    return res.json(newPage);
}
