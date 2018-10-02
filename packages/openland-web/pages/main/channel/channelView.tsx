import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { withChat } from '../../../api/withChat';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { MessengerRootComponent } from '../../../components/messenger/components/MessengerRootComponent';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { XMenuTitle, XMenuItemWrapper } from 'openland-x/XMenuItem';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import { ListingsComponent } from './components/listingsComponent';

const ChatRoot = Glamorous(XVertical)({
    width: '100%',
    height: '100%',
});

const ChannelWrapper = Glamorous.div({
    width: '100%',
    height: 'calc(100vh - 56px)',
    maxHeight: 'calc(100vh - 56px)'
});

const ChannelHeader = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
});

const ChannelTitle = Glamorous.div({
    flex: 1,
    padding: '17px 0 16px 23px',
    fontSize: 18,
    lineHeight: '22px',
    fontWeight: 500,
    letterSpacing: -0.5,
    color: '#1790ff',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
});

const ChannelTabs = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
});

const ChannelTab = Glamorous(XLink)({
    padding: '20px 5px 17px',
    borderBottom: '3px solid transparent',
    color: 'rgba(51, 69, 98, 0.5)',
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 500,
    margin: '0 0 -1px 19px',
    display: 'block',
    letterSpacing: -0.4,

    '&:hover': {
        color: '#334562'
    },

    '&.is-active': {
        color: '#334562',
        borderColor: '#1790ff'
    }
});

const ChannelTools = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    padding: '12px 18px 11px 35px',

    '@media (max-width: 1200px)': {
        paddingLeft: '10px',
    },

    '& > *': {
        marginLeft: 12,

        '@media (max-width: 1200px)': {
            marginLeft: '0!important',
        }
    },

    '& > *:first-child': {
        marginLeft: 0
    },

    '& > *:last-child': {
        marginLeft: 5
    }
});

let MessengerComponentLoader = withChat(withQueryLoader((props) => {
    let isListingsTab = props.router.path.endsWith('/listings') || props.router.path.endsWith('/listings/');
    let isMembersTab = props.router.path.endsWith('/members') || props.router.path.endsWith('/members/');

    return (
        <ChatRoot flexGrow={1} separator={'none'}>
            <ChannelHeader>
                <ChannelTitle>
                    {props.data.chat.title}
                </ChannelTitle>
                <ChannelTabs>
                    <ChannelTab path={'/channel/' + props.data.chat.flexibleId}>Discussion</ChannelTab>
                    <ChannelTab path={'/channel/' + props.data.chat.flexibleId + '/listings'}>Listings</ChannelTab>
                    <ChannelTab path={'/channel/' + props.data.chat.flexibleId + '/members'}>Members</ChannelTab>
                </ChannelTabs>
                <ChannelTools>
                    <XButton size="r-default" iconResponsive="star" text="Create listing" />
                    <XButton size="r-default" iconResponsive="star" text="Invite members" />
                    <XOverflow
                        placement="bottom-end"
                        content={(
                            <div style={{ width: 160 }}>
                                <XMenuTitle>Notifications</XMenuTitle>
                                <XMenuItemWrapper>
                                    <XVertical>
                                        <XCheckbox label="Email" switcher={true} checked={true} />
                                    </XVertical>
                                </XMenuItemWrapper>
                                <XMenuItemWrapper>
                                    <XVertical>
                                        <XCheckbox label="Mobile" switcher={true} />
                                    </XVertical>
                                </XMenuItemWrapper>
                                <XMenuItemWrapper>
                                    <XVertical>
                                        <XCheckbox label="Mute" switcher={true} />
                                    </XVertical>
                                </XMenuItemWrapper>
                            </div>
                        )}
                    />
                </ChannelTools>
            </ChannelHeader>
            <ChannelWrapper>
                {(!isListingsTab && !isMembersTab) && (<MessengerRootComponent key={props.data.chat.id} conversationId={props.data.chat.id} channelType={false} />)}
                {(isListingsTab && !isMembersTab) && (<ListingsComponent />)}
            </ChannelWrapper>
        </ChatRoot>
    );
}));

export const ChannelView = (props: { conversationId: string }) => {
    return (<MessengerComponentLoader variables={{ conversationId: props.conversationId }} />);
};