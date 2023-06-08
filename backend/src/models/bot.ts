export interface Bot {
    /**
     * The bot's slug, used in the subdomain.
     */
    slug: string;
    /**
     * The bot's numeric user ID on Discord.
     */
    id: number;
    /**
     * The bot's username.
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
     * The bot's prefix(es).
     */
    prefix?: string[];
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
