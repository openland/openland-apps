import * as React from 'react';
import { MenuItemWithPopper } from '../MenuItemWithPopper';
import IconApps from 'openland-icons/ic-apps2.svg';
import IphoneIcon from 'openland-icons/ic-app-iphone.svg';
import AndroidIcon from 'openland-icons/ic-app-android.svg';
import MacIcon from 'openland-icons/ic-app-mac.svg';
import WinIcon from 'openland-icons/ic-app-win.svg';
import LinuxIcon from 'openland-icons/ic-app-linux.svg';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XView } from 'react-mental';
import { XMenuTitle } from 'openland-x/XMenuItem';

const Item = ({ title, href, icon }: { title: string; href: string; icon: any }) => {
    return (
        <XMenuItem
            href={href}
            icon={
                <XView marginRight={14} marginTop={-3}>
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
        targetElement={<IconApps />}
        menuItems={
            <>
                <XMenuTitle>
                    <XView paddingRight={32}>Get Openland apps</XView>
                </XMenuTitle>
                <Item title={'iPhone'} href={'https://oplnd.com/ios'} icon={<IphoneIcon />} />
                <Item title={'Android'} href={'https://oplnd.com/android'} icon={<AndroidIcon />} />
                <Item title={'Mac'} href={'https://oplnd.com/mac'} icon={<MacIcon />} />
                <Item title={'Windows'} href={'https://oplnd.com/windows'} icon={<WinIcon />} />
                <Item title={'Linux'} href={'https://oplnd.com/linux'} icon={<LinuxIcon />} />
            </>
        }
    />
);
