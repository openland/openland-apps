
import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { paddedTextOut, paddedText } from '../../AsyncMessageContentView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { bubbleMaxWidth } from '../../AsyncBubbleView';
import { formatBytes } from 'openland-mobile/utils/formatBytes';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata } from 'openland-api/Types';

interface DocumentContentAsyncRenderProps {
    handlePress: () => void;
    compensateBubble?: boolean;
    isOut: boolean;
    imageSource: NodeRequire;
    downloadProgress?: number;
    fileMetadata: FullMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
}

export const DocumentContentAsyncRender = (props: DocumentContentAsyncRenderProps) => (
    <ASFlex
        height={40}
        flexDirection="row"
        onPress={props.handlePress}
        marginTop={2}
        marginBottom={1}
        marginLeft={props.compensateBubble ? -2 : undefined}
    >
        <ASFlex
            width={40}
            height={40}
            backgroundColor={props.isOut ? 'rgba(0,0,0,0.15)' : 'rgba(185,192,202,0.20)'}
            opacity={props.isOut ? 0.15 : 0.2}
            borderRadius={20}
            marginRight={10}
            alignItems="center"
            justifyContent="center"
        >
            <ASImage
                source={props.imageSource}
                width={16}
                height={20}
            />
            {!!props.downloadProgress && (
                <ASFlex
                    width={40}
                    backgroundColor="#0008"
                    borderRadius={20}
                    marginRight={10}
                    overlay={true}
                    justifyContent="center"
                    alignItems="center"
                >
                    <ASText color="#fff" opacity={0.8} textAlign="center">{Math.round(props.downloadProgress * 100)}</ASText>
                </ASFlex>
            )}
        </ASFlex>

        <ASFlex
            flexGrow={1}
            flexDirection="column"
            marginTop={4}
            marginRight={14}
            alignSelf="center"
        >
            <ASText
                maxWidth={bubbleMaxWidth - 110}
                color={props.isOut ? '#ffffff' : '#000000'}
                height={18}
                fontSize={15}
                lineHeight={18}
                numberOfLines={1}
            >
                {props.fileMetadata.name}{props.isOut ? paddedTextOut(true) : paddedText(true)}
            </ASText>
            <ASText
                color={props.isOut ? '#ffffff' : '#8a8a8f'}
                height={15}
                lineHeight={15}
                fontSize={13}
                marginTop={3}
                numberOfLines={1}
                opacity={0.7}
            >
                {formatBytes(props.fileMetadata.size)}
            </ASText>
        </ASFlex>
    </ASFlex>
);