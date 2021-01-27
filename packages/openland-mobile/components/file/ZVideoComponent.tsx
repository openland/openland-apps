import * as React from 'react';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { View } from 'react-native';
import Video from 'react-native-video';
import { LoaderSpinner } from '../LoaderSpinner';

export const ZVideoComponent = React.memo(
    (props: { uuid: string; name: string; completed: boolean, uri?: string }) => {
        const { uuid, completed, uri } = props;
        const [path, setPath] = React.useState('');

        React.useEffect(() => {
            if (completed && path.length <= 0) {
                (async () => {
                    const filePathWithExtension = await DownloadManagerInstance.getFilePathWithRealName(
                        uuid,
                        null,
                        `${uuid}.mp4`,
                    );

                    if (filePathWithExtension) {
                        setPath(filePathWithExtension);
                    }
                })();
            }
        }, [completed, path]);

        return (
            <View style={{ flexGrow: 1 }}>
                {(path.length > 0 && completed || uri) && (
                    <Video
                        source={{ uri: uri || path }}
                        style={{ flexGrow: 1 }}
                        controls={true}
                        playWhenInactive={true}
                        ignoreSilentSwitch="ignore"
                    />
                )}
                {(path.length <= 0 || !completed) && !uri && (
                    <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <LoaderSpinner />
                    </View>
                )}
            </View>
        );
    },
);
