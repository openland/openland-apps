import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';

interface UIconButtonProps extends XViewProps {
    icon: JSX.Element;
}

export const UIconButton = React.memo((props: UIconButtonProps) => {
    const { icon, ...other } = props;

    return (
        <XView
            {...other}
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            width={40}
            height={40}
            borderRadius={20}
            hoverBackgroundColor={ThemeDefault.backgroundPrimaryHover}
            linkSelectable={true}
        >
            <XView width={24} height={24} alignItems="center" justifyContent="center">
                {icon}
            </XView>
        </XView>
    );
});