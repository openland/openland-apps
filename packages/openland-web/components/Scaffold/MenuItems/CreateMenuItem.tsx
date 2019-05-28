import * as React from 'react';
import { MenuItemWithPopper } from '../MenuItemWithPopper';
import { NewOptionsMenu } from 'openland-web/components/NewOptionsButton';
import AddIcon from 'openland-icons/add-3.svg';

export const CreateMenuItem = () => (
    <MenuItemWithPopper targetElement={<AddIcon />} menuItems={<NewOptionsMenu />} />
);
