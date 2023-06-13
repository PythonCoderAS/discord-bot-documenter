import {Request, Response} from "express";
import {Page} from "../../models/page.js";
import knex from "../../models/index.js";
import {ErrorTypes, SimpleErrorType} from "../_interface.js";
import {PageRequestParams} from "./index.js";

export default async function deletePage(req: Request<PageRequestParams>, res: Response<SimpleErrorType>) {
    if (req.params.slug === "home"){
        return res.status(403).json({type: ErrorTypes.Forbidden, message: "Cannot delete home page, please delete the bot entirely."});
    } else if (req.params.slug.startsWith("commands/")){
        return res.status(403).json({type: ErrorTypes.Forbidden, message: "Cannot delete commands page, please delete the command itself."});
    }
    const page = await knex<Page>('pages').where('slug', req.params.slug).and.where('bot_slug', req.params.bot_slug).first();
    if (page === undefined){
        return res.status(404).json({type: ErrorTypes.NotFound, message: "Page not found"});
    }
    await knex<Page>('pages').where('slug', req.params.slug).and.where('bot_slug', req.params.bot_slug).delete();
    return res.status(204).send();
}
