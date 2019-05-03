import * as React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { showPictureModal } from 'openland-mobile/components/modal/ZPictureModal';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata, FullMessage_GeneralMessage_attachments_MessageRichAttachment_image_metadata } from 'openland-api/Types';
import { formatDate } from 'openland-mobile/utils/formatDate';

interface PreviewWrapperProps {
    path?: string;
    radius: number;
    children: any;
    metadata: FullMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata | FullMessage_GeneralMessage_attachments_MessageRichAttachment_image_metadata;
    senderName?: string;
    date?: string;
}

export class PreviewWrapper extends React.PureComponent<PreviewWrapperProps> {
    ref = React.createRef<View>();

    handlePress = () => {
        if (!this.props.path) {
            return;
        }
        if (!this.ref.current) {
            return;
        }
        let view = this.ref.current!!;

        view.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            showPictureModal({
                title: this.props.senderName,
                subtitle: this.props.date ? formatDate(parseInt(this.props.date, 10)) : undefined,
                url: this.props.path!,
                width: this.props.metadata.imageWidth || 1024,
                height: this.props.metadata.imageHeight || 1024,
                isGif: false,
                animate: { x: pageX, y: pageY, width, height, borderRadius: this.props.radius },
                onBegin: () => {
                    view!!.setNativeProps({ 'opacity': 0 });
                },
                onEnd: () => {
                    view!!.setNativeProps({ 'opacity': 1 });
                },
            });
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View ref={this.ref}>
                    {this.props.children}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}