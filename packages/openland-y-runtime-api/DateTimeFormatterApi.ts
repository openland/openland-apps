export type DateTimeFormatterApi = {
    formatDate: (date: number) => string;
    formatLastSeenShort: (lastSeen: string) => string;
    formatRelativeTimeShort: (date: string | number) => string;
    formatRelativeTime: (date: string | number) => string;
    formatDateTime: (date: number) => string;
    formatTime: (date: number) => string;
    formatBirthDay: (date: number | string) => string;
    getValidatedDate: (day: number, month: number, year: number) => Date;
    isValidDate: (date: Date) => boolean;
    formatLastSeen: (lastSeen: string) => string;
    extractDateTime: (unixTime: string) => {
        date: string;
        time: string;
        isToday: boolean;
    };
    formatDateAtTime: (date: number, monthFormat?: "full" | "short" | undefined) => string;
    getEmptyYear: () => number;
    formatAbsoluteDate: (date: number, withYear?: boolean | undefined) => string;
    formatDateFull: (date: number, withYear?: boolean) => string;
};
