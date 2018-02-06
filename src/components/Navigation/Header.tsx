import * as React from 'react';
import { XLink } from '../X/XLink';
import { AuthenticationControlls } from './Login';
import { Navigation } from './Navigation';
import { XFixedWidthContainer } from '../X/Scaffold/XFixedWidthContainer';
import Glamorous from 'glamorous';
import { XDesktopContainer } from '../X/XDesktopContainer';

let HeaderHeroDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 2,
    color: '#ffffff',
    alignSelf: 'stretch'
});

let HeaderDiv = Glamorous(HeaderHeroDiv)({
    backgroundColor: '#182642',
    height: 64
});

let HeaderContentDiv = Glamorous(XFixedWidthContainer)({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16
})

let Logo = Glamorous.img({
    width: '24px',
    marginRight: 6
})

let HeaderLogo = Glamorous(XLink)({
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    alignItems: 'center',

    color: '#ffffff!important',

    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 700,

    width: 314,
    marginRight: 16

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
    alignItems: 'stretch'
})

let NavigationDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row'
});

export class Header extends React.Component<{ hero?: boolean }, { isShown: boolean }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    render() {
        let Wrapper = this.props.hero ? HeaderHeroDiv : HeaderDiv;
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

                    {/* <a className="x-header--open visible-xs" href="#" onClick={(e) => {
                            e.preventDefault();
                            this.setState({ isShown: !this.state.isShown });
                        }}>{}</a> */}

                    <DesktopLayout>
                        <HeaderLogo path="/sf"><Logo src="/static/img/x-header--label.svg" />San Francisco</HeaderLogo>
                        <NavigationDiv>
                            <Navigation />
                        </NavigationDiv>
                        <AuthenticationControlls />
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