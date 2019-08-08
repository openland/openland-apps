import * as React from 'react';
import { XView } from 'react-mental';
import { XDate } from 'openland-x/XDate';
import { emoji } from 'openland-y-utils/emoji';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';

export const DialogViewCompact = React.memo(
    (props: {
        item: DialogDataSourceItem;
        onSelect?: (id: string) => void;
        onClick?: () => void;
        selected?: boolean;
    }) => {
        let dialog = props.item;

        let path = '/mail/' + dialog.key;
        if (dialog.isOrganization) {
            path = '/' + dialog.key;
        }

        return (
            <XView
                selected={props.selected}
                path={path}
                onClick={props.onClick}
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
            </XView>
        );
    },
);
