import * as React from 'react';
import { XView } from 'react-mental';
import { XButton, XButtonStyle } from 'openland-x/XButton';

export const XModalFooterButton = React.memo<{
    text?: string;
    style?: XButtonStyle;
    loading?: boolean;
    onClick?: () => void;
}>(props => {
    return (
        <XView paddingLeft={12}>
            <XButton
                text={props.text}
                style={props.style}
                size="large"
                onClick={props.onClick}
                loading={props.loading}
            />
        </XView>
    );
});
