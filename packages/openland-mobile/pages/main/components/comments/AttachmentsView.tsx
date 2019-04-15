import * as React from 'react';
import { View, Text } from 'react-native';

export type Attachment = { type: string, name: string, path: string, size: number };

interface AttachmentsViewProps {
    attachments: Attachment[];
}

export const AttachmentsView = (props: AttachmentsViewProps) => {
    const { attachments } = props;
    
    return (
        <>
            {attachments.map(attach => (
                <View>
                    <Text>{attach.name}</Text>
                </View>
            ))}
        </>
    );
}