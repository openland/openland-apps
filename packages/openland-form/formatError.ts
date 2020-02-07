import { ApiError } from 'openland-api/ApiError';
import { trackError } from 'openland-x-analytics';

export function formatError(error: any): string {
    if (error instanceof ApiError) {
        return error.message;
    }
    trackError(error);
    return 'An unexpected error occurred. Please, try again. If the problem persists, please contact support@openland.com.';
}