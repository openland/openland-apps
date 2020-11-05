import * as React from 'react';
import { UIconButton, UIconButtonShape, UIconButtonSize } from '../UIconButton';
import ManageVerticalIcon from 'openland-icons/ic-more-v.svg';
import ManageHorizontalIcon from 'openland-icons/s/ic-more-h-24.svg';
import { XViewProps } from 'react-mental';
import { UPopperController } from '../UPopper';
import { usePopper } from '../usePopper';

export interface UMoreButtonProps extends XViewProps {
    menu: (ctx: UPopperController) => JSX.Element;
    horizontal?: boolean;
    filled?: boolean;
    shape?: UIconButtonShape;
    size?: UIconButtonSize;
}

export const UMoreButton = React.memo((props: UMoreButtonProps) => {
    const { menu, horizontal, shape, filled, ...other } = props;
    const [menuVisible, menuShow] = usePopper({ placement: 'bottom-end', hideOnClick: true }, menu);

    return (
        <UIconButton
            icon={horizontal ? <ManageHorizontalIcon /> : <ManageVerticalIcon />}
            active={menuVisible}
            shape={shape}
            filled={filled}
            onClick={menuShow}
            {...other}
        />
    );
});
