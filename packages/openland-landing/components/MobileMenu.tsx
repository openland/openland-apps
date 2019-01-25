import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { Container } from './Container';
import AndroidIcon from 'openland-icons/landing/android.svg';
import IosIcon from 'openland-icons/landing/ios.svg';
import { LandingLinks } from './_links';
import CloseIcon from 'openland-icons/landing/close.svg';

let menuRootClass = css`
    background: #1790ff;
    color: #ffffff;
    z-index: 100;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    @media (min-width: 768px) {
        display: none !important;
    }
`;

let menuInnerClass = css`
    padding: 6px 0 0;
    position: absolute;
    top: 16.5%;
    right: 0;
    left: 0;
`;

let menuAppClass = css`
    align-items: center;
    justify-content: center;
    text-decoration: none;
    display: flex;
    width: 51px;
    height: 40px;

    svg * {
        fill: #ffffff;
    }
`;

interface MobileMenuLinkProps {
    path: string;
    content: string;
}

const MobileMenuLink = (props: MobileMenuLinkProps) => (
    <XView
        as="a"
        path={props.path}
        linkSelectable={true}
        fontSize={21}
        lineHeight="45px"
        fontWeight="600"
        opacity={0.7}
        color="#fff"
        hoverColor="#fff"
        textDecoration="none"
        hoverOpacity={1}
        hoverTextDecoration="none"
        selectedOpacity={1}
    >
        {props.content}
    </XView>
);

interface MobileMenuProps {
    show: boolean;
    onClose: any;
}

export const MobileMenu = (props: MobileMenuProps) => {
    if (!props.show) {
        return null;
    }

    return (
        <div className={menuRootClass}>
            <XView
                position="absolute"
                paddingTop={17}
                top={19}
                right={15}
                width={52}
                height={42}
                cursor="pointer"
                onClick={props.onClose}
                alignItems="center"
            >
                <CloseIcon />
            </XView>
            <div className={menuInnerClass}>
                <Container>
                    <MobileMenuLink path={LandingLinks.home} content="Messenger" />
                    <MobileMenuLink path={LandingLinks.about} content="About" />
                    <br />
                    <MobileMenuLink path={LandingLinks.signin} content="Sign in" />
                </Container>
            </div>
            <XView position="absolute" bottom={14} left={10} flexDirection="row">
                <a href={LandingLinks.google} target="_blank" className={menuAppClass}>
                    <AndroidIcon />
                </a>
                <a href={LandingLinks.apple} target="_blank" className={menuAppClass}>
                    <IosIcon />
                </a>
            </XView>
        </div>
    );
};
