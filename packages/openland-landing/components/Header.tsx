import * as React from 'react';
import { Container } from './Container';
import { XView, XImage } from 'react-mental';
import BurgerIcon from 'openland-icons/landing/burger.svg';
import { XButton } from 'openland-x/XButton';
import { HeaderNavigationItem } from './header/HeaderNavigationItem';
import { HeaderApp } from './header/HeaderApp';
import { HeaderStyles } from './header/styles';
import { MobileMenu } from './MobileMenu';
import { LandingLinks } from './_links';
import { XMemo } from 'openland-y-utils/XMemo';
import { detectOS } from 'openland-web/components/NativeAppsModal';

export const Header = XMemo(() => {
    const [ showMenu, setShowMenu ] = React.useState(false);
    const os = detectOS();

    return (
        <>
            <header className={HeaderStyles.root}>
                <Container>
                    <XView position="relative" flexDirection="row">
                        <a href={LandingLinks.home} className={HeaderStyles.logo}>
                            <XImage
                                src="/static/landing/logotype.svg"
                                width={145}
                                height={42}
                            />
                        </a>
                        <a className={HeaderStyles.opener} onClick={() => setShowMenu(true)}>
                            <BurgerIcon />
                        </a>
                        <nav className={HeaderStyles.navigation}>
                            <HeaderNavigationItem
                                path={LandingLinks.home}
                                content="Messenger"
                            />
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
                            <XButton
                                path={LandingLinks.signin}
                                text="Sign in"
                                style="electric"
                                size="large"
                            />
                        </div>
                    </XView>
                </Container>
            </header>
            <MobileMenu show={showMenu} onClose={() => setShowMenu(false)} />
        </>
    );
});