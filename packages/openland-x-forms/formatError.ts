import { trackError } from 'openland-x-analytics';

export function formatError(error: any): string {
    if (error.networkError) {
        if (Math.ceil(error.networkError.statusCode / 100) === 5) {
            // Track network errors
            trackError(error);
            return 'Unable to connect to the server. Please, try again. If the problem persists, please contact support@openland.com.';
        }
    } else if (error.graphQLErrors.length > 0) {
        // Return first message
        return error.graphQLErrors[0].message;
    }

    // Track unexpected errors
    trackError(error);
    return 'An unexpected error occurred. Please, try again. If the problem persists, please contact support@openland.com.';
}