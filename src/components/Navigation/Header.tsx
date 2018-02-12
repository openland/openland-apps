import * as React from 'react';
import { XLink } from '../X/XLink';
import { AuthenticationControlls } from './Login';
import { Navigation } from './Navigation';
import { XFixedWidthContainer } from '../X/Scaffold/XFixedWidthContainer';
import Glamorous from 'glamorous';
import { XDesktopContainer } from '../X/XDesktopContainer';
import { XMobileContainer } from '../X/XMobileContainer';
import XStyled from '../X/XStyled';

let HeaderHeroDiv = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 2,
    color: '#ffffff',
    alignSelf: 'stretch',
    height: 54
});

let HeaderDiv = Glamorous(HeaderHeroDiv)({
    backgroundColor: '#182642',
});

let HeaderContentDiv = Glamorous(XFixedWidthContainer)({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16
})

let Logo = Glamorous.img<{ large?: boolean }>((props) => ({
    width: props.large ? '100px' : '24px',
    marginRight: 6
}));

let HeaderLogo = XStyled(XLink)({
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    alignItems: 'center',

    color: '#ffffff!important',

    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 700,

    width: 140,
    marginLeft: 0,
    marginRight: 16,

    // [Layout.XLG]: {
    //     width: 304,
    // },

    // .display (block);
    // .font (14px, 20px, 700);
    // .size (205px);

    // @media @media-xs-only {
    //     float: left;

    //     .size (auto);
    // }

    // @media @media-sm-only {
    //     .size (160px);
    // }
});

let DesktopLayout = Glamorous(XDesktopContainer)({
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    flexGrow: 1
})

let MobileLayout = Glamorous(XMobileContainer)({
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    flexGrow: 1
})

let NavigationDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexShrink: 0,
    flexGrow: 1,
    '> .item': {
        display: 'flex',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: 500,
        opacity: 0.6,
        marginLeft: 8,
        marginRight: 8,
        alignItems: 'center',
        '&:hover': {
            opacity: 1.0
        }
    },
    '> .is-active': {
        opacity: 1.0
    }
});

let NavigationDivVert = Glamorous.div({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexShrink: 0,
    flexGrow: 1,
    backgroundColor: '#182642',
    '> .item': {
        display: 'flex',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: 500,
        height: 54,
        opacity: 0.6,
        marginLeft: 8,
        marginRight: 8,
        alignItems: 'center',
        '&:hover': {
            opacity: 1.0
        }
    },
    '> .is-active': {
        opacity: 1.0
    },
    right: 0,
    top: 54
});

let AuthenticationDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
});

let MenuContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    flexGrow: 1,
})

let ToggleButton = Glamorous.a<{ isOpen: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    marginRight: -16,
    color: '#ffffff!important',
    '&:before': {
        content: props.isOpen ? '"\ue916"' : '"\ue91c"',
        fontFamily: '\'icomoon\'!important',
        speak: 'none',
        fontStyle: 'normal',
        fontWeight: 'normal',
    }
}));

class HeaderMenu extends React.Component<{}, { isShown: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = { isShown: false };
    }

    handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        this.setState({ isShown: !this.state.isShown });
    };

    render() {
        return (
            <MenuContainer>
                <ToggleButton isOpen={this.state.isShown} href="#" onClick={this.handleToggle} />
                {this.state.isShown && (
                    <NavigationDivVert>
                        {this.props.children}
                    </NavigationDivVert>
                )}
            </MenuContainer>
        )
    }
}
export class Header extends React.Component<{ hero?: boolean }, { isShown: boolean }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    render() {
        let Wrapper = this.props.hero ? HeaderHeroDiv : HeaderDiv;
        let RenderedLogo = this.props.hero
            ? (<Logo large={true} src={'/static/img/logotype.svg'} />)
            : (<><Logo src={'/static/img/x-header--label.svg'} />San Francisco</>)
        return (
            // <div className={'x-header' + (this.props.hero ? '' : ' is-top') + (this.state.isShown ? ' is-shown' : '')}>
            <Wrapper>
                <HeaderContentDiv>

                    {/* <div className="x-header--wrap"> */}
                    {/* {this.props.hero && (
                        <XLink
                            className="x-header--logo"
                            href="https://statecrafthq.com/"
                        >
                            <img src="/static/img/logotype.svg" alt="" />
                        </XLink>
                    )} */}

                    {/* {!this.props.hero && (
                        
                    )} */}

                    <MobileLayout>
                        <HeaderLogo path="/sf">{RenderedLogo}</HeaderLogo>
                        <HeaderMenu>
                            <Navigation />
                            {/* <AuthenticationControlls /> */}
                            {/* <AuthenticationDiv>
                                <AuthenticationControlls />
                            </AuthenticationDiv> */}
                        </HeaderMenu>
                    </MobileLayout>
                    <DesktopLayout>
                        <HeaderLogo path="/sf">{RenderedLogo}</HeaderLogo>
                        <NavigationDiv>
                            <Navigation />
                        </NavigationDiv>
                        <AuthenticationDiv>
                            <AuthenticationControlls />
                        </AuthenticationDiv>
                    </DesktopLayout>
                </HeaderContentDiv>

                {/* <div className="x-header--menu">
                    <div className="x-header--nav">
                        <Navigation />
                    </div>

                    <div className="x-header--auth">
                        <AuthenticationControlls />
                    </div>
                </div> */}
            </Wrapper>
        );
    }
}