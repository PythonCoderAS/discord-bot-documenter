import getPage from "./get.js";
import getPages from "./getAll.js";
import createPage from "./create.js";
import {json, Request, Router} from "express";
import {Data} from "../_interface.js";
import editPage from "./edit.js";
import deletePage from "./delete.js";

export interface PageRequestParams {
    bot_slug: string;
    slug: string;
}

const router = Router();
router.route('/:bot_slug/:slug').get(getPage).post([json(), createPage]).patch([json(), editPage]).delete(deletePage)
router.route('/:bot_slug/:slug/*').all((req: Request, res, next) => {
    req.params.slug = req.params.slug + "/" + req.params[0];
    next();
}).get(getPage).post([json(), createPage]).patch([json(), editPage]).delete(deletePage)
router.route('/:bot_slug').get(getPages);

const data: Data = {
    router,
    prefix: '/page'
}

export default data;
