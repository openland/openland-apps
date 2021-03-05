import * as React from 'react';
import { css } from 'linaria';
import { getAppLink } from 'openland-x-utils/detectOS';

const popup = css`
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 160px;
    left: 50%;
    top: 56px;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    padding: 8px 0;
    z-index: 5;
    background: var(--backgroundSecondary);
    transform: translate(-50%, 0);
`;

const popupItem = css`
    line-height: 40px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    color: var(--foregroundPrimary);
    font-weight: normal;

    &,
    &:hover,
    &:focus,
    &:active {
        text-decoration: none;
        color: var(--foregroundPrimary);
    }

    &:hover {
        background-color: var(--backgroundTertiary);
    }
`;

const popupIcon = css`
    margin-right: 16px;
`;

const popupText = css`
    font-size: 16px;
    line-height: 40px;
    font-weight: 600;
    opacity: 0.6;
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
        <span
            className={props.className}
            onMouseLeave={() => setShown(false)}
            onClick={() => setShown(true)}
            onMouseOver={() => setShown(true)}
        >
            <span>
                Desktop app
            </span>

            {isShown && (
                <div
                    className={popup}
                    onMouseLeave={() => setShown(false)}
                >
                    <HeaderAppsItem
                        link={getAppLink('Mac')}
                        icon="/static/landing/icons/mac.svg"
                        label="Mac"
                    />
                    <HeaderAppsItem
                        link={getAppLink('Windows')}
                        icon="/static/landing/icons/win.svg"
                        label="Windows"
                    />
                    <HeaderAppsItem
                        link={getAppLink('Linux')}
                        icon="/static/landing/icons/linux.svg"
                        label="Linux"
                    />
                </div>
            )}
        </span>
    );
});
