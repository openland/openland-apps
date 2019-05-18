import * as React from 'react';
import { SForm } from './SForm';
import { formatError } from 'openland-y-forms/errorHandling';
import { exportWrongFields } from './exportWrongFields';

export function useForm(): SForm {
    const started = React.useRef(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [enabled, setEnabled] = React.useState<boolean>(true);
    const [triedToSubmit, setTriedToSubmit] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [errorFields, setErrorFields] = React.useState<{ key: string; messages: string[] }[]>([]);

    const doAction = React.useCallback(async (action: () => any) => {
        setTriedToSubmit(true);
        if (started.current) {
            return;
        }
        started.current = true;
        setLoading(true);
        setEnabled(false);
        setError(null);
        setErrorFields([]);

        try {
            await action();
        } catch (e) {
            console.warn(e);
            let message = formatError(e);
            let fields = exportWrongFields(e);
            setErrorFields(fields);
            setError(message);
        } finally {
            setLoading(false);
            setEnabled(true);
            started.current = false;
        }
    }, []);

    return { loading, enabled, error, doAction, errorFields, triedToSubmit };
}
