import * as React from 'react';
import { XLink2 } from 'openland-x/XLink2';
import { DialogViewProps } from './DialogView';
import { XView } from 'react-mental';
import { XDate } from 'openland-x/XDate';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { emoji } from 'openland-y-utils/emoji';

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
            onClick={() => {
                if (props.onSelect) {
                    props.onSelect(props.item.key);
                }
                if (props.onClick) {
                    props.onClick();
                }
            }}
        >
            <XAvatar2
                title={dialog.title}
                id={dialog.flexibleId}
                online={dialog.online}
                src={dialog.photo}
                size={28}
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
                        {emoji({
                            src: dialog.title,
                            size: 16,
                        })}
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
                            <XDate value={dialog.date.toString()} format="datetime_short" />
                        </XView>
                    )}
                </XView>
            </XView>
        </XLink2>
    );
};
