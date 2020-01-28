import * as React from 'react';
import { SForm } from './SForm';
import { formatError } from 'openland-y-forms/errorHandling';
import { exportWrongFields } from './exportWrongFields';
import { AppLoader } from 'openland-y-runtime/AppLoader';

interface FormConfig {
    disableAppLoader?: boolean;
}

export function useForm(config?: FormConfig): SForm {
    const started = React.useRef(false);
    let clientValidation = {};
    const [loading, setLoading] = React.useState<boolean>(false);
    const [enabled, setEnabled] = React.useState<boolean>(true);
    const [triedToSubmit, setTriedToSubmit] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [errorFields, setErrorFields] = React.useState<{ key: string; messages: string[] }[]>([]);

    const isClientValidationFailed = () => {
        const values = Object.values(clientValidation);
        if (values.length) {
            return !!values.filter(value => !value).length;
        }
        return false;
    };

    const updateClientValidation = React.useCallback(
        ({ name, valid }: { name: string; valid: boolean }) => {
            if (clientValidation[name] !== valid) {
                clientValidation = {
                    ...clientValidation,
                    [name]: valid,
                };
            }
        },
        [clientValidation],
    );

    const doAction = React.useCallback(
        async (action: () => any) => {
            setTriedToSubmit(true);
            if (started.current) {
                return;
            }
            started.current = true;
            if (!config || config.disableAppLoader !== true) {
                AppLoader.start();
            }
            setLoading(true);
            setEnabled(false);
            setError(null);
            setErrorFields([]);

            try {
                if (!isClientValidationFailed()) {
                    await action();
                }
            } catch (e) {
                console.warn(e);
                let message = formatError(e);
                let fields = exportWrongFields(e);
                setErrorFields(fields);
                setError(message);
            } finally {
                clientValidation = {};
                if (!config || config.disableAppLoader !== true) {
                    AppLoader.stop();
                }
                setLoading(false);
                setEnabled(true);
                started.current = false;
            }
        },
        [clientValidation],
    );

    return {
        loading,
        enabled,
        error,
        doAction,
        errorFields,
        triedToSubmit,
        updateClientValidation,
    };
}
