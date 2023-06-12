import {ContentType} from "../shared-types.js";

interface BaseCommand {
    id: number;
    name: string;
    bot_slug: string;
    page_id: number;
    slash_command: boolean;
    // Unique: [name, bot_slug, slash_command]
    /**
     * When the command was created
     */
    created_at: Date;
    /**
     * When the command was last updated
     */
    updated_at: Date;
}

export interface Argument {
    name: string;
    optional: boolean;
    default?: string;
    description: ContentType[];
}

export interface Command extends BaseCommand {
    arguments: Argument[];
    aliases: string[];
}

export interface InsertCommand extends BaseCommand {
    arguments: string;
    aliases: string;
}
