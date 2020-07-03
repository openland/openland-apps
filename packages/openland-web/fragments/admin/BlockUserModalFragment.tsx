import * as React from 'react';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { UButton } from 'openland-web/components/unicorn/UButton';

export default function BlockUserModal(
    id: string,
    client: any,
    deleted: boolean,
    setDelete: (i: boolean) => void,
) {
    showModalBox({ title: 'Are you sure?' }, ctx => (
        <XView
            paddingHorizontal={40}
            paddingVertical={20}
            flexDirection="row"
            justifyContent="flex-end"
        >
            <XView flexDirection="row" justifyContent="space-between">
                <UButton text="Cancel" onClick={ctx.hide} />
                <UButton
                    text={deleted ? 'Done!' : 'Delete'}
                    style={deleted ? 'success' : 'danger'}
                    action={async () => {
                        await client.mutateDeleteUser({ id });
                        setDelete(!deleted);
                        ctx.hide();
                    }}
                />
            </XView>
        </XView>
    ));
}