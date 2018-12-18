import * as React from 'react';
import { XLink2 } from 'openland-x/XLink2';
import { XAvatar } from 'openland-x/XAvatar';
import { DialogViewProps } from './DialogView';
import { XView } from 'react-mental';
import { XDate } from 'openland-x/XDate';

export const DialogViewCompact = (props: DialogViewProps) => {
    let dialog = props.item;

    return (
        <XLink2
            ref={props.handleRef}
            path={'/mail/' + dialog.key}
            height={50}
            flexDirection="row"
            paddingLeft={16}
            minWidth={0}
            alignItems="center"
            hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
            selectedBackgroundColor="#4596e1"
            selectedHoverBackgroundColor="#4596e1"
            onClick={props.onSelect}
        >
            <XAvatar
                style={
                    dialog.kind === 'INTERNAL'
                        ? 'organization'
                        : dialog.kind === 'GROUP'
                        ? 'group'
                        : dialog.kind === 'PUBLIC'
                        ? 'room'
                        : dialog.kind === 'PRIVATE'
                        ? 'user'
                        : undefined
                }
                objectName={dialog.title}
                objectId={dialog.flexibleId}
                online={dialog.online}
                cloudImageUuid={dialog.photo}
                size="m-small"
            />
            <XView
                flexDirection="column"
                flexGrow={1}
                flexShrink={1}
                paddingLeft={12}
                paddingRight={16}
                minWidth={0}
            >
                <XView
                    flexDirection="row"
                    flexGrow={1}
                    flexShrink={0}
                    minWidth={0}
                    marginBottom={3}
                >
                    <XView
                        flexGrow={1}
                        flexShrink={1}
                        minWidth={0}
                        fontSize={14}
                        fontWeight="600"
                        lineHeight="18px"
                        color="#000"
                        selectedColor="#fff"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                    >
                        {dialog.title}
                    </XView>
                    {dialog.date && (
                        <XView
                            height={18}
                            color="rgba(0, 0, 0, 0.3)"
                            selectedColor="rgba(255, 255, 255, 0.8)"
                            marginLeft={5}
                            fontSize={12}
                            fontWeight="600"
                            lineHeight="18px"
                            whiteSpace="nowrap"
                        >
                            <XDate
                                value={dialog.date.toString()}
                                format="datetime_short"
                            />
                        </XView>
                    )}
                </XView>
            </XView>
        </XLink2>
    );
};