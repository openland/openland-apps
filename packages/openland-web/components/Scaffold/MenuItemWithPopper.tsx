import * as React from 'react';
import { XPolitePopper } from 'openland-x/XPolitePopper';
import { XMenuVertical } from 'openland-x/XMenuItem';
import { withUserInfo } from '../UserInfo';
import { DesktopNavigatorItem } from './DesktopNavigatorItem';

export const MenuItemWithPopper = ({
    menuItems,
    targetElement,
    contentContainer,
}: {
    menuItems: any;
    targetElement: any;
    contentContainer?: any;
}) => {
    let [show, setShow] = React.useState<boolean>(false);

    const onClick = () => {
        setShow(!show);
    };

    const onClickOutside = () => {
        setShow(false);
    };
    let AddListingContent = withUserInfo(() => {
        return <>{menuItems}</>;
    });

    return (
        <XPolitePopper
            contentContainer={contentContainer || <XMenuVertical />}
            placement="right-end"
            arrow={null}
            show={show}
            marginTop={5}
            marginLeft={11}
            content={<AddListingContent />}
            onClickOutside={onClickOutside}
        >
            <DesktopNavigatorItem isActive onClick={onClick}>{targetElement}</DesktopNavigatorItem>
        </XPolitePopper>
    );
};
