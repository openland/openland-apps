import * as React from 'react';
import { XView } from 'react-mental';

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
                <XView
                    position="absolute"
                    top={5}
                    left={5}
                    width={8}
                    height={8}
                    backgroundImage="url('/static/img/icons/check-form.svg')"
                />
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
