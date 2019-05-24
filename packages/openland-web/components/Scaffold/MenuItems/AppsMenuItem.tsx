import * as React from 'react';
import { MenuItemWithPopper } from '../MenuItemWithPopper';
import AppsIcon from 'openland-icons/ic-apps.svg';
import IphoneIcon from 'openland-icons/ic-app-iphone.svg';
import AndroidIcon from 'openland-icons/ic-app-android.svg';
import IpadIcon from 'openland-icons/ic-app-ipad.svg';
import MacIcon from 'openland-icons/ic-app-mac.svg';
import WinIcon from 'openland-icons/ic-app-win.svg';
import LinuxIcon from 'openland-icons/ic-app-linux.svg';
import { XView } from 'react-mental';
import { XPopperContent } from 'openland-x/popper/XPopperContent';
import { css } from 'linaria';

const menuItem = css`
    &: hover {
        background-color: #f3f9ff;
        text-decoration: none !important;

        & * {
            text-decoration: none !important;
            color: #1790ff !important;
        }
    }
`;

const Item = ({ title, href, icon }: { title: string; href: string; icon: any }) => {
    return (
        <div className={menuItem}>
            <XView
                as="a"
                flexDirection="row"
                paddingLeft={14}
                paddingTop={8}
                paddingBottom={8}
                paddingRight={32}
                href={href}
                cursor="pointer"
            >
                {icon}
                <XView
                    justifyContent="center"
                    marginLeft={12}
                    lineHeight={1.43}
                    fontSize={14}
                    color={'#000000'}
                >
                    {title}
                </XView>
            </XView>
        </div>
    );
};

export const AppsMenuItem = () => (
    <MenuItemWithPopper
        contentContainer={
            <XPopperContent paddingTop={0} paddingBottom={0} paddingLeft={0} paddingRight={0} />
        }
        targetElement={<AppsIcon />}
        menuItems={
            <XView paddingTop={18} paddingBottom={9}>
                <XView
                    paddingLeft={16}
                    paddingRight={32}
                    fontWeight={'600'}
                    opacity={0.5}
                    color={'#000000'}
                    fontSize={14}
                    lineHeight={1.43}
                    marginBottom={10}
                >
                    Get Openland apps
                </XView>

                <Item title={'iPhone'} href={'https://oplnd.com/ios'} icon={<IphoneIcon />} />
                <Item title={'Android'} href={'https://oplnd.com/android'} icon={<AndroidIcon />} />
                <Item title={'iPad'} href={'https://oplnd.com/ios'} icon={<IpadIcon />} />
                <Item title={'Mac'} href={'https://oplnd.com/mac'} icon={<MacIcon />} />
                <Item title={'Windows'} href={'https://oplnd.com/windows'} icon={<WinIcon />} />
                <Item title={'Linux'} href={'https://oplnd.com/linux'} icon={<LinuxIcon />} />
            </XView>
        }
    />
);
