import getBot from "./get.js";
import getBots from "./getAll.js";
import {Router} from "express";
import Data from "../_interface.js";

const router = Router();
router.route('/:slug').get(getBot);
router.route('/').get(getBots);

const data: Data = {
    router,
    prefix: '/bot'
}

export default data;
