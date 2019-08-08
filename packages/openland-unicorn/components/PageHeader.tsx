import * as React from 'react';
import { XView } from 'react-mental';

import BackIcon from 'openland-icons/s/ic-back-24.svg';
import { useStackRouter } from './StackRouter';
import { HeaderConfig } from './HeaderConfig';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { ThemeDefault } from 'openland-y-utils/themes';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

export const PageHeader = React.memo((props: { config: HeaderConfig }) => {
    let router = useStackRouter();
    useShortcuts({
        keys: ['Escape'], callback: () => {
            return router.pages.length > 1 ? router.pop() : false;
        }
    });
    let appearance = props.config.appearance || 'normal';
    return (
        <XView height={56} flexDirection="row" alignItems="center" zIndex={2}>
            <XView
                height={56}
                width={56}
                alignItems="center"
                justifyContent="center"
                onClick={() => router.pop()}
                cursor="pointer"
            >
                <UIcon icon={<BackIcon />} color={ThemeDefault.foregroundSecondary} />
            </XView>
            <XView
                minWidth={0}
                flexBasis={0}
                flexGrow={1}
                fontSize={24}
                flexDirection="row"
                justifyContent="center"
                marginRight={56}
            >
                {!!props.config.titleView && (
                    <XView
                        height={56}
                        color="#171B1F"
                        minWidth={0}
                        flexBasis={0}
                        flexGrow={1}
                        maxWidth={appearance === 'normal' ? 600 : 824}
                        flexDirection="row"
                        paddingHorizontal={16}
                        alignItems="stretch"
                        justifyContent="flex-start"
                    >
                        {props.config.titleView}
                    </XView>
                )}
                {!props.config.titleView && (
                    <XView
                        height={32}
                        color="#171B1F"
                        minWidth={0}
                        flexBasis={0}
                        flexGrow={1}
                        fontSize={24}
                        maxWidth={appearance === 'normal' ? 600 : 824}
                        lineHeight="32px"
                        fontWeight="600"
                        flexDirection="row"
                        paddingHorizontal={16}
                    >
                        {props.config.title}
                    </XView>
                )}
            </XView>
        </XView >
    );
});