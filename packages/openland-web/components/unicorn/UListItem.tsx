import * as React from 'react';
import { XView } from 'react-mental';
import { ThemeLightBlue } from 'openland-y-utils/themes';

export const UListItem = React.memo((props: {
    text: string,
    icon?: any,
    onClick?: () => void,
    path?: string
}) => {
    return (
        <XView
            height={48}
            paddingHorizontal={16}
            alignItems="center"
            flexDirection="row"
            hoverBackgroundColor={ThemeLightBlue.backgroundPrimaryHover}
            selectedBackgroundColor={ThemeLightBlue.backgroundPrimaryHover}
            cursor="pointer"
            onClick={props.onClick}
            path={props.path}
        >
            {props.icon && <XView marginRight={19}>{props.icon}</XView>}
            <XView lineHeight="24px" fontSize={15}>
                {props.text}
            </XView>
        </XView>
    );
});