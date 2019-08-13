import * as React from 'react';
import { UIconButton } from '../UIconButton';
import ManageVerticalIcon from 'openland-icons/ic-more-v.svg';
import { XViewProps } from 'react-mental';
import { UPopperController } from '../UPopper';
import { usePopper } from '../usePopper';

interface UMoreButtonProps extends XViewProps {
    menu: (ctx: UPopperController) => JSX.Element;
}

export const UMoreButton = React.memo((props: UMoreButtonProps) => {
    const { menu, ...other } = props;
    const [menuVisible, menuShow] = usePopper({ placement: 'bottom-end', hideOnClick: true }, menu);

    return (
        <UIconButton
            icon={<ManageVerticalIcon />}
            active={menuVisible}
            onClick={menuShow}
            {...other}
        />
    );
});
