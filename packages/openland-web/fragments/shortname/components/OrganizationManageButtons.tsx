import * as React from 'react';
import { OrganizationWithoutMembers_organization } from 'openland-api/Types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { showLeaveConfirmation } from 'openland-web/fragments/org/showLeaveConfirmation';

export const OrganizationManageButtons = React.memo((props: { organization: OrganizationWithoutMembers_organization }) => {
    const messenger = React.useContext(MessengerContext);
    const { id, isCommunity, isOwner, isAdmin, isMine, shortname } = props.organization;

    const me = messenger.user;
    const canMakePrimary = isMine && id !== (me.primaryOrganization && me.primaryOrganization.id) && !isCommunity;
    const canEdit = isOwner || isAdmin;
    const canLeave = isMine;
    const showButton = canMakePrimary || canEdit || canLeave;
    const typeString = isCommunity ? 'community' : 'organization';
    const path = shortname ? '/' + shortname : '/' + id;

    if (!showButton) {
        return null;
    }

    return (
        <UMoreButton>
            {canEdit && <UListItem title="Edit" path={path + '/edit'} />}
            {canMakePrimary && <UListItem title="Make primary" />}
            {canLeave && <UListItem title={'Leave ' + typeString} onClick={() => showLeaveConfirmation(id)} />}
            {canEdit && <UListItem title="Delete" />}
        </UMoreButton>
    );
});