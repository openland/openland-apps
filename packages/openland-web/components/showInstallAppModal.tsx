import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { showModalBox } from 'openland-x/showModalBox';
import { TextBody, TextLabel1, TextTitle1 } from '../utils/TextStyles';
import { getAppLink, OS } from 'openland-x-utils/detectOS';
import { trackEvent } from 'openland-x-analytics';
import { XModalFooter } from './XModalFooter';
import { XModalContent } from './XModalContent';
import IcIos from 'openland-icons/ic-app-ios.svg';
import IcAndroid from 'openland-icons/ic-app-android.svg';

const contentClass = css`
    padding-top: 30px;
    padding-bottom: 30px;
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const titleClass = css`
    color: var(--foregroundPrimary);
    margin-bottom: 8px;
    flex-shrink: 0;
    text-align: center;
`;

const subtitleClass = css`
    color: var(--foregroundSecondary);
    margin-bottom: 48px;
    flex-shrink: 0;
    text-align: center;
`;

const appsContent = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const buttonsContent = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    & > div:first-child {
        margin-right: 10px;
    }
    & > div:last-child {
        margin-left: 10px;
    }
`;

const buttonContainer = css`
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: color 0.08s ease-in, all 0.15s ease;
    color: var(--foregroundContrast);
    background-color: var(--accentPrimary);
    border-radius: 8px;
    height: 40px;
    padding: 10px 24px;
    & > svg {
        margin-right: 12px;
        width: 24px;
        path {
            fill: var(--foregroundContrast);
        }
    }
    &:hover {
        background-color: var(--accentPrimaryHover);
    }
`;

const imgClass = css`
    margin-bottom: 32px;
    flex-shrink: 0;
    user-select: none;
    pointer-events: none;
`;

interface ButtonProps {
    title: string;
    icon: JSX.Element;
    onClick: () => void;
}

const Button = React.memo((props: ButtonProps) => {
    return (
        <div className={buttonContainer} onClick={props.onClick}>
            {props.icon}
            <div className={TextLabel1}>{props.title}</div>
        </div>
    );
});

const InstallAppModal = React.memo(() => {
    const onAppClick = React.useCallback((selectedOS: OS, path: string) => {
        const platform = ['iOS', 'Android'].includes(selectedOS) ? 'mobile' : 'desktop';

        trackEvent('app_download_action', {
            os: selectedOS.toLowerCase(),
            app_platform: platform,
        });
        window.open(path, '_blank');
    }, []);

    return (
        <XView backgroundColor="var(--backgroundPrimary)">
            <XModalContent>
                <div className={contentClass}>
                    <div className={cx(TextTitle1, titleClass)}>Install mobile app to access voice rooms</div>
                    <div className={cx(TextBody, subtitleClass)}>
                        You can join this room from Openland mobile app
                    </div>
                    <img
                        className={imgClass}
                        src="/static/nativeApps/ic-mobile.png"
                        srcSet="/static/nativeApps/ic-mobile@2x.png 2x"
                    />
                </div>
            </XModalContent>
            <XModalFooter>
                <div className={appsContent}>
                    <div className={buttonsContent}>
                        <Button
                            onClick={() => onAppClick('iOS', getAppLink('iOS'))}
                            icon={<IcIos />}
                            title="iOS"
                        />
                        <Button
                            onClick={() => onAppClick('iOS', getAppLink('Android'))}
                            icon={<IcAndroid />}
                            title="Android"
                        />
                    </div>
                </div>
            </XModalFooter>
        </XView>
    );
});

export const showInstallAppModal = () => {
    showModalBox({ width: 512 }, ctx => <InstallAppModal />);
};
