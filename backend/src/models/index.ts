import knex from 'knex';
import config from "../../config.json" assert {type: "json"};

const db = knex.default(config.db);

export default db;
