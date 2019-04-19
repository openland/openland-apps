import * as React from 'react';
import { SForm } from './SForm';
import { formatError } from 'openland-y-forms/errorHandling';

export function useForm(): SForm {
    const started = React.useRef(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [enabled, setEnabled] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    const doAction = React.useCallback((action: () => any) => {
        if (started.current) {
            return;
        }
        started.current = true;
        setLoading(true);
        setEnabled(false);
        setError(null);
        (async () => {
            try {
                await action();
            } catch (e) {
                console.warn(e);
                let message = formatError(e);
                setError(message);
            } finally {
                setLoading(false);
                setEnabled(true);
                started.current = false;
            }
        })();
    }, [])

    return { loading, enabled, error, doAction };
}