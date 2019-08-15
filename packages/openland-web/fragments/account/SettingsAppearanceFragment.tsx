import * as React from 'react';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { RadioButtonsSelect } from './components/RadioButtonsSelect';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';

enum AppearanceOptions {
    DEFAULT = 'DEFAULT',
    HIGHLIGHTED = 'HIGHLIGHTED',
}

export const SettingsAppearanceFragment = React.memo(() => {
    const form = useForm();
    const secretGroupDisplay = useField(
        'input.secretGroupDisplay',
        localStorage.getItem('highlight_secret_chat') === 'true'
            ? AppearanceOptions.HIGHLIGHTED
            : AppearanceOptions.DEFAULT,
        form,
    );

    React.useEffect(() => {
        localStorage.setItem(
            'highlight_secret_chat',
            secretGroupDisplay.value === AppearanceOptions.HIGHLIGHTED ? 'true' : 'false',
        );
    });

    return (
        <Page>
            <UHeader title="Appearance" />
            <FormWrapper title="Appearance">
                <FormSection title="Secret group display">
                    <XView marginHorizontal={-16}>
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
                    </XView>
                </FormSection>
            </FormWrapper>
        </Page>
    );
});
