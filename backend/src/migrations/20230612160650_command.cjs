/**
 * @param { import("knex").Knex } knex
 */
exports.up = function(knex) {
    return knex.schema.alterTable('bots', table => {
        table.dropColumn('slash_commands');
    }).createTable('commands', table => {
        table.increments('id').primary();
        table.string('bot_slug').notNullable().references('slug').inTable('bots').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('name').notNullable();
        table.integer("page_id").notNullable().references('id').inTable('pages').onDelete('CASCADE').onUpdate('CASCADE');
        table.boolean("slash_command").notNullable().defaultTo(true);
        table.json('arguments').notNullable().defaultTo('[]');
        table.json('aliases').notNullable().defaultTo('[]');
        table.timestamps(true, true);
        table.unique(['bot_slug', 'name', "slash_command"]);
    }).createTable('snippets', table => {
        table.increments('id').primary();
        table.string('bot_slug').notNullable().references('slug').inTable('bots').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('name').notNullable();
        table.string('content').notNullable();
        table.timestamps(true, true);
        table.unique(['bot_slug', 'name']);
    })
  
};
/**
 * @param { import("knex").Knex } knex
 */
exports.down = function(knex) {
    return knex.schema.alterTable('bots', table => {
        table.boolean('slash_commands').notNullable();
    }).dropTable('commands').dropTable('snippets');
};
