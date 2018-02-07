import * as React from 'react';
import Glamorous from 'glamorous';
import { XRow } from './XGrid';
import { Layout } from './_Layout';
import { XVertical } from './XVertical';
import { withRouter, RouterState } from '../../utils/withRouter';
import { XLink } from './XLink';
import { XDesktopContainer } from './XDesktopContainer';
import { XMobileContainer } from './XMobileContainer';
import XStyled from './XStyled';

let FixedContainer = Glamorous.div({
    zIndex: 100,
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
});

let OverlayContent = Glamorous(FixedContainer)({
    backgroundColor: '#F5F6F8',
})

let OverlayButton = Glamorous(FixedContainer)({
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    bottom: 30,
    pointerEvents: 'none'
});

let ScrollableContent = Glamorous(XVertical)({
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: 'auto'
})

let MainButton = XStyled(XLink)({
    display: 'flex',

    color: '#ffffff!important',
    fontSize: '11px',
    lineHeight: '20px',
    fontWeight: 500,

    textTransform: 'uppercase',
    textDecoration: 'none',
    textAlign: 'center',

    padding: '10px 22px',
    borderRadius: '40px',

    background: '#6B50FF',

    boxShadow: '0 1px 6px rgba(0,0,0,.06),0 2px 32px rgba(0,0,0,.16)!important',

    pointerEvents: 'auto'
});

let CloseButton = XStyled(XLink)({
    textDecoration: 'none',
    // color: @text-sf
    zIndex: 10,
    padding: '23px 25px',
    position: 'absolute',
    top: 0,
    right: 0,

    'i': {
        fontSize: '16px'
    }
})

let MobileContainer = Glamorous(XMobileContainer)({
    flexDirection: 'column',
    alignItems: 'stretch',
})

let DesktopContainer = Glamorous(XDesktopContainer)({
    flexDirection: 'column',
    alignItems: 'stretch',
    flexBasis: '25%',
    marginRight: 16,
})

let SaveButton = XStyled(XLink)({
    textAlign: 'center',
    border: 'none',
    backgroundColor: '#6B50FF',
    // background: @purple-1;
    color: '#ffffff!important',
    padding: '18px 20px',
    textDecoration: 'none',
    borderRadius: '4px',

    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 500,

    margin: 16
    // .display(inline - block);
    // .font(15px, 20px, 500);

    // .display (block);
    // .position (absolute, 0, 0);

    // i {
    //     .display (block);
    //     .font (16px);
    // }
})

let ContentDiv = Glamorous(XVertical)({
    flexBasis: '75%',
    flexGrow: 1,
    marginLeft: 16,
    [Layout.SMMinus]: {
        flexBasis: '100%',
        marginLeft: 0
    }
});

let RootDiv = Glamorous(XRow)({
    // '> .menu': {
    //     display: 'flex',
    //     flexBasis: '25%',
    //     flexGrow: 1,
    //     [Layout.SMMinus]: {
    //         flexGrow: 0,
    //         flexBasis: 0,
    //     },
    //     '> .body': {
    //         zIndex: 100,
    //         display: 'flex',
    //         marginRight: 16,
    //         [Layout.SMMinus]: {
    //             position: 'fixed',
    //         },
    //     },
    // },
    // '> .menu-open': {
    //     [Layout.SMMinus]: {
    //         display: 'fixed',
    //     }
    // }
});

class XLayoutColumnWithMenuMenuBase extends React.Component<{ buttonTitle: string, actionTitle?: string, router: RouterState }> {
    constructor(props: { buttonTitle: string, router: RouterState }) {
        super(props);
    }

    render() {
        let menuVisible = this.props.router.query && this.props.router.query.menu === 'true';
        return (
            <>
            <MobileContainer>
                {!menuVisible && (
                    <OverlayButton>
                        <MainButton query={{ field: 'menu', value: 'true' }}>{this.props.buttonTitle}</MainButton>
                    </OverlayButton>
                )}
                {menuVisible && (
                    <OverlayContent>
                        <CloseButton query={{ field: 'menu' }}><i className="icon-close" /></CloseButton>
                        <ScrollableContent>
                            {this.props.children}
                        </ScrollableContent>
                        <SaveButton query={{ field: 'menu' }}>{this.props.actionTitle ? this.props.actionTitle : this.props.buttonTitle}</SaveButton>
                    </OverlayContent>
                )}
            </MobileContainer>
            <DesktopContainer>
                <XVertical>
                    {this.props.children}
                </XVertical>
            </DesktopContainer>
            </>
        )
    }
}

export let XLayoutColumnWithMenuMenu = withRouter<{ buttonTitle: string, actionTitle?: string }>(XLayoutColumnWithMenuMenuBase);

export class XLayoutColumnWithMenuContent extends React.Component {
    render() {
        return (
            <ContentDiv>
                {this.props.children}
            </ContentDiv>
        )
    }
}

export class XLayoutColumnWithMenu extends React.Component {
    static Content = XLayoutColumnWithMenuContent;
    static Menu = XLayoutColumnWithMenuMenu;

    render() {

        return (
            <RootDiv>
                {this.props.children}
            </RootDiv>
        )
    }
}