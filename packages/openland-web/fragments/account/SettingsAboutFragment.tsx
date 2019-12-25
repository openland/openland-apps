import * as React from 'react';
import { XView } from 'react-mental';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { FormWrapper } from './components/FormWrapper';
import { css } from 'linaria';
import Logo from 'openland-unicorn/components/Logo';
import { TextTitle3, TextBody } from 'openland-web/utils/TextStyles';

import MacIcon from 'openland-icons/ic-app-mac.svg';

const hero = css`
    background-color: #F2F3F5;
    background-image: linear-gradient(180deg, rgba(242, 243, 245, 0.56) 0%, #F2F3F5 100%);
    border-radius: 8px;
    padding: 16px;
`;

const logo = css`
    width: 72px;
    height: 72px;
`;

const menuItem = css`
    padding: 12px 16px;
    margin: 0 -16px;
    display: flex;
    align-items: center;
    border-radius: 8px;

    cursor: pointer;

    &:hover,
    &:focus {
        background-color: var(--backgroundTertiary);
    }
`;

interface MenuItemProps {
    path: string;
    icon: React.ReactNode;
    children: string;
}

const MenuItem = React.memo((props: MenuItemProps) => (
    <XView path={props.path}>
        <div className={menuItem}>
            <XView marginRight={16}>
                {props.icon}
            </XView >
            <span className={TextBody}>
                {props.children}
            </span>
        </div>
    </XView >
));

export const SettingsAboutFragment = React.memo(() => {
    return (
        <Page track="account_about_us">
            <UHeader title="About us" />
            <FormWrapper>
                <div className={hero}>
                    <XView flexDirection="row">
                        <Logo className={logo} />
                        <XView marginLeft={16} flexDirection="column" justifyContent="center">
                            <h2 className={TextTitle3}>Openland</h2>
                            <XView marginTop={4} color="var(--foregroundSecondary)">
                                <p className={TextBody}>
                                    {/* TODO display real version on electron and "Find and build inspiring communities" on web */}
                                    Version 1.2.3.4
                                </p>
                            </XView>
                        </XView>
                    </XView>
                </div>
                <XView marginTop={24}>
                    <MenuItem icon={<MacIcon />} path="/about">About Openland</MenuItem>
                    <MenuItem icon={<MacIcon />} path="/terms">Terms of service</MenuItem>
                    <MenuItem icon={<MacIcon />} path="/privacy">Privacy policy</MenuItem>
                </XView>
            </FormWrapper>
        </Page>
    );
});
