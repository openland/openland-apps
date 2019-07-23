import * as React from 'react';
import XPopper from 'openland-x/XPopper';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { showCreateGroupModal } from 'openland-web/fragments/chat/showCreateGroupModal';

export const CreateGroupButton = React.memo((props: { id: string }) => {
    const [show, setShow] = React.useState(false);

    const closer = () => {
        setShow(false);
    };

    const toggle = () => {
        setShow(!show);
    };

    return (
        <XPopper
            placement="bottom-start"
            show={show}
            arrow={null}
            onClickOutside={closer}
            content={
                <>
                    <UListItem title="New group" onClick={() => showCreateGroupModal('group', props.id)} />
                    <UListItem title="New channel" onClick={() => showCreateGroupModal('channel', props.id)} />
                </>
            }
        >
            <div>
                <UAddItem
                    title="Create new"
                    onClick={toggle}
                />
            </div>
        </XPopper>
    );
});