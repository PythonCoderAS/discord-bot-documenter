/**
 * Root to help inheritance issues
 */
interface BotBase {
    /**
     * The bot's slug, used in the subdomain.
     */
    slug: string;
    /**
     * The bot's numeric user ID on Discord.
     */
    id: number;
    /**
     * The bot's name.
     */
    name: string;
    /**
     * A short description of the bot. Markdown is supported.
     */
    short_description: string;
    /**
     * A longer description of the bot. Markdown is supported.
     */
    description: string;
    /**
     * If the bot uses slash commands or not.
     */
    slash_commands: boolean;
    /**
     * The bot's default permissions to use in the invite URL.
     */
    permissions: number;
    /**
     * When the bot's record was created on the website.
     */
    created: number;
    /**
     * When the bot's record was last updated on the website.
     */
    updated: number;
}

export interface Bot extends BotBase {
    /**
     * The bot's prefix(es).
     */
    prefix: string[] | null;
}

/**
 * The bot representation in the database.
 */
export interface DBBot extends BotBase {
    /**
     * Arrays are stored as strings in the database.
     */
    prefix: string | null;
}
