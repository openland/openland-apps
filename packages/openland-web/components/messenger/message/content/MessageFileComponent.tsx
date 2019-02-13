import * as React from 'react';
import { XView } from 'react-mental';
import IcClose from 'openland-icons/ic-close.svg';
import IcFile from 'openland-icons/ic-file.svg';
import { XMemo } from 'openland-y-utils/XMemo';

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function niceBytes(x: number | undefined) {
    if (x === undefined) {
        return;
    }

    let l = 0;

    while (x >= 1024 && ++l) {
        x = x / 1024;
    }

    return x.toFixed(x >= 10 || l < 1 ? 0 : 1) + ' ' + units[l];
}

interface MessageFileComponentProps {
    file?: string;
    fileName?: string;
    fileSize?: number;
    onClearClick?: () => void;
    clearButton?: boolean;
    marginTop?: number;
}

export const MessageFileComponent = XMemo<MessageFileComponentProps>(props => {
    let href = undefined;
    let marginTop = 8;
    if (props.marginTop !== undefined) {
        marginTop = props.marginTop;
    }
    if (props.file) {
        href = `https://ucarecdn.com/${props.file}/${props.fileName ? props.fileName!! : ''}`;
    }
    return (
        <XView
            href={href}
            as="a"
            alignSelf="flex-start"
            flexDirection="row"
            marginTop={marginTop}
            paddingTop={8}
            paddingBottom={8}
            paddingLeft={12}
            paddingRight={12}
            cursor="pointer"
            borderRadius={5}
            borderWidth={1}
            borderColor="rgba(220, 222, 228, 0.45)"
            color="#334562"
            backgroundColor="#fff"
            minWidth={250}
            maxWidth={550}
            position="relative"
            hoverColor="#1790ff"
            hoverTextDecoration="none"
        >
            <XView
                width={40}
                height={40}
                flexShrink={0}
                marginRight={12}
                backgroundColor="#f3f3f5"
                borderRadius={50}
                alignItems="center"
                justifyContent="center"
            >
                <IcFile />
            </XView>
            <XView flexDirection="column" flexGrow={1} width="100%">
                <XView
                    width="100%"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    fontSize={14}
                    fontWeight="600"
                >
                    {props.fileName ? props.fileName!! : 'file'}
                </XView>
                <XView opacity={0.5} fontSize={14} color="#334562 !important">
                    {niceBytes(props.fileSize)}
                </XView>
            </XView>
            {props.clearButton && (
                <XView onClick={props.onClearClick}>
                    <IcClose />
                </XView>
            )}
        </XView>
    );
});
