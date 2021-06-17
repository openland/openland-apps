import * as React from 'react';
import { ZHeroAction } from 'openland-mobile/components/ZHeroAction';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { ZAvatarPicker, ZAvatarPickerRenderProps } from 'openland-mobile/components/ZAvatarPicker';
import Toast from 'openland-mobile/components/Toast';
import { useText } from 'openland-mobile/text/useText';

const Renderer = React.memo((props: ZAvatarPickerRenderProps & { onLoadingStart: () => void }) => {
    const { t } = useText();
    React.useEffect(() => {
        if (props.loading) {
            props.onLoadingStart();
        }
    }, [props.loading]);

    return (
        <ZHeroAction
            icon={require('assets/ic-camera-24.png')}
            title={t('upload', 'Upload')}
            onPress={props.showPicker}
        />
    );
});

export const UserPhotoUploader = React.memo(() => {
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