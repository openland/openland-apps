import { ApiError } from 'openland-graphql/GraphqlClient';

// import { trackError } from 'openland-x-analytics';

export class SilentError extends Error {
    constructor() {
        super();
    }
}

export function formatError(error: any): string {
    if (error instanceof ApiError) {
        return error.message;
    } else if (error.networkError) {
        if (Math.ceil(error.networkError.statusCode / 100) === 5) {
            // Track network errors
            // trackError(error);
            return 'Unable to connect to the server. Please, try again. If the problem persists, please contact support@openland.com.';
        }
    } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        // Return first message
        return error.graphQLErrors[0].message;
    } else if (error.userMessage) {
        // Return first message
        return error.userMessage;
    } else if (typeof error === 'string' && error.startsWith('GraphQL error:')) {
        return error.replace('GraphQL error: ', '');
    } else if (error instanceof SilentError) {
        return '';
    }

    // Track unexpected errors
    // trackError(error);
    return 'An unexpected error occurred. Please, try again. If the problem persists, please contact support@openland.com.';
}

export function exportWrongFields(error: any) {
    console.warn(error);
    console.warn(error.invalidFields);
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
    if (error.invalidFields && error.invalidFields.length > 0) {
        for (let i of error.invalidFields) {
            let ex = invalidFields.find((v) => v.key === i.key);
            if (ex) {
                ex.messages = [...ex.messages, ...i.messages];
            } else {
                invalidFields.push({ key: i.key, messages: i.messages });
            }
        }
    }
    console.warn(invalidFields);
    return invalidFields;
}

export class UserError extends Error {
    userMessage: string;
    constructor(message: string) {
        super(message);
        this.userMessage = message;
    }
}

export class NamedError extends Error {
    name: string;

    constructor(name: string) {
        super(name);
        this.name = name;
    }
}