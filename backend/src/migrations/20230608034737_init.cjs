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
        table.integer('page_id').nullable().defaultTo(null)
        table.boolean('slash_commands').notNullable();
        table.json('prefix').nullable();
        table.integer('permissions').notNullable();
        table.timestamps(true, true);
    }).createTable('pages', table => {
        // models/page.ts
        table.increments('id').primary();
        table.string('bot_slug').nullable().defaultTo(null).references('slug').inTable('bots').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('slug').notNullable();
        table.string('title').notNullable();
        table.json('content').notNullable();
        table.timestamps(true, true);
        table.unique(['bot_slug', 'slug']);
        table.index('title');
    }).alterTable('bots', table => {
        table.foreign('page_id').references('id').inTable('pages').onDelete('CASCADE').onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bots').dropTable('pages');
};
