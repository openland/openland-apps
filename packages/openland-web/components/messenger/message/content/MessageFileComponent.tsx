import * as React from 'react';
import { XView } from 'react-mental';
import IcClose from 'openland-icons/ic-close.svg';
import IcFile from 'openland-icons/ic-file-blue.svg';
import { XMemo } from 'openland-y-utils/XMemo';
import { useCheckPerf } from 'openland-web/hooks/useCheckPerf';

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
    marginBottom?: number;
}

export const MessageFileComponent = XMemo<MessageFileComponentProps>(props => {
    // useCheckPerf({ name: 'MessageFileComponent' });
    let href = undefined;
    if (props.file) {
        href = `https://ucarecdn.com/${props.file}/${props.fileName ? props.fileName!! : ''}`;
    }
    return (
        <XView
            href={href}
            as="a"
            alignSelf="flex-start"
            flexDirection="row"
            alignItems="center"
            paddingVertical={8}
            paddingHorizontal={16}
            marginBottom={props.marginBottom}
            cursor="pointer"
            borderRadius={10}
            color="rgba(0, 0, 0, 0.8)"
            backgroundColor="#f4f4f4"
            minWidth={200}
            maxWidth={550}
            position="relative"
            hoverColor="#1790ff"
            hoverTextDecoration="none"
            zIndex={1}
        >
            <XView
                width={23}
                height={28}
                flexShrink={0}
                marginRight={12}
                alignItems="center"
                justifyContent="center"
            >
                <IcFile />
            </XView>
            <XView flexDirection="column" flexGrow={1}>
                <XView
                    width="100%"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    fontSize={14}
                    fontWeight="600"
                    marginBottom={-1}
                >
                    {props.fileName ? props.fileName!! : 'file'}
                </XView>
                <XView opacity={0.4} fontSize={13} color="#000 !important" marginTop={-1}>
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
