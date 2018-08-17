import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withChat } from '../../api/withChat';
import { withQueryLoader } from '../withQueryLoader';
import { MessengerRootComponent } from './components/MessengerRootComponent';
import { XOverflow } from '../Incubator/XOverflow';
import { XAvatar } from 'openland-x/XAvatar';
import { makeNavigable } from 'openland-x/Navigable';
import { XMenuTitle, XMenuItemWrapper } from 'openland-x/XMenuItem';
import { XCheckbox, XCheckboxBasic } from 'openland-x/XCheckbox';
import { XButton } from 'openland-x/XButton';
import { withBlockUser } from '../../api/withBlockUser';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import { delay } from 'openland-y-utils/timer';

const ChatHeaderWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    flexShrink: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
});

const ChatHeaderContent = Glamorous(XHorizontal)({
    alignItems: 'center',
    maxWidth: '100%',
    width: '100%',
    flexBasis: '100%'
});

const Title = Glamorous.div({
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#1790ff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
});

const SubTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.1,
    color: '#5c6a81',
    opacity: 0.5
});

const NavChatLeftContent = makeNavigable(XHorizontal);

const NavChatLeftContentStyled = Glamorous<{ path?: string } & any>(NavChatLeftContent)(props => ({
    cursor: props.path ? 'pointer' : undefined
}));

const XButtonMargin = Glamorous(XButton)({
    margin: 4
});

class BlockSwitcherComponent extends React.Component<{ unblock: any, block: any, blocked: boolean, userId: string, refetchVars: { conversationId: string } }, { blocked: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { blocked: props.blocked };
    }

    render() {
        return (
            <XMenuItemWrapper>
                <XVertical>
                    <XCheckbox
                        label="Block"
                        switcher={true}
                        value={this.state.blocked ? 'blocked' : 'unblocked'}
                        trueValue="blocked"
                        onChange={() => {
                            this.setState({ blocked: !this.state.blocked });
                            delay(0).then(() => {
                                this.props.blocked
                                    ? this.props.unblock({
                                        variables: {
                                            userId: this.props.userId
                                        }
                                    })
                                    : this.props.block({
                                        variables: {
                                            userId: this.props.userId
                                        }
                                    });
                            });

                        }
                        }
                    />
                </XVertical>
            </XMenuItemWrapper>
        );
    }
}

const BlockButton = withBlockUser((props) => (
    <BlockSwitcherComponent block={props.block} unblock={props.unblock} blocked={(props as any).blocked} userId={(props as any).userId} refetchVars={(props as any).refetchVars} />
)) as React.ComponentType<{ blocked: boolean, userId: string, refetchVars: { conversationId: string } }>;

let MessengerComponentLoader = withChat(withQueryLoader((props) => {
    console.log(props);
    return (
        <XVertical flexGrow={1} separator={'none'} width="100%" height="100%">
            <ChatHeaderWrapper>
                <ChatHeaderContent justifyContent="space-between">
                    <NavChatLeftContentStyled
                        path={props.data.chat.__typename === 'SharedConversation' && props.data.chat.organization ? '/o/' + props.data.chat.organization.id : undefined}
                        separator={10}
                        alignItems="center"
                        flexGrow={0}
                    >
                        <XHorizontal alignItems="center" separator={6}>
                            <XAvatar
                                path={props.data.chat.__typename === 'SharedConversation' && props.data.chat.organization ? '/o/' + props.data.chat.organization.id : undefined}
                                size="small"
                                style={props.data.chat.__typename === 'SharedConversation' ? 'organization' : 'person'}
                                cloudImageUuid={props.data.chat.photos.length > 0 ? props.data.chat.photos[0] : undefined}
                            />
                            <XHorizontal alignItems="center" separator={6}>
                                <Title>{props.data.chat.title}</Title>
                                <SubTitle>
                                    {(props.data.chat.__typename === 'SharedConversation'
                                        ? 'Organization'
                                        : props.data.chat.__typename === 'GroupConversation'
                                            ? 'Group'
                                            : 'Person'
                                    )}
                                </SubTitle>
                            </XHorizontal>
                        </XHorizontal>
                    </NavChatLeftContentStyled>
                    <XOverflow
                        flat={true}
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
                                {props.data.chat.__typename === 'PrivateConversation' && (
                                    <BlockButton
                                        blocked={(props.data.chat as any).blocked}
                                        userId={(props.data.chat as any).user.id}
                                        refetchVars={{ conversationId: props.data.chat.id }}
                                    />
                                )}
                            </div>
                        )}
                    />
                </ChatHeaderContent>
            </ChatHeaderWrapper>
            <XHorizontal
                justifyContent="center"
                width="100%"
                height="calc(100% - 56px)"
                maxHeight="calc(100% - 56px)"
            >
                <MessengerRootComponent key={props.data.chat.id} conversationId={props.data.chat.id} />
            </XHorizontal>
        </XVertical>
    );
}));

export const MessengerComponent = (props: { conversationId: string }) => {
    return (<MessengerComponentLoader variables={{ conversationId: props.conversationId }} />);
};