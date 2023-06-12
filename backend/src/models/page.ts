import {ContentType} from "../shared-types.js";


interface BasePage {
    /**
     * Unique ID of the page
     */
    id: number;
    /**
     * The bot's slug, used in the subdomain.
     */
    bot_slug: string;
    /**
     * The page's slug, used in the URL.
     */
    slug: string;
    /**
     * The page's title.
     */
    title: string;
    /**
     * When the page was created
     */
    created_at: Date;
    /**
     * When the page was last updated
     */
    updated_at: Date;
}

export interface Page extends BasePage {
    /**
     * The page's content.
     */
    content: ContentType[];
}


export interface InsertPage extends BasePage {
    /**
     * Inserting an array requires stringification.
     */
    content: string;
}
