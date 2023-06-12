export interface Snippet {
    id: number;
    name: string;
    bot_slug: string
    content: string;
    /**
     * When the snippet was created
     */
    created_at: Date;
    /**
     * When the snippet was last updated
     */
    updated_at: Date;
}
