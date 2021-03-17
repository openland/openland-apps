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

    const hasBack = !props.config.forceHideBack && (router.pages.length > 1 || props.config.forceShowBack || layout === 'mobile');

    const appearance = props.config.appearance || 'normal';
    const hasTitleView = !!props.config.titleView;

    const maxWidth = appearance === 'normal' ? 600 : appearance === 'fullwidth' ? '100%' : 824;
    const headerHeight = props.config.dynamicHeight ? undefined : 56;

    useShortcuts({
        keys: ['Escape'],
        callback: () => {
            return hasBack ? router.pop() : false;
        },
    });

    return (
        <XView height={headerHeight} flexDirection="row" alignItems="center" zIndex={2}>
            {hasBack && (
                <XView height={56} width={56} alignItems="center" justifyContent="center">
                    <UIconButton icon={<BackIcon />} onClick={() => router.pop()} size="large" />
                </XView>
            )}
            <XView
                minWidth={0}
                flexBasis={0}
                flexGrow={1}
                fontSize={24}
                flexDirection="row"
                justifyContent="center"
                marginRight={(hasBack && layout !== 'mobile') ? 56 : undefined}
                paddingHorizontal={16}
            >
                {hasTitleView && (
                    <XView
                        height={headerHeight}
                        color="var(--foregroundPrimary)"
                        minWidth={0}
                        flexBasis={0}
                        flexGrow={1}
                        maxWidth={maxWidth}
                        flexDirection="row"
                        alignItems="stretch"
                        justifyContent="flex-start"
                    >
                        {props.config.titleView}
                    </XView>
                )}
                {!hasTitleView && (
                    <XView
                        height={32}
                        color="var(--foregroundPrimary)"
                        minWidth={0}
                        flexBasis={0}
                        flexGrow={1}
                        maxWidth={maxWidth}
                        flexDirection="row"
                        {...TextStyles.Title1}
                    >
                        {props.config.title}
                    </XView>
                )}
            </XView>
        </XView>
    );
});
