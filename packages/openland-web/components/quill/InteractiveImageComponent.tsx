import * as React from 'react';
import * as UploadCare from 'uploadcare-widget';
import { XView } from 'react-mental';
import { interactiveComponent } from './InteractiveComponent';
import { XLoader } from 'openland-x/XLoader';
import { XCloudImage } from 'openland-x/XCloudImage';
import { UploadingFile, UploadStatus } from 'openland-engines/messenger/types';
import { layoutMedia } from 'openland-y-utils/MediaLayout';

export interface InteractiveImageComponentState {
    width: number;
    height: number;
    file:
    | { type: 'ready', id: string }
    | { type: 'pending', file: File, upload: UploadingFile };
}

export const InteractiveImageComponent = interactiveComponent<InteractiveImageComponentState>((props) => {
    React.useEffect(() => {
        if (props.value.file.type === 'pending') {
            props.value.file.upload.watch((s) => {
                if (s.status === UploadStatus.COMPLETED) {
                    props.setValue({ ...props.value, file: { type: 'ready', id: s.uuid! } });
                }
            });
        }
    }, [props.value]);

    const layoutModal = layoutMedia(
        props.value.width,
        props.value.height,
        600,
        600,
        32,
        32,
    );

    return (
        <XView width="100%" alignItems="center" justifyContent="center">
            {props.value.file.type === 'pending' && (
                <XView width={layoutModal.width} height={layoutModal.height}>
                    <XLoader loading={true} />
                </XView>
            )}
            {props.value.file.type === 'ready' && (
                <XView width={layoutModal.width} height={layoutModal.height}>
                    <XCloudImage photoRef={{ uuid: props.value.file.id }} />
                </XView>
            )}
        </XView>
    );
});