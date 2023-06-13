import {z} from 'zod';

export type ContentType = {
    type: 'text';
    content: string;
} | {
    type: 'snippet';
    slug: string;
};

export const zodContentType = z.discriminatedUnion("type", [
    z.object({
        type: z.literal('text'),
        content: z.string(),
    }),
    z.object({
        type: z.literal('snippet'),
        slug: z.string(),
    }),
]).array().nonempty();
