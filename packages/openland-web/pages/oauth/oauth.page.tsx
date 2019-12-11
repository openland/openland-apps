import * as React from 'react';
import { css, cx } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { withApp } from 'openland-web/components/withApp';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import LogoBig from 'openland-icons/logo-big.svg';

const containerStyle = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    align-items: center;
`;

const contentStyle = css`
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 70px 16px 40px;
`;

const avatarsContainer = css`
    margin-bottom: 26px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

const buttonsContainer = css`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-self: center;
`;

const titleStyle = css`
    text-align: center;
    margin-bottom: 8px;
    max-width: 350px;
`;

const textStyle = css`
    text-align: center;
    margin-bottom: 32px;
    max-width: 350px;
    color: var(--foregroundSecondary);
`;

const logoStyle = css`
    width: 145px;
    margin-top: 16px;
`;

const OauthFragment = React.memo(() => {
    const client = useClient();
    const router = useXRouter()!;
    const userInfo = React.useContext(UserInfoContext)!.user!;

    const routerCode = router.routeQuery.code;
    const oauthContext = client.useOauthContext({ code: routerCode }).context!;

    if (!oauthContext && !userInfo) {
        return null;
    }
    const { redirectUrl, code, state, app } = oauthContext;
    const allowRedirect = `${redirectUrl}?code=${code}&state=${state}`;
    const declineRedirect = `${redirectUrl}?error=access_denied`;
    return (
        <div className={containerStyle}>
            <LogoBig className={logoStyle} />
            <div className={contentStyle}>
                <div className={avatarsContainer}>
                    <UAvatar
                        title={userInfo.name}
                        id={userInfo.id}
                        photo={userInfo.photo}
                        size="x-large"
                        zIndex={1}
                        borderWidth={4}
                        borderRadius="100%"
                        borderColor="#fff"
                    />
                    <UAvatar
                        title={app.title}
                        id={app.id}
                        uuid={!!app.image ? app.image.uuid : undefined}
                        size="x-large"
                        marginLeft={-15}
                        borderWidth={4}
                        borderRadius="100%"
                        borderColor="#fff"
                    />
                </div>
                <div className={cx(TextTitle1, titleStyle)}>
                    Sign in to {app.title} with Openland account
                </div>
                <div className={cx(TextBody, textStyle)}>
                    {app.title} will get an access to your general information and email address
                </div>
                <div className={buttonsContainer}>
                    <UButton
                        text="Allow"
                        square={true}
                        size="large"
                        marginBottom={16}
                        as="a"
                        hoverTextDecoration="none"
                        width={160}
                        href={allowRedirect}
                    />
                    <UButton
                        text="Decline"
                        square={true}
                        style="secondary"
                        size="large"
                        as="a"
                        hoverTextDecoration="none"
                        width={160}
                        href={declineRedirect}
                    />
                </div>
            </div>
        </div>
    );
});

export default withApp('Oauth', 'viewer', () => {
    return <OauthFragment />;
});
