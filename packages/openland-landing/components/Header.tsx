import * as React from 'react';
import { Container } from './Container';
import { XView, XImage } from 'react-mental';
import BurgerIcon from 'openland-icons/landing/burger.svg';
import { XButton } from 'openland-x/XButton';
import { HeaderNavigationItem } from './header/HeaderNavigationItem';
import { HeaderApp } from './header/HeaderApp';
import { HeaderStyles } from './header/styles';

export const Header = () => (
    <header className={HeaderStyles.root}>
        <Container>
            <XView position="relative" flexDirection="row">
                <a href="/landing" className={HeaderStyles.logo}>
                    <XImage src="/static/landing/logotype.svg" width={145} height={42} />
                </a>
                <a href="#" className={HeaderStyles.opener}>
                    <BurgerIcon />
                </a>
                <nav className={HeaderStyles.navigation}>
                    <HeaderNavigationItem path="/landing" content="Messenger" />
                    <HeaderNavigationItem path="/landing/about" content="About" />
                </nav>
                <div className={HeaderStyles.apps}>
                    <HeaderApp system="android" />
                    <HeaderApp system="ios" />
                </div>
                <div className={HeaderStyles.btn}>
                    <XButton path="/signin" text="Sign in" style="electric" size="large" />
                </div>
            </XView>
        </Container>
    </header>
);
