import * as React from 'react';
import IconApps from 'openland-icons/ic-apps2.svg';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { NativeAppsModal } from 'openland-web/components/NativeAppsModal';

export const AppsMenuItem = () => (
    <XView
        position="relative"
        height={55}
        flexShrink={0}
        cursor="pointer"
        hoverBackgroundColor="rgba(0, 0, 0, 0.04)"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        onClick={() =>
            showModalBox({ fullScreen: true }, () => (
                <XScrollView3 flexGrow={1} flexShrink={1}>
                    <NativeAppsModal />
                </XScrollView3>
            ))
        }
    >
        <IconApps style={{ width: 20, height: 20 }} />
    </XView>
);
