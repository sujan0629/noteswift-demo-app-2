import { Response } from "express";
export default class JsonResponse {
    private res;
    constructor(res: Response);
    success(result?: any, message?: string): void;
    serverError(message?: string, result?: any): void;
    notFound(message: string): void;
    notAuthorized(message?: string): void;
    clientError(message: string, result?: any): void;
}
