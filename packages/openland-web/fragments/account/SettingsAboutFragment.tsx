import * as React from 'react';
import { XView } from 'react-mental';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { FormWrapper } from './components/FormWrapper';
import { css } from 'linaria';
import Logo from 'openland-unicorn/components/Logo';
import { TextTitle3, TextBody } from 'openland-web/utils/TextStyles';
import Info from 'openland-icons/ic-info-24.svg';
import Terms from 'openland-icons/ic-terms-24.svg';
import Privacy from 'openland-icons/ic-lock-24.svg';
import Copyright from 'openland-icons/ic-copyright-24.svg';
import { VERSION } from 'openland-web/version';
import { ULink } from 'openland-web/components/unicorn/ULink';

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
    color: inherit;

    &:hover,
    &:focus {
        background-color: var(--backgroundTertiary);
        text-decoration: none;
        color: inherit;
    }

    & path {
        fill: var(--foregroundSecondary);
    }
`;

interface MenuItemProps {
    path: string;
    icon: React.ReactNode;
    children: string;
    inStack?: boolean;
}

const MenuItem = React.memo((props: MenuItemProps) => {
    const content = (
        <>
            <XView marginRight={16}>
                {props.icon}
            </XView >
            <span className={TextBody}>
                {props.children}
            </span>
        </>
    );
    return props.inStack ? (
        <ULink path={props.path} className={menuItem}>{content}</ULink>
    ) : (
        <a className={menuItem} href={props.path} target="_blank" rel="noopener noreferrer">
            {content}
        </a>
    );
});

export const SettingsAboutFragment = React.memo(() => {
    // replace with electron build number when available
    // const text = isElectron ? '1.2.3.4' : 'Find and build inspiring communities';
    const text = VERSION;

    return (
        <Page track="account_about_us">
            <UHeader title="About us" maxWidth={550} />
            <FormWrapper>
                <div className={hero}>
                    <XView flexDirection="row">
                        <Logo className={logo} />
                        <XView marginLeft={16} flexDirection="column" justifyContent="center">
                            <h2 className={TextTitle3}>Openland</h2>
                            <XView marginTop={4} color="var(--foregroundSecondary)">
                                <p className={TextBody}>
                                    {text}
                                </p>
                            </XView>
                        </XView>
                    </XView>
                </div>
                <XView marginTop={24}>
                    <MenuItem icon={<Info />} path="/about">About Openland</MenuItem>
                    <MenuItem icon={<Terms />} path="/terms">Terms of service</MenuItem>
                    <MenuItem icon={<Privacy />} path="/privacy">Privacy policy</MenuItem>
                    <MenuItem icon={<Copyright />} path="/account/licenses" inStack={true}>Licenses</MenuItem>
                </XView>
            </FormWrapper>
        </Page>
    );
});
