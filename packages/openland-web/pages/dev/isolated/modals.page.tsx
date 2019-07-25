import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import {
    addMemberModalChatId,
    webInboxChat,
    egoarkaUser,
    rfzzOrgId,
    fredUser,
} from './fixtures';

import { XContent } from 'openland-x-layout/XContent';
import { XButton } from 'openland-x/XButton';
import { XVertical2 } from 'openland-x/XVertical2';
import { XVertical } from 'openland-x-layout/XVertical';

import { showCreateGroupModal } from 'openland-web/fragments/chat/showCreateGroupModal';
import { showCreateOrganization } from 'openland-web/fragments/org/showCreateOrganization';
import { showAddMembersModal } from 'openland-web/fragments/chat/showAddMembersModal';
import { showAdvancedSettingsModal } from 'openland-web/fragments/chat/AdvancedSettingsModal';
import {
    showRoomEditModal,
    leaveChatModal,
    showAddDescriptionModal,
} from 'openland-web/fragments/account/components/groupProfileModals';
import { showRemoveMemberModal } from 'openland-web/fragments/chat/RemoveMemberModal';
import {
    showSuperDeleteOrganizationModal,
    showAddMemberFormModal,
    showRemoveMemberFormModal,
    showDeleteUserModal,
    showAddFeatureModal,
    showRemoveFeatureModal,
    showEditOrganizationModal,
} from '../orgView.page';
import { showImagePreviewModal } from 'openland-web/components/ImagePreviewModal';
import {
    showDeleteOrganizationModal,
    showLeaveOrganizationModal,
    showWebsitePlaceholderModal,
    showAboutPlaceholderModal,
    showSocialPlaceholderModal,
} from 'openland-web/fragments/account/components/modals';
import {
    showRemoveOrgMemberModal,
    showRoleOrgMemberModal,
} from 'openland-web/fragments/account/components/OrganizationProfileComponent';
import {
    showWelcomePopup,
} from 'openland-web/fragments/account/components/welcomePopup';
import { showDeleteMessageModal } from 'openland-web/fragments/chat/components/MessengerRootComponent';
import {
    showAddSuperAdminFormModal,
    showRemoveSuperAdminFormModal,
} from '../admins.page';
import { showAddAccountFormModal } from '../orgs.page';

