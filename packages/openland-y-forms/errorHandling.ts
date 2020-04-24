import { ApiError } from 'openland-api/ApiError';
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