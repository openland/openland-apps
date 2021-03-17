import * as React from 'react';
import { showModalBox } from "openland-x/showModalBox";
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { XView } from 'react-mental';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useShake } from 'openland-web/pages/auth/components/authComponents';
import { cx } from 'linaria';
import { useClient } from 'openland-api/useClient';

interface EditRoomProps {
    roomId: string;
    title: string | null;
}

const EditRoom = React.memo((props: EditRoomProps & { hide: () => void }) => {
    const client = useClient();
    const form = useForm();
    const titleField = useField('room.title', props.title || '', form);
    let [shakeClassName, shake] = useShake();
    const [loading, setLoading] = React.useState(false);
    const handleSave = React.useCallback(async () => {
        let title = titleField.value.trim();
        if (loading) {
            return;
        }
        if (title.length === 0) {
            shake();
            return;
        }
        setLoading(true);
        await client.mutateVoiceChatUpdate({ id: props.roomId, input: { title } });
        props.hide();
    }, [titleField.value.length, loading]);

    return (
        <>
            <XView paddingHorizontal={24} paddingBottom={16}>
                <div className={cx('x', shakeClassName)}>
                    <UTextAreaField
                        placeholder="Room name"
                        field={titleField}
                    />
                </div>
            </XView>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={props.hide}
                />
                <UButton
                    text="Save"
                    style="primary"
                    size="large"
                    loading={loading}
                    onClick={handleSave}
                />
            </XModalFooter>
        </>
    );
});

export const showEditRoom = (props: EditRoomProps) => {
    showModalBox({ title: 'Edit room', width: 368 }, ctx => (
        <EditRoom {...props} hide={ctx.hide} />
    ));
};