export default withApp('Isolated - modals', 'viewer', props => {
    return (
        <DevDocsScaffold title="Modals">
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
                            onClick={() => showAdvancedSettingsModal(addMemberModalChatId)}
                        />
                        <XButton
                            text="Room edit"
                            style="primary"
                            onClick={() => showRoomEditModal(webInboxChat.id, true)}
                        />
                        <XButton
                            text="Leave chat"
                            style="primary"
                            onClick={() => leaveChatModal(webInboxChat.id)}
                        />
                        <XButton
                            text="Add description"
                            style="primary"
                            onClick={() => showAddDescriptionModal(webInboxChat.id)}
                        />
                        <XButton
                            text="remove member modal"
                            style="primary"
                            onClick={() =>
                                showRemoveMemberModal({
                                    roomId: webInboxChat.id,
                                    memberId: egoarkaUser.id,
                                    roomTitle: webInboxChat.title,
                                    memberName: egoarkaUser.fullName,
                                })
                            }
                        />
                        <XButton
                            text="super delete organization"
                            style="primary"
                            onClick={() =>
                                showSuperDeleteOrganizationModal({
                                    accountId: egoarkaUser.id,
                                    orgId: rfzzOrgId,
                                })
                            }
                        />
                        <XButton
                            text="delete organization"
                            style="primary"
                            onClick={() =>
                                showDeleteOrganizationModal({
                                    organizationId: rfzzOrgId,
                                    orgName: 'rfzzOrg',
                                })
                            }
                        />
                        <XButton
                            text="leave organization"
                            style="primary"
                            onClick={() => showLeaveOrganizationModal(rfzzOrgId)}
                        />

                        {/* Recover after pin modal */}
                        {/* <XButton
                            text="pin message"
                            style="primary"
                            onClick={() =>
                                showPinMessageModal({
                                    chatId: webInboxChat.id,
                                    pinMessage,
                                    room: gfdsgsRoom,
                                })
                            }
                        /> */}

                        <XButton
                            text="image preview"
                            style="primary"
                            onClick={() =>
                                showImagePreviewModal({
                                    file: fredUser.photo,
                                    height: 200,
                                    width: 200,
                                })
                            }
                        />
                        {/* Recover after pin modal */}
                        {/* <XButton
                            text="pin message"
                            style="primary"
                            onClick={() =>
                                showPinMessageModal({
                                    chatId: webInboxChat.id,
                                    pinMessage,
                                    room: gfdsgsRoom,
                                })
                            }
                        /> */}

                        <XButton
                            text="website placeholder"
                            style="primary"
                            onClick={() => showWebsitePlaceholderModal(rfzzOrgId)}
                        />
                        <XButton
                            text="about placeholder"
                            style="primary"
                            onClick={() => showAboutPlaceholderModal(rfzzOrgId)}
                        />
                        <XButton
                            text="social placeholder"
                            style="primary"
                            onClick={() => showSocialPlaceholderModal(rfzzOrgId)}
                        />
                        <XButton
                            text="remove joined"
                            style="primary"
                            onClick={() =>
                                showRemoveOrgMemberModal({
                                    orgId: rfzzOrgId,
                                    orgName: 'foobar',
                                    // only for test purpose
                                    member: {
                                        __typename: 'OrganizationJoinedMember',
                                        // @ts-ignore
                                        role: 'ADMIN',
                                        // @ts-ignore
                                        user: egoarkaUser,
                                    },
                                })
                            }
                        />
                        <XButton
                            text="permissions modal"
                            style="primary"
                            onClick={() =>
                                showRoleOrgMemberModal({
                                    orgId: rfzzOrgId,
                                    orgName: 'foobar',
                                    // only for test purpose
                                    member: {
                                        __typename: 'OrganizationJoinedMember',
                                        // @ts-ignore
                                        role: 'ADMIN',
                                        // @ts-ignore
                                        user: egoarkaUser,
                                    },
                                })
                            }
                        />
                        <XButton
                            text="welcome popup"
                            style="primary"
                            onClick={() => showWelcomePopup()}
                        />
                        <XButton
                            text="delete message"
                            style="primary"
                            onClick={() => showDeleteMessageModal('1')}
                        />
                        {/* TODO: recover after showMessageModal*/}
                        {/* <XButton
                            text="show message"
                            style="primary"
                            onClick={() =>
                                showMessageModal({
                                    generalMessage: pinMessage,
                                })
                            }
                        /> */}
                        <XButton
                            text="add super admin form"
                            style="primary"
                            onClick={() => showAddSuperAdminFormModal()}
                        />
                        <XButton
                            text="remove super admin form"
                            style="primary"
                            onClick={() => showRemoveSuperAdminFormModal()}
                        />
                        <XButton
                            text="add account form"
                            style="primary"
                            onClick={() => showAddAccountFormModal()}
                        />
                        <XButton
                            text="add member form"
                            style="primary"
                            onClick={() => showAddMemberFormModal(egoarkaUser.id)}
                        />
                        <XButton
                            text="remove member form"
                            style="primary"
                            onClick={() => showRemoveMemberFormModal(egoarkaUser.id)}
                        />

                        <XButton
                            text="delete user"
                            style="primary"
                            onClick={() => showDeleteUserModal(egoarkaUser.id)}
                        />

                        <XButton
                            text="add feature"
                            style="primary"
                            onClick={() => showAddFeatureModal(egoarkaUser.id)}
                        />

                        <XButton
                            text="remove feature"
                            style="primary"
                            onClick={() => showRemoveFeatureModal(egoarkaUser.id)}
                        />

                        <XButton
                            text="edit organization"
                            style="primary"
                            onClick={() =>
                                showEditOrganizationModal({
                                    accountId: egoarkaUser.id,
                                    orgTitle: 'foobar',
                                })
                            }
                        />
                    </XVertical>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
