import React from 'react';
import { css, cx } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TextTitle3, TextBody } from 'openland-web/utils/TextStyles';
import { TabRouterContext } from 'openland-unicorn/components/TabLayout';
import IcDiscover from 'openland-icons/s/ic-discover-36.svg';

const container = css`
    padding: 35px 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: linear-gradient(180deg, rgba(201, 204, 209, 0.14) 0%, rgba(201, 204, 209, 0) 100%);
`;

const titleStyle = css`
    margin-bottom: 8px;
    margin-top: 8px;
    color: var(--foregroundPrimary);
`;

const subtitleStyle = css`
    margin-bottom: 4px;
    color: var(--foregroundSecondary);
`;

export const DiscoverFooter = React.memo(() => {
    const tabRouter = React.useContext(TabRouterContext);

    return (
        <div className={container}>
            <UIcon icon={<IcDiscover />} />
            <div className={cx(titleStyle, TextTitle3)}>Find more chats</div>
            <p className={cx(subtitleStyle, TextBody)}>Get recommendations for your interests</p>
            <UButton
                marginTop={16}
                style="secondary"
                text="Discover chats"
                onClick={() => {
                    if (tabRouter) {
                        tabRouter.setTab(0);
                        setTimeout(() => {
                            tabRouter.router.navigate('/discover/recommendations');
                        }, 20);
                    }
                }}
            />
        </div>
    );
});
