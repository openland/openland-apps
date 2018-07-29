// import { trackError } from 'openland-x-analytics';

export function formatError(error: any): string {
    if (error.networkError) {
        if (Math.ceil(error.networkError.statusCode / 100) === 5) {
            // Track network errors
            // trackError(error);
            return 'Unable to connect to the server. Please, try again. If the problem persists, please contact support@openland.com.';
        }
    } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        // Return first message
        return error.graphQLErrors[0].message;
    }

    // Track unexpected errors
    // trackError(error);
    return 'An unexpected error occurred. Please, try again. If the problem persists, please contact support@openland.com.';
}

export function exportWrongFields(error: any) {
    let invalidFields: { key: string, messages: string[] }[] = [];
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        for (let e of error.graphQLErrors) {
            if (e.invalidFields && e.invalidFields.length > 0) {
                for (let f of e.invalidFields) {
                    let ex = invalidFields.find((v) => v.key === f.key);
                    if (ex) {
                        ex.messages = [...ex.messages, f.message];
                    } else {
                        invalidFields.push({ key: f.key, messages: [f.message] });
                    }
                }
            }
        }
    }
    return invalidFields;
}