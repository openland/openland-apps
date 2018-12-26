import * as React from 'react';
import { XView } from 'react-mental';

export const MessageUploadComponent = React.memo((props: { title?: string; progress: number }) => (
    <XView
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        alignSelf="stretch"
        height={24}
        borderRadius={4}
        backgroundColor="rgba(23, 144, 255, 0.2)"
        overflow="hidden"
        position="relative"
    >
        <XView
            width={props.progress + '%'}
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            backgroundColor="#1790ff"
            transition="all .2s"
        />
        <XView fontSize={12} fontWeight="600" lineHeight={1.33} color="#fff" zIndex={1}>
            {props.title}
        </XView>
    </XView>
));
