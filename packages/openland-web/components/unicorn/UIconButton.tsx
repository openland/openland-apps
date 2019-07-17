import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { css } from 'linaria';

const iconWrapper = css`
    display: flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;

    svg {
        width: 24px;
        height: 24px;
    }
`;

interface UIconButtonProps extends XViewProps {
    icon: JSX.Element;
    active?: boolean;
}

export const UIconButton = React.memo((props: UIconButtonProps) => {
    const { icon, active, ...other } = props;

    return (
        <XView
            {...other}
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            width={40}
            height={40}
            borderRadius={20}
            backgroundColor={active ? ThemeDefault.backgroundPrimaryHover : undefined}
            hoverBackgroundColor={ThemeDefault.backgroundPrimaryHover}
            linkSelectable={true}
        >
            <div className={iconWrapper}>
                {icon}
            </div>
        </XView>
    );
});