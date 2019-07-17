import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { addMemberModalChatId, webInboxChat, egoarkaId } from './fixtures';

import { XContent } from 'openland-x-layout/XContent';
import { XButton } from 'openland-x/XButton';
import { XVertical2 } from 'openland-x/XVertical2';
import { XVertical } from 'openland-x-layout/XVertical';

import { showCreateGroupModal } from 'openland-web/fragments/chat/showCreateGroupModal';
import { showCreateOrganization } from 'openland-web/fragments/org/showCreateOrganization';
import { showAddMembersModal } from 'openland-web/fragments/chat/AddMembersModal';
import { showAdvancedSettingsModal } from 'openland-web/fragments/chat/AdvancedSettingsModal';
import {
    showRoomEditModal,
    leaveChatModal,
    showAddDescriptionModal,
} from 'openland-web/fragments/account/components/RoomProfileComponent';
import { showRemoveMemberModal } from 'openland-web/fragments/chat/RemoveMemberModal';

export default withApp('UI Framework - New modals', 'viewer', props => {
    return (
        <DevDocsScaffold title="New modals">
            <XContent>
                <XVertical2>
                    <XVertical width="400px">
                        <XButton
                            text="New group"
                            style="primary"
                            onClick={() => showCreateGroupModal('group')}
                        />
                        <XButton
                            text="New channel"
                            style="primary"
                            onClick={() => showCreateGroupModal('channel')}
                        />
                        <XButton
                            text="New community"
                            style="primary"
                            onClick={() => showCreateOrganization('community')}
                        />
                        <XButton
                            text="New organization"
                            style="primary"
                            onClick={() => showCreateOrganization('organization')}
                        />

                        <XButton
                            text="Add members"
                            style="primary"
                            onClick={() =>
                                showAddMembersModal({
                                    id: addMemberModalChatId,
                                    isRoom: true,
                                    isOrganization: false,
                                    isChannel: false,
                                })
                            }
                        />

                        <XButton
                            text="Advanced settings"
                            style="primary"
                            onClick={() =>
                                showAdvancedSettingsModal({
                                    roomId: addMemberModalChatId,
                                    welcomeMessageIsOn: false,
                                    socialImage: null,
                                    welcomeMessageSender: null,
                                    welcomeMessageText: null,
                                })
                            }
                        />

                        <XButton
                            text="Room edit"
                            style="primary"
                            onClick={() => showRoomEditModal(webInboxChat)}
                        />

                        <XButton
                            text="Leave chat"
                            style="primary"
                            onClick={() => leaveChatModal(webInboxChat.id)}
                        />

                        <XButton
                            text="Add description"
                            style="primary"
                            onClick={() => showAddDescriptionModal(webInboxChat)}
                        />

                        <XButton
                            text="remove member modal"
                            style="primary"
                            onClick={() =>
                                showRemoveMemberModal({
                                    roomId: webInboxChat.id,
                                    memberId: egoarkaId,
                                    roomTitle: webInboxChat.title,
                                })
                            }
                        />
                    </XVertical>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
