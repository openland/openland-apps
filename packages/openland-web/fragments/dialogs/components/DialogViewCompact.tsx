import * as React from 'react';
import { XView } from 'react-mental';
import { emoji } from 'openland-y-utils/emoji';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';

export const DialogViewCompact = React.memo(
    (props: {
        item: { title: string, key: string, flexibleId: string, photo: string | null | undefined };
        onPick: (key: string) => void;
        selected?: boolean;
    }) => {
        let dialog = props.item;

        let onPick = React.useCallback(() => {
            props.onPick(props.item.key);
        }, []);

        return (
            <XView
                selected={props.selected}
                onClick={onPick}
                height={50}
                flexDirection="row"
                paddingLeft={16}
                minWidth={0}
                alignItems="center"
                hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
                selectedBackgroundColor="rgba(0, 0, 0, 0.05)"
                selectedColor="#000"
                hoverTextDecoration="none"
                cursor="pointer"
            >
                <UAvatar
                    title={dialog.title}
                    id={dialog.flexibleId}
                    photo={dialog.photo}
                    size="x-small"
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
                            {emoji(dialog.title)}
                        </XView>
                    </XView>
                </XView>
            </XView>
        );
    },
);
