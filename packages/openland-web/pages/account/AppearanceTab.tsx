import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-web/utils/useClient';
import { useField } from 'openland-form/useField';
import { RadioButtonsSelect } from './components/RadioButtonsSelect';
import { XButton } from 'openland-x/XButton';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';

enum AppearanceOptions {
    DEFAULT = 'DEFAULT',
    HIGHLIGHTED = 'HIGHLIGHTED',
}

export const AppearanceTab = () => {
    const form = useForm();
    const client = useClient();
    let secretGroupDisplay = useField('input.secretGroupDisplay', AppearanceOptions.DEFAULT, form);

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            //
        });
    }, []);

    return (
        <FormWrapper title="Appearance">
            <FormSection title="Secret group display">
                <RadioButtonsSelect
                    {...secretGroupDisplay.input}
                    selectOptions={[
                        {
                            value: AppearanceOptions.DEFAULT,
                            label: `Default`,
                        },
                        {
                            value: AppearanceOptions.HIGHLIGHTED,
                            label: `Highlighted`,
                        },
                    ]}
                />
            </FormSection>
            <XButton text="Save changes" style="primary" size="large" onClick={doConfirm} />
        </FormWrapper>
    );
};
