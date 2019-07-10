import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-web/utils/useClient';
import { useField } from 'openland-form/useField';
import { XView } from 'react-mental';
import { RadioButtonsSelect, RadioButtonsSelectOptions } from './components/RadioButtonsSelect';
import { XButton } from 'openland-x/XButton';

enum MessagesNotificationsOptions {
    DEFAULT = 'DEFAULT',
    HIGHLIGHTED = 'HIGHLIGHTED',
}

export const AppearanceTab = () => {
    const form = useForm();
    const client = useClient();
    let secretGroupDisplay = useField('input.secretGroupDisplay', '', form);

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            //
        });
    }, []);

    return (
        <XView>
            <RadioButtonsSelect
                title="Secret group display"
                {...secretGroupDisplay.input}
                selectOptions={[
                    {
                        value: MessagesNotificationsOptions.DEFAULT,
                        label: `Default`,
                    },
                    {
                        value: MessagesNotificationsOptions.HIGHLIGHTED,
                        label: `Highlighted`,
                    },
                ]}
            />
            <XButton text="Save changes" style="primary" size="large" onClick={doConfirm} />
        </XView>
    );
};
