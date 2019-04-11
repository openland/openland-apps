import * as React from 'react';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { View, Text, TextStyle } from 'react-native';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage, FullMessage_GeneralMessage_quotedMessages } from 'openland-api/Types';
import { TextContent } from './TextContent';
import { MediaContent } from './MediaContent';
import { DocumentContent } from './DocumentContent';
import { layoutImage } from 'openland-mobile/messenger/components/content/MediaContent';

interface ReplyContentProps {
    quotedMessages: FullMessage_GeneralMessage_quotedMessages[];

    onUserPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string }) => void;
    onDocumentPress: (document: FullMessage_GeneralMessage_attachments_MessageAttachmentFile) => void;
}

export const ReplyContent = (props: ReplyContentProps) => {
    return (
        <>
            {props.quotedMessages.map((quote) => {
                let generalMesage = quote.__typename === 'GeneralMessage' ? quote as FullMessage_GeneralMessage : undefined;

                if (generalMesage) {
                    let fileAttaches = generalMesage.attachments && generalMesage.attachments.filter(a => a.__typename === 'MessageAttachmentFile') as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
                    let contentAttach: JSX.Element[] = [];

                    {fileAttaches.map((file, index) => {
                        let isImage = file.fileMetadata.isImage;
                    
                        if (isImage) {
                            let imageLayout = layoutImage(file.fileMetadata);
                    
                            if (imageLayout) {
                                contentAttach.push(<MediaContent key={'msg-reply-' + quote.id + '-media-' + index} imageLayout={imageLayout} message={generalMesage!} attach={file} onMediaPress={props.onMediaPress} />);
                            }
                        } else {
                            contentAttach.push(<DocumentContent key={'msg-reply-' + quote.id + '-document-' + index} attach={file} message={generalMesage!} onDocumentPress={props.onDocumentPress} />);
                        }
                    })}

                    return (
                        <View key={'quote-' + quote.id} flexDirection="column" marginTop={5} marginLeft={1} marginBottom={6} borderLeftWidth={2} borderLeftColor="#0084fe" paddingLeft={8}>
                            <Text
                                style={{
                                    marginTop: -2,
                                    height: 15,
                                    lineHeight: 15,
                                    color: '#0084fe',
                                    letterSpacing: -0.3,
                                    fontSize: 13,
                                    fontWeight: TextStyles.weight.medium,
                                    marginBottom: 2,
                                } as TextStyle}
                                onPress={() => props.onUserPress(generalMesage!.sender.id!)}
                            >
                                {generalMesage!.sender.name || ''}
                            </Text>

                            {!!generalMesage!.message && <TextContent message={generalMesage!} onUserPress={props.onUserPress} />}
                            {contentAttach}
                        </View>
                    );
                } else {
                    return (<TextContent message={quote} onUserPress={props.onUserPress} />)
                }
            })}
        </>
    );
}