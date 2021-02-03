import * as React from 'react';
import { XView } from 'react-mental';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { FormWrapper } from './components/FormWrapper';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { advanceGeneration } from 'openland-web/storage/generation';

export const SettingsCacheFragment = React.memo(() => {
    return (
        <Page track="settings_cache">
            <UHeader title="Cache" />
            <FormWrapper>
                <XView marginTop={24}>
                    <UButton
                        text="Drop Cache and Restart"
                        onClick={() => {
                            advanceGeneration();
                            window.location.href = '/';
                        }}
                    />
                </XView>
            </FormWrapper>
        </Page>
    );
});
