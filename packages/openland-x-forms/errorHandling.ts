import { trackError } from 'openland-x-analytics';
import { ApiError } from 'openland-graphql/GraphqlClient';

export function formatError(error: any): string {
    if (error instanceof ApiError) {
        return error.message;
    }
    // Track unexpected errors
    trackError(error);
    return 'An unexpected error occurred. Please, try again. If the problem persists, please contact support@openland.com.';
}

export function exportWrongFields(error: any) {
    let invalidFields: { key: string, messages: string[] }[] = [];
    if (error instanceof ApiError) {
        for (let f of error.invalidFields) {
            let ex = invalidFields.find((v) => v.key === f.key);
            if (ex) {
                ex.messages = [...ex.messages, ...f.messages];
            } else {
                invalidFields.push({ key: f.key, messages: [...f.messages] });
            }
        }
    }
    return invalidFields;
}