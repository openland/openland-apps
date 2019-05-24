import * as React from 'react';
import { MenuItemWithPopper } from '../MenuItemWithPopper';
import AppsIcon from 'openland-icons/ic-apps.svg';
import IphoneIcon from 'openland-icons/ic-app-iphone.svg';
import AndroidIcon from 'openland-icons/ic-app-android.svg';
import IpadIcon from 'openland-icons/ic-app-ipad.svg';
import MacIcon from 'openland-icons/ic-app-mac.svg';
import WinIcon from 'openland-icons/ic-app-win.svg';
import LinuxIcon from 'openland-icons/ic-app-linux.svg';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XView } from 'react-mental';
import { XMenuTitle } from 'openland-x/XMenuItem';

const Item = ({ title, href, icon }: { title: string; href: string; icon: any }) => {
    return (
        <XMenuItem
            path={href}
            icon={
                <XView marginRight={14} marginTop={-4}>
                    {icon}
                </XView>
            }
        >
            {title}
        </XMenuItem>
    );
};

export const AppsMenuItem = () => (
    <MenuItemWithPopper
        targetElement={<AppsIcon />}
        menuItems={
            <>
                <XMenuTitle>
                    <XView paddingRight={32}>Get Openland apps</XView>
                </XMenuTitle>
                <Item title={'iPhone'} href={'https://oplnd.com/ios'} icon={<IphoneIcon />} />
                <Item title={'Android'} href={'https://oplnd.com/android'} icon={<AndroidIcon />} />
                <Item title={'iPad'} href={'https://oplnd.com/ios'} icon={<IpadIcon />} />
                <Item title={'Mac'} href={'https://oplnd.com/mac'} icon={<MacIcon />} />
                <Item title={'Windows'} href={'https://oplnd.com/windows'} icon={<WinIcon />} />
                <Item title={'Linux'} href={'https://oplnd.com/linux'} icon={<LinuxIcon />} />
            </>
        }
    />
);
