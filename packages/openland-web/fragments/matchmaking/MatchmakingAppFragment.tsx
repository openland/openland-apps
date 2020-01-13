import * as React from 'react';
import { css, cx } from 'linaria';
import { XImage, XView, XViewProps } from 'react-mental';
import { XViewRouterContext } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useClient } from 'openland-web/utils/useClient';
import { TextBody, TextTitle1, TextTitle3 } from 'openland-web/utils/TextStyles';
import { detectOS } from 'openland-x-utils/detectOS';

const MobileAppButton = (props: { image: string } & XViewProps) => {
    const { image, ...other } = props;

    return (
        <XView as="a" target="_blank" hoverOpacity={0.8} hoverTextDecoration="none" {...other}>
            <XImage width={124} height={40} src={props.image} />
        </XView>
    );
};

const mainContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
`;

const titleStyle = css`
    color: var(--foregroundPrimary);
    display: flex;
    justify-content: center;
`;

const subtitleStyle = css`
    color: var(--foregroundSecondary);
    display: flex;
    justify-content: center;
    margin-top: 8px;
    margin-bottom: 32px;
`;

const appIcon = css`
    width: 244px;
    height: 278px;
    object-fit: contain;
    align-self: center;
    margin-bottom: 32px;
`;

const appButtonContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
`;

const appButtonMobileContainer = css`
    margin-top: auto;
`;

const titleRenderStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
`;

const skipStyle = css`
    cursor: pointer;
    color: var(--foregroundSecondary);
`;

const TitleRender = (props: { onDone: () => void }) => {
    return (
        <div className={titleRenderStyle}>
            <div onClick={props.onDone} className={cx(TextTitle3, skipStyle)}>
                Skip
            </div>
        </div>
    );
};

export const MatchmakingAppFragment = React.memo(() => {
    const router = React.useContext(XViewRouterContext)!;
    const os = detectOS();
    const unicorn = useUnicorn();
    const chatId = unicorn.query.roomId;
    const client = useClient();
    const data = client.useMatchmakingRoom({ peerId: chatId }).matchmakingRoom;

    const haveMyData = data && data.myProfile;
    const haveOtherProfiles = data && data.profiles && data.profiles.length > 1;

    if (!haveMyData && !haveOtherProfiles) {
        return null;
    }

    const onDone = () => {
        router.navigate(`/mail/${chatId}`);
    };

    return (
        <Page flexGrow={1} track="matchmaking_app" padded={true}>
            <UHeader titleView={<TitleRender onDone={onDone} />} appearance="fullwidth" />
            <XView flexGrow={1}>
                <XView flexGrow={1}>
                    <div className={mainContainer}>
                        <div className={cx(TextTitle1, titleStyle)}>Chat with your matches</div>
                        <div className={cx(TextBody, subtitleStyle)}>
                            Install Openland to continue
                        </div>
                        <img
                            className={appIcon}
                            src="https://cdn.openland.com/shared/web/matchmaking/app@1x.png"
                            srcSet="https://cdn.openland.com/shared/web/matchmaking/app@2x.png 2x"
                        />
                        <div
                            className={cx(
                                appButtonContainer,
                                (os === 'iOS' || os === 'Android') && appButtonMobileContainer,
                            )}
                        >
                            {!(os === 'iOS' || os === 'Android') && (
                                <>
                                    <MobileAppButton
                                        href="https://oplnd.com/ios"
                                        image="/static/X/settings/appstore@2x.png"
                                        marginRight={12}
                                    />
                                    <MobileAppButton
                                        href="https://oplnd.com/android"
                                        image="/static/X/settings/googleplay@2x.png"
                                    />
                                </>
                            )}
                            {(os === 'iOS' || os === 'Android') && (
                                <UButton
                                    text="Install app"
                                    shape="square"
                                    href={
                                        os === 'iOS'
                                            ? 'https://oplnd.com/ios'
                                            : 'https://oplnd.com/android'
                                    }
                                />
                            )}
                        </div>
                    </div>
                </XView>
            </XView>
        </Page>
    );
});
