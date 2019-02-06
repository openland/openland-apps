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

interface HeaderProps {}

interface HeaderState {
    showMenu: boolean;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.state = {
            showMenu: false,
        };
    }

    handleOpenClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        this.setState({
            showMenu: true,
        });
    };

    handleCloseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        this.setState({
            showMenu: false,
        });
    };

    render() {
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
                            <a className={HeaderStyles.opener} onClick={this.handleOpenClick}>
                                <BurgerIcon />
                            </a>
                            <nav className={HeaderStyles.navigation}>
                                <HeaderNavigationItem
                                    path={LandingLinks.home}
                                    content="Messenger"
                                />
                                <HeaderNavigationItem path={LandingLinks.about} content="About" />
                            </nav>
                            <div className={HeaderStyles.apps}>
                                <HeaderApp system="android" />
                                <HeaderApp system="ios" />
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
                <MobileMenu show={this.state.showMenu} onClose={this.handleCloseClick} />
            </>
        );
    }
}
