import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { ASImage } from 'react-native-async-view/ASImage';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { contentInsetsHorizontal, contentInsetsBottom, contentInsetsTop } from '../../AsyncBubbleView';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata } from 'openland-api/Types';

interface MediaContentAsyncRenderProps {
    layout: { width: number, height: number };
    downloadProgress?: number;
    compensateBubble?: boolean;
    single?: boolean;
    imageSource?: { uri?: string };
    handlePress: (event: ASPressEvent) => void;
    fileMetadata: FullMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
}

export const MediaContentAsyncRender = (props: MediaContentAsyncRenderProps) => (
    <ASFlex
        flexDirection="column"
        width={props.single ? props.layout.width : undefined}
        height={props.layout.height}
        marginTop={props.compensateBubble ? (props.single ? -contentInsetsTop : 8) : undefined}
        marginLeft={props.compensateBubble ? - contentInsetsHorizontal : undefined}
        marginRight={props.compensateBubble ? - contentInsetsHorizontal : undefined}
        marginBottom={props.compensateBubble ? - contentInsetsBottom : undefined}
        backgroundColor={!props.single ? '#dbdce1' : undefined}
        borderRadius={18}
        alignItems="center"
    >
        <ASImage
            maxWidth={props.layout.width}
            onPress={props.handlePress}
            source={props.imageSource}
            isGif={props.fileMetadata.imageFormat === 'gif'}
            borderRadius={16}
            marginLeft={2}
            marginRight={2}
            marginTop={2}
            marginBottom={2}
            width={props.layout.width - 4}
            height={props.layout.height - 4}

        />

        <ASFlex
            overlay={true}
            alignItems="flex-end"
            justifyContent="flex-end"
            marginRight={8}
        >
            {!!props.downloadProgress && <ASFlex
                overlay={true}
                width={props.layout.width}
                height={props.layout.height}
                justifyContent="center"
                alignItems="center"
            >
                <ASFlex
                    backgroundColor="#0008"
                    borderRadius={20}
                >
                    <ASText color="#fff" opacity={0.8} marginLeft={20} marginTop={20} marginRight={20} marginBottom={20} textAlign="center">{'Loading ' + Math.round(props.downloadProgress * 100)}</ASText>
                </ASFlex>
            </ASFlex>}
        </ASFlex>
    </ASFlex>
);