import * as React from 'react';
import { withChatsAll } from '../../../../api/withChatsAll';
import { makeNavigable } from 'openland-x/Navigable';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XCounter } from 'openland-x/XCounter';
import { XScrollView } from 'openland-x/XScrollView';
import { XAvatar } from 'openland-x/XAvatar';
import { XDate } from 'openland-x-format/XDate';
import { XButton } from 'openland-x/XButton';

const ChannelsItemWrapper = Glamorous.div<{ highlighted: boolean }>([
    (props) => ({
        display: 'flex',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    }),
    (props) => (props.highlighted ? {
        '&:before': {
            content: ' ',
            display: 'block',
            position: 'absolute',
            top: 17,
            left: 18,
            width: 6,
            height: 6,
            borderRadius: 6,
            background: '#1790ff',
        }
    } : {})
]);

let ChannelsListWrapper = Glamorous(XScrollView)({
    flex: 1,
});

let ChannelsListGroup = Glamorous.div({
    marginBottom: 16
});

let ChannelsListTitle = Glamorous.div({
    padding: '10px 16px',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    opacity: .5,
    color: '#334562',
    letterSpacing: 0.4
});

let ChannelsListItems = Glamorous.div({
    
});

const ChannelsItemBox = Glamorous(XLink)({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    color: '#334562',
    flex: 1,
    display: 'flex',
    padding: '10px 12px 10px 36px',
    letterSpacing: 0.4,
    '&.is-active, &:hover': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)',
        color: '#1790ff'
    }
});

const ChannelsItemTools = Glamorous.div({
    position: 'absolute',
    top: 12,
    right: 12
});

let ChannelsItemTitle = Glamorous.div({
    flexGrow: 1,
});

let ChannelsItemCounter = Glamorous.div({
    color: '#5c6a81',
    opacity: .5,
});

export class ChannelsItem extends React.Component<XLinkProps & { unread?: number, title: string }> {
    render() {
        return (
            <ChannelsItemWrapper highlighted={this.props.unread ? true : false}>
                <ChannelsItemBox {...this.props}>
                    <ChannelsItemTitle>{this.props.title}</ChannelsItemTitle>
                    {(this.props.unread && !this.props.children) && (<ChannelsItemCounter>{this.props.unread > 20 ? '20+' : this.props.unread}</ChannelsItemCounter>)}
                </ChannelsItemBox>
                {this.props.children && (<ChannelsItemTools>{this.props.children}</ChannelsItemTools>)}
            </ChannelsItemWrapper>
        );
    }
}

export const ChannelsList = withChatsAll((props) => {
    function randomInteger (min: number, max: number) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand > 0 ? rand : undefined;
    }

    return (
        <ChannelsListWrapper>
            <ChannelsListGroup>
                <ChannelsListTitle>My channels</ChannelsListTitle>
                <ChannelsListItems>
                    {props.data && props.data.chats && props.data.chats.conversations.map((v) => (
                        <ChannelsItem
                            path={'/channel/' + v.flexibleId}
                            key={v.id}
                            title={v.title}
                            unread={randomInteger(-30, 30)}
                        >
                            {(v.title === 'Pdr.io') && (<XButton size="r-tiny" style="primary-sky-blue" text="Request invite" />)}
                        </ChannelsItem>
                    ))}
                </ChannelsListItems>
            </ChannelsListGroup>
            <ChannelsListGroup>
                <ChannelsListTitle>Recommended</ChannelsListTitle>
            </ChannelsListGroup>
        </ChannelsListWrapper>
    );
});