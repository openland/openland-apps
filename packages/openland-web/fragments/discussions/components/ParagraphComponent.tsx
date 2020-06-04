import * as React from 'react';
import { XView } from 'react-mental';
import { ParagraphSimple } from 'openland-api/spacex.types';
import { XCloudImage } from 'openland-x/XCloudImage';
import { layoutMedia } from 'openland-y-utils/MediaLayout';

export const ParagraphComponent = React.memo((props: { data: ParagraphSimple }) => {
    if (props.data.__typename === 'TextParagraph') {
        return (
            <XView>
                {props.data.text}
            </XView>
        );
    }
    if (props.data.__typename === 'H1Paragraph') {
        return (
            <XView>
                {props.data.text}
            </XView>
        );
    }
    if (props.data.__typename === 'H2Paragraph') {
        return (
            <XView>
                {props.data.text}
            </XView>
        );
    }
    if (props.data.__typename === 'ImageParagraph') {
        const layoutModal = layoutMedia(
            props.data.fileMetadata!.imageWidth!,
            props.data.fileMetadata!.imageHeight!,
            600,
            600,
            32,
            32,
        );
        return (
            <XView>
                <XCloudImage
                    photoRef={{ uuid: props.data.image.uuid }}
                    width={layoutModal.width}
                    height={layoutModal.height}
                    resize="fill"
                />
            </XView>
        );
    }
    return null;
});
