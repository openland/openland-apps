import * as React from 'react';
import { XView } from 'react-mental';
import CheckIcon from 'openland-icons/ic-check-msg.svg';

export const MessageSelector = React.memo<{
    selected: boolean;
    onClick: () => void;
}>(props => {
    if (props.selected) {
        return (
            <XView
                width={18}
                height={18}
                borderRadius={9}
                backgroundColor="#1790ff"
                cursor="pointer"
                onClick={props.onClick}
            >
                <XView position="absolute" top={6} left={4} alignItems="center">
                    <CheckIcon />
                </XView>
            </XView>
        );
    } else {
        return (
            <XView
                width={18}
                height={18}
                borderRadius={9}
                backgroundColor="#fff"
                borderWidth={1}
                borderColor="#D9D9D9"
                cursor="pointer"
                onClick={props.onClick}
            />
        );
    }
});
