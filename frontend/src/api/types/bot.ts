export interface RequestBot {
    slug:              string;
    id:                number;
    name:              string;
    short_description: string;
    page_id:           number;
    prefix?:            string[];
    permissions:       number;
    created_at:        string;
    updated_at:        string;
}

export default interface Bot {
    slug:              string;
    id:                number;
    name:              string;
    short_description: string;
    page_id:           number;
    prefix?:            string[];
    permissions:       number;
    created_at:        Date;
    updated_at:        Date;
}
