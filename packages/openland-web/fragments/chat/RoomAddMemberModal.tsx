import * as React from 'react';
import { XModalForm as XModalFormOld } from 'openland-x-modal/XModalForm';
import { XFormField } from 'openland-x-forms/XFormField';
import { XForm } from 'openland-x-forms/XForm';
import { UserSelect } from 'openland-web/api/UserSelect';
import { withRoomAddMember } from 'openland-web/api/withRoomAddMembers';

export const RoomAddMemberModal = withRoomAddMember(props => {
    return (
        <XModalFormOld
            title="Add member to room"
            submitMutation={props.addMember}
            mutationDirect={true}
            actionName="Add"
            targetQuery="addMember"
            target={(props as any).target}
            defaultValues={{ roomId: (props as any).roomId }}
        >
            <XFormField title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XFormField>
        </XModalFormOld>
    );
}) as React.ComponentType<{ roomId: string, target?: any }>;
