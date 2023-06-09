import {Router} from "express";
import {typeToFlattenedError, ZodFormattedError} from "zod";

export interface Data {
    router: Router;
    prefix: string;
}

export enum ErrorTypes {
    Validation = "validation",
    NotFound = "not_found",
    Forbidden = "forbidden",
    Conflict = "conflict",
}
export interface SimpleErrorType {
    type?: ErrorTypes;
    message: string;
}

export type ErrorType<T> = {
    type: ErrorTypes.Validation;
    errors: ZodFormattedError<T> | typeToFlattenedError<T>;
} | SimpleErrorType
