export interface InvalidField {
    key: string;
    messages: string[];
}

export class ApiError extends Error {

    readonly invalidFields: InvalidField[];

    constructor(message: string, invalidFields: InvalidField[]) {
        super(message);
        this.invalidFields = invalidFields;
        (this as any).__proto__ = ApiError.prototype;
    }
}