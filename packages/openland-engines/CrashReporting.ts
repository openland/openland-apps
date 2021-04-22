export interface CrashReporter {
    notify: (error: Error) => void;
    setUserId: (userId: string) => void;
}

class CrashReportingImpl {

    private reporter: CrashReporter | null = null;
    private userId: string | null = null;

    setUserId = (id: string) => {
        this.userId = id;
        if (this.reporter) {
            this.reporter.setUserId(id);
        }
    }

    setReporter = (reporter: CrashReporter) => {
        this.reporter = reporter;
        if (this.userId) {
            reporter.setUserId(this.userId);
        }
    }

    notify = (error: Error | { name: string, data: Object }) => {
        if (this.reporter) {
            let payload: { name: string, message: string };
            if (error instanceof Error) {
                payload = error;
            } else {
                payload = { name: error.name, message: JSON.stringify(error.data) };
            }
            this.reporter.notify(payload);
        }
    }
}

export const CrashReporting = new CrashReportingImpl();