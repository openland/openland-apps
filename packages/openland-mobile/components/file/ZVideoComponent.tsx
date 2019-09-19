import * as React from 'react';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { View } from 'react-native';
import Video from 'react-native-video';
import { LoaderSpinner } from '../LoaderSpinner';

export const ZVideoComponent = React.memo((props: { uuid: string }) => {
    const { uuid } = props;
    const [path, setPath] = React.useState('');

    React.useEffect(() => {
        (async () => {
            const filePathWithExtension = await DownloadManagerInstance.getFilePathWithRealName(uuid, null, uuid + '.mp4');

            if (filePathWithExtension) {
                setPath(filePathWithExtension);
            }
        })();
    }, []);

    return (
        <View flexGrow={1}>
            {path.length > 0 && (
                <Video source={{ uri: path }} style={{ flexGrow: 1 }} controls={true} />
            )}
            {path.length <= 0 && (
                <View flexGrow={1} alignItems="center" justifyContent="center">
                    <LoaderSpinner />
                </View>
            )}
        </View>
    );
});