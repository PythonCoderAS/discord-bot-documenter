import {Request, Response} from "express";
import {Page} from "../../models/page.js";
import knex from "../../models/index.js";

export default async function getPages(req: Request<{bot_slug: string}>, res: Response<Page[]>) {
    const pages = await knex<Page>('pages').where('bot_slug', req.params.bot_slug).select();
    // @ts-ignore
    return res.json(pages);
}
