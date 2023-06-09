import {DateTime} from "luxon";
export function getCurrentTimeUTC(): number {
    return DateTime.utc().toSeconds();
}
