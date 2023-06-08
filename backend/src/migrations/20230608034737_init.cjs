/**
 * @param { import("knex").Knex } knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('bots', table => {
        // models/bot.ts
        table.string('slug').primary();
        table.integer('id').notNullable().unique();
        table.string('name').notNullable();
        table.string('short_description').notNullable();
        table.string('description').notNullable();
        table.boolean('slash_commands').notNullable();
        table.json('prefix').nullable();
        table.integer('permissions').notNullable();
        table.integer('created').notNullable();
        table.integer('updated').notNullable();
    }).createTable('pages', table => {
        // models/page.ts
        table.integer('bot_id').notNullable();
        table.string('slug').notNullable();
        table.string('title').notNullable();
        table.json('content').notNullable();
        table.integer('created').notNullable();
        table.integer('updated').notNullable();
        table.primary(['bot_id', 'slug']);
        table.index('title');
    });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bots').dropTable('pages');
};
