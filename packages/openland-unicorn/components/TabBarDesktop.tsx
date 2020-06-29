import * as React from 'react';
import { XView, XViewRouter } from 'react-mental';
import { css, cx } from 'linaria';
import { TabRouter } from './TabRouter';
import { useRole } from 'openland-x-permissions/XWithRole';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { showShortcutsHelp } from 'openland-web/fragments/chat/showShortcutsHelp';
import Logo from './Logo';
import AppearanceIcon from 'openland-icons/s/ic-appearance-24.svg';
import SuperIcon from 'openland-icons/s/ic-settings-deprecated-24.svg';
import IcKeyboard from 'openland-icons/s/ic-keyboard-24.svg';

const selectorStyle = css`
    position: absolute;
    top: 70px;
    left: 0px;
    height: 48px;
    width: 3px;
    background-color: #1885f2;
    border-radius: 0px 100px 100px 0px;
    transition: transform 150ms cubic-bezier(0, 0, 0.2, 1);
    will-change: transform;
`;

export const counterStyle = css`
    background-color: #e62e3d;
    position: absolute;
    top: 8px;
    border: 2px solid #f2f3f5;
    right: 15px;
    height: 20px;
    min-width: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    color: white;
    font-size: 10px;
    line-height: 16px;
    text-align: center;
    font-weight: 600;
    border-radius: 20px;
    padding-left: 2px;
    padding-right: 2px;
`;

const counterDozenStyle = css`
    right: 12px;
`;

const counterHundredStyle = css`
    right: 10px;
`;

const bottomContent = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: flex-end;
`;

interface TabBarButtonProps {
    selected: boolean;
    onClick: () => void;
    icon: JSX.Element;
    iconActive: JSX.Element;
    counters: number;
    caption: string;
}

const TabBarButton = React.memo((props: TabBarButtonProps) => {
    const counterClassName = cx(
        counterStyle,
        props.counters >= 10 && counterDozenStyle,
        props.counters >= 100 && counterHundredStyle,
    );

    return (
        <XView
            width={64}
            height={54}
            alignItems="center"
            justifyContent="center"
            hoverBackgroundColor="var(--backgroundTertiaryHover)"
            cursor="pointer"
            onClick={props.onClick}
        >
            {!props.selected && props.icon}
            {props.selected && props.iconActive}
            {props.counters > 0 && <span className={counterClassName}>{props.counters}</span>}
        </XView>
    );
});

interface TabBarDesktopProps {
    selected: number;
    setSelected: (index: number) => void;
    router: TabRouter;
    xRouter: XViewRouter;
}

// var(--foregroundSecondary)

export const TabBarDesktop = React.memo((props: TabBarDesktopProps) => {
    const [counters, setCounters] = React.useState(props.router.counters);
    const isSuperAdmin = useRole('super-admin');
    React.useEffect(() => {
        return props.router.onCountersChanged(setCounters);
    }, []);
    return (
        <XView
            height="100%"
            width="100%"
            backgroundColor="var(--backgroundTertiary)"
            paddingTop={2}
            paddingBottom={8}
        >
            <XView
                width={64}
                height={64}
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={() => {
                    // set the active tab to /mail

                    const i = isSuperAdmin ? 2 : 1;

                    if (props.router.stacks[i]) {
                        props.router.stacks[i].reset();
                        props.setSelected(i);
                    }

                    setTimeout(() => {
                        props.xRouter.navigate('/mail');
                    }, 10);
                }}
            >
                <Logo />
            </XView>
            {props.router.tabs.map((v, i) => (
                <TabBarButton
                    onClick={() => {
                        props.setSelected(i);
                    }}
                    selected={props.selected === i}
                    icon={v.icon}
                    iconActive={v.iconActive}
                    counters={counters[i]}
                    caption={v.caption}
                    key={'tab_index' + i}
                />
            ))}
            <div
                className={selectorStyle}
                style={{ transform: `translateY(${props.selected * 54}px)` }}
            />
            <div className={bottomContent}>
                <XView
                    height={54}
                    width={64}
                    alignItems="center"
                    justifyContent="center"
                    hoverBackgroundColor="var(--backgroundTertiaryHover)"
                    cursor="pointer"
                    onClick={showShortcutsHelp}
                >
                    <UIcon icon={<IcKeyboard />} />
                </XView>
                {isSuperAdmin && (
                    <>
                        <XView
                            height={54}
                            width={64}
                            alignItems="center"
                            justifyContent="center"
                            hoverBackgroundColor="var(--backgroundTertiaryHover)"
                            cursor="pointer"
                            path="/ui"
                        >
                            <UIcon icon={<AppearanceIcon />} />
                        </XView>
                        <XView
                            height={54}
                            width={64}
                            alignItems="center"
                            justifyContent="center"
                            hoverBackgroundColor="var(--backgroundTertiaryHover)"
                            cursor="pointer"
                            path="/super/admins"
                        >
                            <UIcon icon={<SuperIcon />} />
                        </XView>
                    </>
                )}
            </div>
        </XView>
    );
});
