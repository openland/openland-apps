import React from 'react';
import { XView, XViewRouterContext } from 'react-mental';
import { css } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextTitle3, TextBody } from 'openland-web/utils/TextStyles';

const container = css`
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: linear-gradient(180deg, rgba(201, 204, 209, 0.14) 0%, rgba(201, 204, 209, 0) 100%);
`;

export const DiscoverFooter = React.memo(() => {
    return (
        <div className={container}>
            <XView marginTop={8}>
                <h2 className={TextTitle3}>Find more chats</h2>
            </XView>
            <XView marginTop={4} color="var(--foregroundSecondary)">
                <p className={TextBody}>Get recommendations for your interests</p>
            </XView>
            <XView marginTop={16}>
                <UButton style="secondary" text="Discover chats" />
            </XView>
        </div>
    );
});
