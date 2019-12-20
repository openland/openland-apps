import * as React from 'react';
import { css } from 'linaria';
import { Container } from './Container';
import { XView, XImage } from 'react-mental';
import BurgerIcon from 'openland-icons/landing/burger.svg';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { HeaderNavigationItem } from './header/HeaderNavigationItem';
import { HeaderApp } from './header/HeaderApp';
import { HeaderStyles } from './header/styles';
import { MobileMenu } from './MobileMenu';
import { LandingLinks } from './_links';
import { XMemo } from 'openland-y-utils/XMemo';
import { detectOS } from 'openland-x-utils/detectOS';

const buttonStyle = css`
    border: 1px solid #1790ff;
    background-color: #ffffff;
    color: rgba(23, 144, 255, 0.9);

    &:focus,
    &:hover {
        background-color: rgba(23, 144, 255, 0.08);
        color: rgba(23, 144, 255, 0.9);
    }
`;

export const Header = XMemo(() => {
    const [showMenu, setShowMenu] = React.useState(false);
    const os = detectOS();

    return (
        <>
            <header className={HeaderStyles.root}>
                <Container>
                    <XView position="relative" flexDirection="row">
                        <a href={LandingLinks.home} className={HeaderStyles.logo}>
                            <XImage src="/static/landing/logotype.svg" width={145} height={42} />
                        </a>
                        <a className={HeaderStyles.opener} onClick={() => setShowMenu(true)}>
                            <BurgerIcon />
                        </a>
                        <nav className={HeaderStyles.navigation}>
                            <HeaderNavigationItem path={LandingLinks.home} content="Messenger" />
                            <HeaderNavigationItem path={LandingLinks.download} content="Download" />
                            <HeaderNavigationItem path={LandingLinks.about} content="About" />
                        </nav>
                        <div className={HeaderStyles.apps}>
                            <HeaderApp system="ios" />
                            <HeaderApp system="android" />
                            {os === 'Mac' && <HeaderApp system="macos" />}
                            {os === 'Windows' && <HeaderApp system="windows" />}
                            {os === 'Linux' && <HeaderApp system="linux" />}
                        </div>
                        <div className={HeaderStyles.btn}>
                            <UButton
                                path={LandingLinks.signin}
                                text="Sign in"
                                size="large"
                                className={buttonStyle}
                            />
                        </div>
                    </XView>
                </Container>
            </header>
            <MobileMenu show={showMenu} onClose={() => setShowMenu(false)} />
        </>
    );
});
