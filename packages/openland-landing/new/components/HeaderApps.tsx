import * as React from 'react';
import { css, cx } from 'linaria';
import { LandingLinks } from './_links';

const popup = css`
    display: flex;

    position: absolute;
    flex-direction: column;
    width: 160px;

    top: 56px;

    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    padding: 8px 0;
    z-index: 5;
    background: white;

    &:before {
        position: absolute;
        top: -50px;
        display: block;
        content: '';
        width: 100%;
        height: 50px;
    }
`;

const popupItem = css`
    line-height: 40px;
    padding: 0 20px;

    display: flex;
    align-items: center;

    color: #272750;
    font-weight: normal;

    &,
    &:hover,
    &:focus,
    &:active {
        text-decoration: none;
        color: #272750;
    }

    &:hover {
        background-color: #f7fafc;
    }
`;

const popupIcon = css`
    margin-right: 20px;
`;

const popupText = css`
    font-size: 16px;
    line-height: 40px;
    font-weight: 600;
`;

interface HeaderAppsItemProps {
    link: string;
    icon: string;
    label: string;
}

const HeaderAppsItem = React.memo((props: HeaderAppsItemProps) => (
    <a
        className={popupItem}
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
    >
        <img
            className={popupIcon}
            src={props.icon}
            width="24"
            height="24"
        />
        <span className={popupText}>
            {props.label}
        </span>
    </a>
));

interface HeaderAppsProps {
    className: string;
}

export const HeaderApps = React.memo((props: HeaderAppsProps) => {
    const [isShown, setShown] = React.useState<boolean>(false);

    return (
        <span className={props.className} onMouseLeave={() => setShown(false)}>
            <span
                onClick={() => setShown(true)}
                onMouseOver={() => setShown(true)}
            >
                Desktop app
            </span>

            {isShown && (
                <div
                    className={cx(popup, 'landingHeaderPopup')}
                    onMouseLeave={() => setShown(false)}
                >
                    <HeaderAppsItem
                        link={LandingLinks.apps.macos}
                        icon="/static/landing/icons/mac.svg"
                        label="Mac"
                    />
                    <HeaderAppsItem
                        link={LandingLinks.apps.windows}
                        icon="/static/landing/icons/win.svg"
                        label="Windows"
                    />
                    <HeaderAppsItem
                        link={LandingLinks.apps.linux}
                        icon="/static/landing/icons/linux.svg"
                        label="Linux"
                    />
                </div>
            )}
        </span>
    );
});