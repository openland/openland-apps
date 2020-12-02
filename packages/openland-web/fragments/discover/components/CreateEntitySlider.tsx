import React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { USlider } from 'openland-web/components/unicorn/USlider';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { showCreatingGroupFragment, showCreatingOrgFragment } from 'openland-web/fragments/create/CreateEntityFragment';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';

const container = css`
    width: 100%;
    height: 180px;
    max-width: 560px;
    min-width: 288px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    padding: 24px;
    border-radius: 8px;
    background-color: var(--bg-color);

    &:hover {
        cursor: pointer;
    }
`;

const containerSmall = css`
    padding: 24px 16px;
`;

const imgStyle = css`
    flex-shrink: 0;
    margin-left: 32px;
    width: 132px;
    height: 132px;
`;

const imgStyleSmall = css`
    width: 96px;
    height: 96px;
    margin-top: 36px;
    margin-left: 16px;
`;

const CreateEntityItem = React.memo(
    (props: {
        title: string,
        description: string,
        imgSrc: string,
        imgSrcSet: string,
        bgColor: string,
        buttonText: string,
        windowWidth: number | null,
        onClick: () => void
    }) => {
        const width = props.windowWidth || Infinity;
        let size: 'large' | 'medium' | 'small' = 'large';
        if (width <= 368) {
            size = 'small';
        } else if (width <= 472) {
            size = 'medium';
        }
        const btnWidth = {
            large: 164,
            medium: 140,
            small: 140,
        };
        return (
            <div className={cx(container, size === 'small' && containerSmall)} style={{ '--bg-color': props.bgColor } as React.CSSProperties} onClick={props.onClick}>
                <XView flexDirection="column" flexShrink={1}>
                    <XView {...TextStyles.Title2} marginBottom={8} color="#171A1F">
                        {props.title}
                    </XView>
                    <XView {...TextStyles.Body} marginBottom={size === 'large' ? 32 : 16} color="var(--foregroundSecondary)">
                        {props.description}
                    </XView>
                    <UButton
                        text={props.buttonText}
                        size={size === 'large' ? 'large' : 'medium'}
                        width={btnWidth[size]}
                    />
                </XView>
                <ImgWithRetry
                    className={cx(imgStyle, size === 'small' && imgStyleSmall)}
                    src={props.imgSrc}
                    srcSet={props.imgSrcSet}
                />
            </div>
        );
    },
);

const noBreakSpace = '\u00A0';

export const CreateEntitySlider = React.memo(() => {
    const onChatClick = React.useCallback(() => {
        showCreatingGroupFragment({ entityType: 'group' });
    }, []);
    const onChanelClick = React.useCallback(() => {
        showCreatingGroupFragment({ entityType: 'channel' });
    }, []);
    const onCommunityClick = React.useCallback(() => {
        showCreatingOrgFragment({ entityType: 'community' });
    }, []);
    const [width] = useWithWidth();

    return (
        <USlider title="Create" childrenCount={3}>
            <CreateEntityItem
                title="Chat"
                description={`Public, secret, or${noBreakSpace}paid group chat`}
                bgColor="#F8F2E1"
                imgSrc="//cdn.openland.com/shared/art/art-create-chat.png"
                imgSrcSet="//cdn.openland.com/shared/art/art-create-chat@2x.png 2x, //cdn.openland.com/shared/art/art-create-chat@3x.png 3x"
                buttonText="New chat"
                windowWidth={width}
                onClick={onChatClick}
            />
            <CreateEntityItem
                title="Channel"
                description={`Only admins write, others${noBreakSpace}comment`}
                bgColor="#E1EEF8"
                imgSrc="//cdn.openland.com/shared/art/art-create-channel.png"
                imgSrcSet="//cdn.openland.com/shared/art/art-create-channel@2x.png 2x, //cdn.openland.com/shared/art/art-create-channel@3x.png 3x"
                buttonText="New channel"
                windowWidth={width}
                onClick={onChanelClick}
            />
            <CreateEntityItem
                title="Community"
                description={`A hub for your chats and${noBreakSpace}channels`}
                bgColor="#F4ECF5"
                imgSrc="//cdn.openland.com/shared/art/art-create-community.png"
                imgSrcSet="//cdn.openland.com/shared/art/art-create-community@2x.png 2x, //cdn.openland.com/shared/art/art-create-community@3x.png 3x"
                buttonText="New community"
                windowWidth={width}
                onClick={onCommunityClick}
            />
        </USlider>
    );
});
