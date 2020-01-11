export interface CrashReporter {
    notify: (error: Error) => void;
    setUserId: (userId: string) => void;
}

class CrashReportingImpl {

    private reporter: CrashReporter | null = null;
    private userId: string | null = null;

    setUserId = (id: string) => {
        this.userId = id;
        this.reporter?.setUserId(id);
    }

    setReporter = (reporter: CrashReporter) => {
        this.reporter = reporter;
        if (this.userId) {
            reporter.setUserId(this.userId);
        }
    }

    notify = (error: Error) => {
        this.reporter?.notify(error);
    }
}

export const CrashReporting = new CrashReportingImpl();