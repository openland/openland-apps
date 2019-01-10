import '../../../init';
import * as React from 'react';
import { XHeader } from 'openland-x/XHeader';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../../components/Scaffold';
import { Sidebar } from '../../../../components/Sidebar';

// const ContentView = Glamorous.div({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     paddingLeft: '16px',
//     paddingRight: '16px'
// });

export function DevDocsScaffold(props: {
    title?: string;
    children?: any;
    bottomOffset?: boolean;
    hideSidebar?: boolean;
}) {
    return (
        <>
            {props.title !== undefined && <XDocumentHead title={props.title} />}

            <Scaffold>
                {props.hideSidebar !== true && (
                    <Scaffold.Menu>
                        <Sidebar title="X Framework">
                            <Sidebar.Item path="/ui">Buttons</Sidebar.Item>
                            <Sidebar.Item path="/ui/inputs">Inputs</Sidebar.Item>
                            <Sidebar.Item path="/ui/rich">Rich Input</Sidebar.Item>
                            <Sidebar.Item path="/ui/emoji">Emoji</Sidebar.Item>
                            <Sidebar.Item path="/ui/bullets">Bullets</Sidebar.Item>
                            <Sidebar.Item path="/ui/tabs">Tabs</Sidebar.Item>
                            <Sidebar.Item path="/ui/switchers">Switchers</Sidebar.Item>
                            <Sidebar.Item path="/ui/sliders">Sliders</Sidebar.Item>
                            <Sidebar.Item path="/ui/tables">Tables</Sidebar.Item>
                            <Sidebar.Item path="/ui/properties">Properties</Sidebar.Item>
                            <Sidebar.Item path="/ui/animations">Animations</Sidebar.Item>
                            <Sidebar.Item path="/ui/radios">Radio Buttons</Sidebar.Item>
                            <Sidebar.Item path="/ui/checkbox">Checkboxes</Sidebar.Item>
                            <Sidebar.Item path="/ui/select">Select</Sidebar.Item>
                            <Sidebar.Item path="/ui/modals">Modals</Sidebar.Item>
                            <Sidebar.Item path="/ui/popper">Popper</Sidebar.Item>
                            <Sidebar.Item>Messenger Components</Sidebar.Item>
                            <Sidebar.Subitem path="/ui/messenger/MessageFileComponent">
                                MessageFileComponent
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/messenger/MessageImageComponent">
                                MessageImageComponent
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/messenger/MessageIntroComponent">
                                MessageIntroComponent
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/messenger/MessageComponent">
                                MessageComponent
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/messenger/MessageReplyComponent">
                                MessageReplyComponent
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/messenger/MessageTextComponent">
                                MessageTextComponent
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/messenger/MessageWithMentionsTextComponent">
                                MessageWithMentionsTextComponent
                            </Sidebar.Subitem>
                            <Sidebar.Item path="/ui/userpopper">User Popper</Sidebar.Item>
                            <Sidebar.Item path="/ui/avatar">Avatar</Sidebar.Item>
                            <Sidebar.Item path="/ui/files">Files</Sidebar.Item>
                            <Sidebar.Item path="/ui/loaders">Loaders</Sidebar.Item>
                            <Sidebar.Item path="/ui/forms">Forms</Sidebar.Item>
                            <Sidebar.Item path="/ui/tags">Tags</Sidebar.Item>
                            <Sidebar.Item path="/ui/menu-items">Menu items</Sidebar.Item>
                            <Sidebar.Item path="/ui/profile">Profile (Organization)</Sidebar.Item>
                            <Sidebar.Item path="/ui/userprofile">
                                Profile (User - Visitor)
                            </Sidebar.Item>
                            <Sidebar.Item path="/ui/userprofile-my">
                                Profile (User - Owner)
                            </Sidebar.Item>
                            <Sidebar.Item path="/ui/lists">Lists</Sidebar.Item>
                            <Sidebar.Item>Sign Up Components</Sidebar.Item>
                            <Sidebar.Subitem path="/ui/signin/signin-invite">
                                Signin Invite
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/signin/accept-invitation">
                                Accept Invitation
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/signin/auth-mechanism">
                                AuthMechanism
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/signin/create-with-email">
                                CreateWithEmail
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/signin/activation-code">
                                ActivationCode
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/signin/create-profile">
                                CreateProfile
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/signin/create-organization">
                                CreateOrganization
                            </Sidebar.Subitem>
                            <Sidebar.Subitem path="/waitlist-test/">WaitList</Sidebar.Subitem>
                            <Sidebar.Item path="/ui/shortcuts">Shortcuts</Sidebar.Item>
                            <Sidebar.Item>Basic Styles</Sidebar.Item>
                            <Sidebar.Subitem path="/ui/links">Links</Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/typography">Typography</Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/grid">Grid</Sidebar.Subitem>
                            <Sidebar.Item>Layout</Sidebar.Item>
                            <Sidebar.Subitem path="/ui/linear">Linear</Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/scroll">Scroll</Sidebar.Subitem>
                            <Sidebar.Item>Tools</Sidebar.Item>
                            <Sidebar.Subitem path="/ui/tasks">Tasks</Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/store">Store</Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/subscriptions">
                                Subscriptions
                            </Sidebar.Subitem>
                            <Sidebar.Item path="/ui/mentions">Mentions</Sidebar.Item>
                        </Sidebar>
                    </Scaffold.Menu>
                )}
                <Scaffold.Content padding={false} bottomOffset={props.bottomOffset}>
                    {props.title !== undefined && <XHeader text={props.title} />}
                    {props.children}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}
