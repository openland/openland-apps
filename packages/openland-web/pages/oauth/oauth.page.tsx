import * as React from 'react';
import { css, cx } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { withApp } from 'openland-web/components/withApp';
import { useXRouter } from 'openland-x-routing/useXRouter';
// import { UserInfoContext } from 'openland-web/components/UserInfo';
import { UButton } from 'openland-web/components/unicorn/UButton';
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
    width: 166px;
    margin-top: 28px;
`;

const OauthFragment = React.memo(() => {
    const client = useClient();
    const router = useXRouter()!;
    // const userInfo = React.useContext(UserInfoContext)!;

    const code = router.routeQuery.code;
    const oauthContext = client.useOauthContext({ code: code }).context;

    if (!oauthContext) {
        return null;
    }

    return (
        <div className={containerStyle}>
            <LogoBig className={logoStyle} />
            <div className={contentStyle}>
                <div className={cx(TextTitle1, titleStyle)}>
                    Sign in to {oauthContext.app.title} with Openland account
                </div>
                <div className={cx(TextBody, textStyle)}>
                    {oauthContext.app.title} will get an access to your general information and
                    email address
                </div>
                <div className={buttonsContainer}>
                    <UButton
                        text="Allow"
                        square={true}
                        size="large"
                        marginBottom={16}
                        as="a"
                        hoverTextDecoration="none"
                        href={`${oauthContext.redirectUrl}/?code=${oauthContext.code}&state=${oauthContext.state}`}
                    />
                    <UButton
                        text="Decline"
                        square={true}
                        style="secondary"
                        size="large"
                        as="a"
                        hoverTextDecoration="none"
                        href={`${oauthContext.redirectUrl}/?error=access_denied`}
                    />
                </div>
            </div>
        </div>
    );
});

export default withApp('Oauth', 'viewer', props => {
    return <OauthFragment />;
});
