import * as React from 'react';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { FormWrapper } from './components/FormWrapper';
import { TextBody } from 'openland-web/utils/TextStyles';
import { css, cx } from 'linaria';

const textWrapper = css`
    color: var(--foregroundPrimary);
    margin-top: 16px;

    &:first-child {
        margin-top: 4px;
    }
`;

export const SettingsLicensesFragment = React.memo(() => {
    return (
        <Page track="account_licenses" scroll="disable">
            <UHeader title="Licenses" />
            <FormWrapper>
                <p className={cx(textWrapper, TextBody)}>Product illustrations by <ULink href="https://icons8.com/">Icons 8</ULink></p>
                <p className={cx(textWrapper, TextBody)}>Editors’ choice and collections covers by&nbsp;<ULink href="https://freepik.com/stories">stories</ULink>
                {' '}and&nbsp;<ULink href="https://freepik.com/pikisuperstar">pikisuperstar</ULink></p>
            </FormWrapper>
        </Page>
    );
});
