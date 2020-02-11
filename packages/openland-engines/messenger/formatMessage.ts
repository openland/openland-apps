export function formatMessage(message: { message: string | null, fallback: string } | null): string {
    if (!message) {
        return '';
    }

    return (message.message && message.message.length > 0) ? message.message : message.fallback;
}