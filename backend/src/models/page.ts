import {ContentType} from "../shared-types.js";



export interface Page {
    bot_id: number;
    slug: string;
    title: string;
    content: ContentType[];
    created: number;
    updated: number;
}
