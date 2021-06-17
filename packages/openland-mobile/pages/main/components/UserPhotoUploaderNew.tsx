import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { ZAvatarPicker, ZAvatarPickerRenderProps } from 'openland-mobile/components/ZAvatarPicker';
import Toast from 'openland-mobile/components/Toast';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useText } from 'openland-mobile/text/useText';

const Renderer = React.memo((props: ZAvatarPickerRenderProps & { onLoadingStart: () => void }) => {
    const { t } = useText();
    React.useEffect(() => {
        if (props.loading) {
            props.onLoadingStart();
        }
    }, [props.loading]);

    return (
        <ZListItem
            text={t('uploadPhoto', 'Upload photo')}
            leftIcon={require('assets/ic-camera-24.png')}
            small={true}
            onPress={props.showPicker}
        />
    );
});

export const UserPhotoUploaderNew = React.memo(() => {
    const client = getClient();
    const myID = getMessenger().engine.user.id;
    const loader = React.useMemo(() => Toast.loader(), []);

    const handleSave = React.useCallback(async (value) => {
        await client.mutateProfileUpdate({
            input: {
                photoRef: sanitizeImageRef(value),
            },
        });
        await client.refetchAccount();
        await client.refetchUser({ userId: myID });

        loader.hide();
        Toast.success({ duration: 1000 }).show();
    }, []);

    return (
        <ZAvatarPicker
            id={myID}
            render={(props: ZAvatarPickerRenderProps) => <Renderer {...props} onLoadingStart={() => loader.show()} />}
            onChanged={handleSave}
        />
    );
});