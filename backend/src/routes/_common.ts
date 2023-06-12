import {DateTime} from "luxon";
export function getCurrentTimeUTC(): Date {
    return DateTime.utc().toJSDate();
}
