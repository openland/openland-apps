import * as React from 'react';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { View } from 'react-native';
import Video from 'react-native-video';
import { LoaderSpinner } from '../LoaderSpinner';
import { isAudio, extractExtension } from 'openland-mobile/utils/isVideo';

export const ZVideoComponent = React.memo(
    (props: { uuid: string; name: string; completed: boolean }) => {
        const { uuid, completed } = props;
        const [path, setPath] = React.useState('');

        React.useEffect(() => {
            if (completed && path.length <= 0) {
                (async () => {
                    const filePathWithExtension = await DownloadManagerInstance.getFilePathWithRealName(
                        uuid,
                        null,
                        isAudio(props.name) ? `${uuid}.${extractExtension(props.name)}` : `${uuid}.mp4`,
                    );

                    if (filePathWithExtension) {
                        setPath(filePathWithExtension);
                    }
                })();
            }
        }, [completed, path]);

        return (
            <View style={{ flexGrow: 1 }}>
                {path.length > 0 && completed && (
                    <Video
                        source={{ uri: path }}
                        style={{ flexGrow: 1 }}
                        controls={true}
                        playWhenInactive={true}
                        ignoreSilentSwitch="ignore"
                        resizeMode="contain"
                    />
                )}
                {(path.length <= 0 || !completed) && (
                    <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <LoaderSpinner />
                    </View>
                )}
            </View>
        );
    },
);
