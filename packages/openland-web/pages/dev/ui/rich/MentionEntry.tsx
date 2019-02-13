import * as React from 'react';
import { XView } from 'react-mental';
import { XAvatar } from 'openland-x/XAvatar';
import { XMemo } from 'openland-y-utils/XMemo';

export const MentionEntry = XMemo((props: any) => {
    const {
        mention,
        theme,
        isFocused,
        searchValue, // eslint-disable-line no-unused-vars
        ...parentProps
    } = props;

    return (
        <XView
            {...parentProps}
            position="relative"
            width="100%"
            flexDirection="row"
            flexGrow={1}
            flexShrink={1}
            paddingTop={6}
            paddingBottom={6}
            paddingRight={15}
            paddingLeft={15}
            minWidth={0}
            backgroundColor={isFocused ? '#f9f9f9' : '#ffffff'}
            hoverBackgroundColor={'#f9f9f9'}
        >
            <XAvatar
                size={'m-small'}
                style={'user'}
                src={mention.avatar}
                objectName={mention.name}
                objectId={mention.id}
                online={mention.online}
            />

            <XView
                flexDirection="column"
                alignSelf="center"
                marginLeft={12}
                fontSize={13}
                fontWeight={'600'}
                lineHeight={1.54}
                color={'#000000'}
            >
                {mention.name}
            </XView>

            <XView
                flexDirection="column"
                alignSelf={'center'}
                marginLeft={7}
                opacity={0.4}
                fontSize={12}
                fontWeight={'600'}
                lineHeight={1.5}
                color={'#000000'}
            >
                {mention.title}
            </XView>

            <XView flexGrow={1} />

            <XView
                flexDirection="column"
                alignSelf={'center'}
                opacity={0.4}
                fontSize={12}
                fontWeight={'400'}
                lineHeight={1.5}
                color={isFocused ? '#000000' : 'transparent'}
            >
                <div style={{ position: 'relative' }}>
                    <span style={{ top: 2, position: 'absolute', left: -16 }}>↵</span>{' '}
                    <span>to select</span>
                </div>
            </XView>
        </XView>
    );
});
