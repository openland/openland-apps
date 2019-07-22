import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';

const logoStyle = css`
    width: 145px;
    height: 42px;
    background-image: url('/static/logo.svg');
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 15px;
    left: 23px;
`;

const footerTextStyle = css`
    letter-spacing: -0.4px;
    font-weight: 500;
    text-align: center;
`;

const footerLinkStyle = css`
    display: inline-block;
    text-decoration: underline;  
`;

export function MessagePage(props: { children?: any; hideLegalText?: boolean }) {
    return (
        <XView
            backgroundColor="#fff"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            width="100vw"
            minHeight="100vh"
            paddingVertical={30}
        >
            <div className={logoStyle} />
            <XView flexGrow={1} flexDirection="column" alignItems="center" justifyContent="center">
                {props.children}
            </XView>
            <XView marginTop={30} fontSize={14} lineHeight={1.71} color="#334562" opacity={0.4}>
                {props.hideLegalText === true ? null : (
                    <XView marginBottom={6}>
                        <div className={footerTextStyle}>
                            By creating an account you are accepting our{' '}
                            <a className={footerLinkStyle} href="https://openland.com/terms" target="_blank">Terms of Service</a>{' '}
                            and{' '}
                            <a className={footerLinkStyle} href="https://openland.com/privacy" target="_blank">Privacy Policy</a>.
                        </div>
                    </XView>
                )}
                <div className={footerTextStyle}>© {new Date().getFullYear()} Openland</div>
            </XView>
        </XView>
    );
}
