import getBot from "./get.js";
import getBots from "./getAll.js";
import createBot from "./create.js";
import {json, Router} from "express";
import {Data} from "../_interface.js";
import editBot from "./edit.js";
import deleteBot from "./delete.js";

const router = Router();
router.route('/:slug').get(getBot).post([json(), createBot]).patch([json(), editBot]).delete(deleteBot)
router.route('/').get(getBots)

const data: Data = {
    router,
    prefix: '/bot'
}

export default data;
