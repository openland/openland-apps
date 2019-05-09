import * as React from 'react';
import { XView } from 'react-mental';
import { XAvatar } from 'openland-x/XAvatar';
import { emoji } from 'openland-y-utils/emoji';

export type MentionData = {
    id: string;
    name: string;
    title: string;
    avatar: string | null;
    isYou?: boolean;
    online?: boolean;
};

type MentionEntryT = MentionData & {
    isSelected: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const MentionEntry = ({
    avatar,
    name,
    id,
    online,
    title,
    isSelected,
    onClick,
}: MentionEntryT) => {
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        setIsFocused(isSelected);
    }, [isSelected]);

    const onMouseLeave = () => setIsFocused(false);
    const onMouseEnter = () => setIsFocused(true);

    const emojifiedName = React.useMemo(() => {
        return emoji({
            src: name,
            size: 15,
        });
    }, [name]);

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            style={{ height: 40, flexShrink: 0 }}
        >
            <XView
                position="relative"
                width="100%"
                flexDirection="row"
                flexGrow={1}
                flexShrink={1}
                paddingTop={6}
                paddingBottom={6}
                paddingRight={15}
                paddingLeft={15}
                minWidth={0}
                backgroundColor={isFocused ? '#f9f9f9' : '#ffffff'}
                hoverBackgroundColor={'#f9f9f9'}
            >
                <XAvatar
                    size={'m-small'}
                    style={'user'}
                    src={avatar ? avatar : undefined}
                    objectName={name}
                    objectId={id}
                    online={online}
                />

                <XView
                    flexDirection="column"
                    alignSelf="center"
                    marginLeft={12}
                    fontSize={13}
                    fontWeight={'600'}
                    lineHeight={1.54}
                    color={'#000000'}
                >
                    {emojifiedName}
                </XView>

                <XView
                    flexDirection="column"
                    alignSelf={'center'}
                    marginLeft={7}
                    opacity={0.4}
                    fontSize={12}
                    fontWeight={'600'}
                    lineHeight={1.5}
                    color={'#000000'}
                >
                    {title}
                </XView>

                <XView flexGrow={1} />

                <XView
                    flexDirection="column"
                    alignSelf={'center'}
                    opacity={0.4}
                    fontSize={12}
                    fontWeight={'400'}
                    lineHeight={1.5}
                    color={isFocused ? '#000000' : 'transparent'}
                >
                    <div style={{ position: 'relative' }}>
                        <span style={{ top: 2, position: 'absolute', left: -16 }}>↵</span>{' '}
                        <span>to select</span>
                    </div>
                </XView>
            </XView>
        </div>
    );
};
