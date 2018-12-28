import { css } from 'linaria';

let headerRootClass = css`
    padding: 22px 0;
    z-index: 2;
    position: relative;

    @media (max-width: 767px) {
        padding: 19px 0;
    }
`;

let headerLogoClass = css`
    margin: -3px 0 0;
    display: block;

    @media (max-width: 767px) {
        margin: 0;
        flex-grow: 1;
    }
`;

let headerMenuOpenerClass = css`
    text-decoration: none;
    padding: 17px 0 0;
    width: 52px;
    height: 42px;
    display: flex;
    justify-content: center;

    @media (min-width: 768px) {
        display: none;
    }

    svg * {
        fill: #1790ff;
    }
`;

let headerNavigationClass = css`
    flex-grow: 1;
    padding: 0 0 0 70px;
    display: flex;

    @media (max-width: 767px) {
        display: none;
    }
`;

let headerAppsClass = css`
    padding: 0 13px 0 0;
    display: flex;

    @media (max-width: 767px) {
        display: none;
    }
`;

let headerBtnClass = css`
    margin: 0 0 0 12px;

    @media (max-width: 767px) {
        display: none;
    }
`;

export const HeaderStyles = {
    root: headerRootClass,
    logo: headerLogoClass,
    opener: headerMenuOpenerClass,
    navigation: headerNavigationClass,
    apps: headerAppsClass,
    btn: headerBtnClass,
};
