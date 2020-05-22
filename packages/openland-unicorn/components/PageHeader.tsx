import * as React from 'react';
import { XView } from 'react-mental';
import BackIcon from 'openland-icons/s/ic-back-24.svg';
import { useStackRouter } from './StackRouter';
import { HeaderConfig } from './HeaderConfig';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { useLayout } from './utils/LayoutContext';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';

export const PageHeader = React.memo((props: { config: HeaderConfig }) => {
    const router = useStackRouter();
    const layout = useLayout();
    const wideHeader = router.pages.length > 0;

    let showBack = router.pages.length > 0 && (router.rootPath !== '/discover' && router.rootPath !== '/account' && router.rootPath !== '/discuss');
    if (router.rootPath === '/discover' && router.pages.length > 1) {
        showBack = true;
    }
    if (router.rootPath === '/account' && router.pages.length > 1) {
        showBack = true;
    }
    if (router.rootPath === '/discuss' && router.pages.length > 1) {
        showBack = true;
    }

    useShortcuts({
        keys: ['Escape'],
        callback: () => {
            return router.pages.length > 0 ? showBack ? router.pop() : false : false;
        },
    });
    let appearance = props.config.appearance || 'normal';
    let maxWidth = props.config.maxWidth;
    let backgroundColor = props.config.backgroundColor;

    return (
        <XView
            height={56}
            flexDirection="row"
            alignItems="center"
            zIndex={2}
            backgroundColor={backgroundColor}
        >
            {layout === 'mobile' || showBack ? (
                <XView height={56} width={56} alignItems="center" justifyContent="center">
                    <UIconButton icon={<BackIcon />} onClick={() => router.pop()} size="large" />
                </XView>
            ) : null}
            <XView
                minWidth={0}
                flexBasis={0}
                flexGrow={1}
                fontSize={24}
                flexDirection="row"
                justifyContent="center"
                marginRight={wideHeader && layout !== 'mobile' ? 56 : undefined}
            >
                {!!props.config.titleView && (
                    <XView
                        height={56}
                        color="var(--foregroundPrimary)"
                        minWidth={0}
                        flexBasis={0}
                        flexGrow={1}
                        maxWidth={
                            maxWidth && !showBack
                                ? maxWidth
                                : appearance === 'normal'
                                    ? 600
                                    : appearance === 'fullwidth'
                                        ? '100%'
                                        : 824
                        }
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
                        color="var(--foregroundPrimary)"
                        minWidth={0}
                        flexBasis={0}
                        flexGrow={1}
                        maxWidth={
                            maxWidth && !showBack ? maxWidth : appearance === 'normal' ? 600 : 824
                        }
                        flexDirection="row"
                        paddingHorizontal={16}
                        {...TextStyles.Title1}
                    >
                        {props.config.title}
                    </XView>
                )}
            </XView>
        </XView>
    );
});
