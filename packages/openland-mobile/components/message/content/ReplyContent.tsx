import * as React from 'react';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { View, Text, Dimensions } from 'react-native';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage, FullMessage_GeneralMessage_quotedMessages } from 'openland-api/spacex.types';
import { TextContent } from './TextContent';
import { MediaContent } from './MediaContent';
import { DocumentContent } from './DocumentContent';
import { layoutImage } from 'openland-mobile/messenger/components/content/MediaContent';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

interface ReplyContentProps {
    quotedMessages: FullMessage_GeneralMessage_quotedMessages[];
    theme: ThemeGlobal;

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onOrganizationPress: (id: string) => void;
    onDocumentPress: (document: FullMessage_GeneralMessage_attachments_MessageAttachmentFile) => void;
}

export const ReplyContent = (props: ReplyContentProps) => {
    const maxWidth = Dimensions.get('screen').width - 100;
    const { theme } = props;

    const quoted = props.quotedMessages.sort((a, b) => a.date - b.date);

    return (
        <>
            {quoted.map((quote) => {
                let generalMesage = quote.__typename === 'GeneralMessage' ? quote as FullMessage_GeneralMessage : undefined;

                if (generalMesage) {
                    let fileAttaches = generalMesage.attachments && generalMesage.attachments.filter(a => a.__typename === 'MessageAttachmentFile') as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
                    let contentAttach: JSX.Element[] = [];

                    fileAttaches.map((file, index) => {
                        let isImage = file.fileMetadata.isImage;

                        if (isImage) {
                            let imageLayout = layoutImage(file.fileMetadata, maxWidth);

                            if (imageLayout) {
                                contentAttach.push(<MediaContent key={'msg-reply-' + quote.id + '-media-' + index} imageLayout={imageLayout} message={generalMesage!} attach={file} theme={theme} />);
                            }
                        } else {
                            contentAttach.push(<DocumentContent key={'msg-reply-' + quote.id + '-document-' + index} attach={file} onDocumentPress={props.onDocumentPress} theme={theme} />);
                        }
                    });

                    return (
                        <View key={'quote-' + quote.id} flexDirection="column" marginTop={5} marginLeft={1} marginBottom={6} borderLeftWidth={2} borderLeftColor={theme.foregroundQuaternary} paddingLeft={8}>
                            <Text
                                style={{
                                    marginTop: -2,
                                    height: 15,
                                    lineHeight: 15,
                                    color: theme.foregroundPrimary,
                                    letterSpacing: 0,
                                    fontSize: 13,
                                    fontWeight: FontStyles.Weight.Medium,
                                    marginBottom: 2,
                                }}
                                onPress={() => props.onUserPress(generalMesage!.sender.id)}
                                allowFontScaling={false}
                            >
                                {generalMesage.sender.name || ''}
                            </Text>

                            {!!generalMesage.message && <TextContent message={generalMesage} inReply={true} onUserPress={props.onUserPress} onGroupPress={props.onGroupPress} onOrganizationPress={props.onOrganizationPress} wrapped={true} theme={theme} />}
                            {contentAttach}
                        </View>
                    );
                } else {
                    return (
                        <View key={'quote-' + quote.id} flexDirection="column" marginTop={5} marginLeft={1} marginBottom={6} borderLeftWidth={2} borderLeftColor="#0084fe" paddingLeft={8}>
                            <TextContent message={quote} onUserPress={props.onUserPress} onGroupPress={props.onGroupPress} onOrganizationPress={props.onOrganizationPress} theme={theme} />
                        </View>
                    );
                }
            })}
        </>
    );
};