import * as React from 'react';
import createMentionPlugin from 'draft-js-mention-plugin';
import Glamorous from 'glamorous';
import { XAvatar } from 'openland-x/XAvatar';
import { XView } from 'openland-x/XView';
import { MentionComponentInner } from './XMention';

const positionSuggestions = ({ state, props }: any) => {
    let transition, transform;

    if (state.isActive && props.suggestions.length > 0) {
        transform = 'scaleY(1)';
        transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
    } else if (state.isActive) {
        transform = 'scaleY(0)';
        transition = 'all 0.25s cubic-bezier(.3,1,.2,1)';
    }

    return {
        transform,
        transition,
    };
};

export const mentionPlugin = createMentionPlugin({
    mentionPrefix: '@',
    entityMutability: 'IMMUTABLE',
    positionSuggestions,
    mentionComponent: (props: any) => {
        return (
            <MentionComponentInner
                mention={props.mention}
                className={props.className}
                inCompose
            >
                {props.children}
            </MentionComponentInner>
        );
    },
});

const { MentionSuggestions } = mentionPlugin;

const MentionSuggestionsWrapperInner = Glamorous.div(({ width }: any) => ({
    '& ': {
        '&.draftJsMentionPlugin__mentionSuggestions__2DWjA': {
            position: 'absolute',
            borderTop: '1px solid #eee',
            background: '#fff',
            boxShadow: 'none',
            width,
            maxWidth: width,
            zIndex: 100,
            bottom: 50,
            left: 0,
            borderRadius: '10px',
            cursor: 'pointer',
        },
    },
}));

export const MentionEntry = (props: any) => {
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

            <XView
                marginLeft="auto"
                flexDirection="column"
                alignSelf={'center'}
                opacity={0.4}
                fontSize={12}
                fontWeight={'normal'}
                lineHeight={1.5}
                color={isFocused ? '#000000' : 'transparent'}
            >
                <div style={{ position: 'relative' }}>
                    <span style={{ top: 2, position: 'absolute', left: -16 }}>
                        ↵
                    </span>{' '}
                    <span>to select</span>
                </div>
            </XView>
        </XView>
    );
};

export class MentionSuggestionsWrapper extends React.PureComponent<{
    width: number;
    onSearchChange: Function;
    suggestions: any;
}> {
    render() {
        return (
            <MentionSuggestionsWrapperInner width={this.props.width}>
                <MentionSuggestions
                    onSearchChange={this.props.onSearchChange}
                    suggestions={this.props.suggestions}
                    entryComponent={MentionEntry}
                />
            </MentionSuggestionsWrapperInner>
        );
    }
}
