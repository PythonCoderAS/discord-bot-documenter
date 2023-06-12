import {Request, Response} from "express";
import {Page} from "../../models/page.js";
import knex from "../../models/index.js";
import {ErrorTypes, SimpleErrorType} from "../_interface.js";
import {PageRequestParams} from "./index.js";

type ResponseBody = Page|SimpleErrorType;
export default async function getPage(req: Request<PageRequestParams, ResponseBody>, res: Response<ResponseBody>) {
    const page = await knex<Page>('pages').where('slug', req.params.slug).and.where('bot_slug', req.params.bot_slug).first();
    if (page === undefined){
        return res.status(404).json({type: ErrorTypes.NotFound, message: "Page not found"});
    }
    return res.json(page);
}
