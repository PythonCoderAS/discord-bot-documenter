export type ContentType = {
    type: 'text';
    content: string;
} | {
    type: 'snippet';
    slug: string;
};
